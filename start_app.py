#!/usr/bin/env python3
"""
SportsID Application Startup Script
Checks PostgreSQL availability, starts Flask backend and React frontend.
"""

import os
import sys
import time
import subprocess
from urllib.parse import urlparse
import psycopg2

# ------------------------ PostgreSQL Utilities ------------------------ #
def check_postgresql_connection():
    """Check if PostgreSQL is available and accessible"""
    try:
        db_url = os.environ.get('DATABASE_URL', 'postgresql://sportsid:sportsid123@localhost:5432/sportsid')
        parsed = urlparse(db_url)
        
        conn = psycopg2.connect(
            host=parsed.hostname or 'localhost',
            port=parsed.port or 5432,
            database=(parsed.path[1:] or 'sportsid'),
            user=parsed.username or 'sportsid',
            password=parsed.password or 'sportsid123',
            connect_timeout=10
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        
        print(f"✅ PostgreSQL connection successful! Version: {version}")
        return True
    except psycopg2.OperationalError as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def wait_for_postgresql(max_attempts=30, delay=2):
    """Wait until PostgreSQL becomes available"""
    print("⏳ Waiting for PostgreSQL to become available...")
    for attempt in range(1, max_attempts + 1):
        if check_postgresql_connection():
            return True
        print(f"   Attempt {attempt}/{max_attempts} failed, retrying in {delay}s...")
        time.sleep(delay)
    print(f"❌ PostgreSQL not available after {max_attempts} attempts")
    return False

# ------------------------ Application Startup ------------------------ #
def start_backend():
    """Start Flask backend"""
    # Ensure environment variables
    os.environ.setdefault('DATABASE_URL', 'postgresql://sportsid:sportsid123@localhost:5432/sportsid')
    os.environ.setdefault('SECRET_KEY', 'your-secret-key-change-in-production')
    os.environ.setdefault('JWT_SECRET_KEY', 'jwt-secret-string')
    
    # Add backend folder to sys.path
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
    
    try:
        from app import app
        print("✅ Flask backend loaded successfully")
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"❌ Failed to start Flask backend: {e}")
        sys.exit(1)

def start_frontend():
    """Start React frontend"""
    frontend_path = os.path.join(os.path.dirname(__file__), "frontend")
    if not os.path.isdir(frontend_path):
        print(f"❌ Frontend directory not found at {frontend_path}")
        return
    
    print("🌐 Starting React frontend...")
    try:
        # Spawn npm process
        subprocess.Popen(["npm", "run", "dev"], cwd=frontend_path)
        print("✅ React frontend started (npm run dev)")
    except FileNotFoundError:
        print("❌ npm not found. Make sure Node.js is installed and in PATH.")
    except Exception as e:
        print(f"❌ Failed to start React frontend: {e}")

# ------------------------ Main ------------------------ #
def main():
    print("🏆 SportsID Startup Script")
    print("=" * 50)
    
    if not wait_for_postgresql():
        print("❌ Cannot start application without PostgreSQL")
        sys.exit(1)
    
    # Start frontend in background
    start_frontend()
    
    # Start backend in foreground
    start_backend()

if __name__ == "__main__":
    main()
