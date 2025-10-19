-- PostgreSQL initialization script for SportsID
-- This script runs when the PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance
-- These will be created after the tables are created by the application

-- Set timezone
SET timezone = 'UTC';

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE sportsid TO sportsid;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sportsid;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sportsid;

