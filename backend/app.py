from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import json, os
from urllib.parse import quote_plus
from sports_api import SportsAPIIntegration, get_mock_sports_data
from performance import monitor_performance, cache_result, rate_limit, get_performance_report

app = Flask(__name__)

# Database configuration

# Get database URL from environment or use default PostgreSQL
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    # Default PostgreSQL connection for development
    DB_USER = os.environ.get('DB_USER', 'sportsid')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', 'sportsid123')
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_PORT = os.environ.get('DB_PORT', '5432')
    DB_NAME = os.environ.get('DB_NAME', 'sportsid')

    # URL encode password in case it contains special characters
    encoded_password = quote_plus(DB_PASSWORD)
    DATABASE_URL = f'postgresql://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# PostgreSQL optimizations
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 20,
    'pool_recycle': 3600,
    'pool_pre_ping': True,
    'max_overflow': 30
}

CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

# Database Models
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    families = db.relationship('Family', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.email}>'

class Family(db.Model):
    __tablename__ = 'families'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    family_name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    zip_code = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Family {self.family_name}>'

class Program(db.Model):
    __tablename__ = 'programs'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    age_range = db.Column(db.String(20))
    price = db.Column(db.Numeric(10, 2))  # Use Numeric for precise decimal handling in PostgreSQL
    location = db.Column(db.String(200))
    description = db.Column(db.Text)
    sport_type = db.Column(db.String(50), index=True)
    organization = db.Column(db.String(100), index=True)
    external_id = db.Column(db.String(50), unique=True)  # External API ID
    registration_url = db.Column(db.String(500))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Program {self.name}>'

def read_json(file):
    with open(os.path.join(DATA_DIR, file), "r") as f:
        return json.load(f)

def write_json(file, data):
    with open(os.path.join(DATA_DIR, file), "w") as f:
        json.dump(data, f, indent=2)

# Authentication Routes
@app.route("/api/auth/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"{field} is required"}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "User already exists"}), 400
        
        # Create new user
        user = User(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone', '')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            "message": "User registered successfully",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/auth/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Email and password are required"}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({"error": "Invalid credentials"}), 401
        
        if not user.is_active:
            return jsonify({"error": "Account is deactivated"}), 401
        
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/auth/me", methods=["GET"])
@jwt_required()
def get_current_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "created_at": user.created_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Program Routes
@app.route("/api/programs", methods=["GET"])
@monitor_performance
@cache_result(ttl=300)  # Cache for 5 minutes
def get_programs():
    try:
        programs = Program.query.all()
        return jsonify([{
            "id": program.id,
            "name": program.name,
            "age_range": program.age_range,
            "price": program.price,
            "location": program.location,
            "description": program.description,
            "sport_type": program.sport_type,
            "organization": program.organization
        } for program in programs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/programs", methods=["POST"])
@jwt_required()
def create_program():
    try:
        data = request.get_json()
        
        program = Program(
            name=data['name'],
            age_range=data.get('age_range'),
            price=data.get('price'),
            location=data.get('location'),
            description=data.get('description'),
            sport_type=data.get('sport_type'),
            organization=data.get('organization')
        )
        
        db.session.add(program)
        db.session.commit()
        
        return jsonify({
            "message": "Program created successfully",
            "program": {
                "id": program.id,
                "name": program.name,
                "age_range": program.age_range,
                "price": program.price,
                "location": program.location
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Family Routes
@app.route("/api/family", methods=["POST"])
@jwt_required()
def create_family():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        
        family = Family(
            user_id=user_id,
            family_name=data['family_name'],
            address=data.get('address'),
            city=data.get('city'),
            state=data.get('state'),
            zip_code=data.get('zip_code')
        )
        
        db.session.add(family)
        db.session.commit()
        
        return jsonify({
            "message": "Family registered successfully",
            "family": {
                "id": family.id,
                "family_name": family.family_name,
                "address": family.address,
                "city": family.city,
                "state": family.state,
                "zip_code": family.zip_code
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/family", methods=["GET"])
@jwt_required()
def get_families():
    try:
        user_id = get_jwt_identity()
        families = Family.query.filter_by(user_id=user_id).all()
        
        return jsonify([{
            "id": family.id,
            "family_name": family.family_name,
            "address": family.address,
            "city": family.city,
            "state": family.state,
            "zip_code": family.zip_code,
            "created_at": family.created_at.isoformat()
        } for family in families]), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Sports API Integration endpoints
@app.route("/api/sports/sync", methods=["POST"])
@jwt_required()
def sync_sports_programs():
    try:
        sports_api = SportsAPIIntegration()
        
        # For development, use mock data
        # In production, uncomment the line below to sync from real APIs
        # all_programs = sports_api.sync_all_organizations()
        all_programs = {"mock": get_mock_sports_data()}
        
        # Store programs in database
        programs_added = 0
        for org_name, programs in all_programs.items():
            for program_data in programs:
                # Check if program already exists
                existing = Program.query.filter_by(
                    name=program_data['name'],
                    organization=program_data['organization']
                ).first()
                
                if not existing:
                    program = Program(
                        name=program_data['name'],
                        age_range=program_data.get('age_range'),
                        price=program_data.get('price'),
                        location=program_data.get('location'),
                        description=program_data.get('description'),
                        sport_type=program_data.get('sport_type'),
                        organization=program_data.get('organization')
                    )
                    db.session.add(program)
                    programs_added += 1
        
        db.session.commit()
        
        return jsonify({
            "message": f"Successfully synced {programs_added} new programs",
            "organizations": list(all_programs.keys()),
            "total_programs": sum(len(programs) for programs in all_programs.values())
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/sports/organizations", methods=["GET"])
def get_sports_organizations():
    try:
        sports_api = SportsAPIIntegration()
        organizations = list(sports_api.api_configs.keys())
        return jsonify({"organizations": organizations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/sports/programs/<org_name>", methods=["GET"])
def get_organization_programs(org_name):
    try:
        sports_api = SportsAPIIntegration()
        programs = sports_api.fetch_programs_from_organization(org_name)
        return jsonify({"programs": programs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/sports/programs/<org_name>/<program_id>/availability", methods=["GET"])
def check_program_availability(org_name, program_id):
    try:
        sports_api = SportsAPIIntegration()
        availability = sports_api.check_availability(org_name, program_id)
        return jsonify(availability), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Health check endpoint
@app.route("/api/health", methods=["GET"])
@monitor_performance
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()}), 200

# Performance monitoring endpoint
@app.route("/api/performance", methods=["GET"])
@jwt_required()
def performance_report():
    try:
        report = get_performance_report()
        return jsonify(report), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Initialize database
with app.app_context():
    db.create_all()
    
    # Seed initial programs if database is empty
    if Program.query.count() == 0:
        programs_data = read_json("programs.json")
        for program_data in programs_data:
            program = Program(
                name=program_data['name'],
                age_range=program_data['ageRange'],
                price=program_data['price'],
                location=program_data['location']
            )
            db.session.add(program)
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
