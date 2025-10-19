#!/usr/bin/env python3
"""
PostgreSQL Database Setup Script for SportsID
This script creates the database and user if they don't exist
"""

import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_database():
    """Create PostgreSQL database and user for SportsID"""
    
    # Database configuration
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_PORT = os.environ.get('DB_PORT', '5432')
    DB_NAME = os.environ.get('DB_NAME', 'sportsid')
    DB_USER = os.environ.get('DB_USER', 'sportsid')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', 'sportsid123')
    
    # Admin credentials (for creating database and user)
    ADMIN_USER = os.environ.get('ADMIN_USER', 'postgres')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')
    
    try:
        # Connect as admin user to create database and user
        print(f"Connecting to PostgreSQL as {ADMIN_USER}...")
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=ADMIN_USER,
            password=ADMIN_PASSWORD
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (DB_NAME,))
        if cursor.fetchone():
            print(f"Database '{DB_NAME}' already exists")
        else:
            # Create database
            print(f"Creating database '{DB_NAME}'...")
            cursor.execute(f"CREATE DATABASE {DB_NAME}")
            print(f"✅ Database '{DB_NAME}' created successfully")
        
        # Check if user exists
        cursor.execute("SELECT 1 FROM pg_roles WHERE rolname = %s", (DB_USER,))
        if cursor.fetchone():
            print(f"User '{DB_USER}' already exists")
        else:
            # Create user
            print(f"Creating user '{DB_USER}'...")
            cursor.execute(f"CREATE USER {DB_USER} WITH PASSWORD '{DB_PASSWORD}'")
            print(f"✅ User '{DB_USER}' created successfully")
        
        # Grant privileges
        print(f"Granting privileges to user '{DB_USER}'...")
        cursor.execute(f"GRANT ALL PRIVILEGES ON DATABASE {DB_NAME} TO {DB_USER}")
        cursor.execute(f"ALTER USER {DB_USER} CREATEDB")
        print(f"✅ Privileges granted to user '{DB_USER}'")
        
        cursor.close()
        conn.close()
        
        # Test connection with new user
        print(f"Testing connection with user '{DB_USER}'...")
        test_conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        test_conn.close()
        print(f"✅ Connection test successful!")
        
        return True
        
    except psycopg2.Error as e:
        print(f"❌ Database setup failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def create_tables():
    """Create application tables using Flask-SQLAlchemy"""
    try:
        from app import app, db
        
        with app.app_context():
            print("Creating application tables...")
            db.create_all()
            print("✅ Application tables created successfully")
            return True
            
    except Exception as e:
        print(f"❌ Failed to create tables: {e}")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up PostgreSQL database for SportsID...")
    print("=" * 50)
    
    # Create database and user
    if not create_database():
        print("❌ Database setup failed. Exiting.")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("📊 Creating application tables...")
    
    # Create application tables
    if not create_tables():
        print("❌ Table creation failed. Exiting.")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("🎉 Database setup completed successfully!")
    print("\nNext steps:")
    print("1. Set environment variables:")
    print("   export DB_HOST=localhost")
    print("   export DB_PORT=5432")
    print("   export DB_NAME=sportsid")
    print("   export DB_USER=sportsid")
    print("   export DB_PASSWORD=sportsid123")
    print("\n2. Start the application:")
    print("   python app.py")

if __name__ == "__main__":
    main()

