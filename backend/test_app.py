"""
Test suite for SportsID application
Tests authentication, API endpoints, and performance
"""

import unittest
import json
import os
import sys
from datetime import datetime

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, db, User, Program, Family

class TestSportsIDApp(unittest.TestCase):
    """Test cases for the SportsID application"""
    
    def setUp(self):
        """Set up test environment"""
        self.app = app
        self.app.config['TESTING'] = True
        # Use PostgreSQL test database
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sportsid:sportsid123@localhost:5432/sportsid_test'
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.create_all()
    
    def tearDown(self):
        """Clean up after tests"""
        with self.app.app_context():
            db.drop_all()
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
    
    def test_user_registration(self):
        """Test user registration"""
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User',
            'phone': '123-456-7890'
        }
        
        response = self.client.post('/api/auth/register', 
                                   data=json.dumps(user_data),
                                   content_type='application/json')
        
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertEqual(data['user']['email'], 'test@example.com')
    
    def test_user_registration_duplicate_email(self):
        """Test registration with duplicate email"""
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        # Register first user
        self.client.post('/api/auth/register', 
                        data=json.dumps(user_data),
                        content_type='application/json')
        
        # Try to register with same email
        response = self.client.post('/api/auth/register', 
                                  data=json.dumps(user_data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_user_login(self):
        """Test user login"""
        # First register a user
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        self.client.post('/api/auth/register', 
                        data=json.dumps(user_data),
                        content_type='application/json')
        
        # Now test login
        login_data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        
        response = self.client.post('/api/auth/login', 
                                  data=json.dumps(login_data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertEqual(data['user']['email'], 'test@example.com')
    
    def test_user_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        login_data = {
            'email': 'nonexistent@example.com',
            'password': 'wrongpassword'
        }
        
        response = self.client.post('/api/auth/login', 
                                  data=json.dumps(login_data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_protected_endpoint_without_token(self):
        """Test accessing protected endpoint without token"""
        response = self.client.get('/api/auth/me')
        self.assertEqual(response.status_code, 401)
    
    def test_protected_endpoint_with_token(self):
        """Test accessing protected endpoint with valid token"""
        # Register and login to get token
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        register_response = self.client.post('/api/auth/register', 
                                           data=json.dumps(user_data),
                                           content_type='application/json')
        
        token_data = json.loads(register_response.data)
        token = token_data['access_token']
        
        # Use token to access protected endpoint
        headers = {'Authorization': f'Bearer {token}'}
        response = self.client.get('/api/auth/me', headers=headers)
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['email'], 'test@example.com')
    
    def test_get_programs(self):
        """Test getting programs"""
        response = self.client.get('/api/programs')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
    
    def test_create_family(self):
        """Test creating a family registration"""
        # First register and login to get token
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        register_response = self.client.post('/api/auth/register', 
                                           data=json.dumps(user_data),
                                           content_type='application/json')
        
        token_data = json.loads(register_response.data)
        token = token_data['access_token']
        
        # Create family
        family_data = {
            'family_name': 'Test Family',
            'address': '123 Test St',
            'city': 'Test City',
            'state': 'TS',
            'zip_code': '12345'
        }
        
        headers = {'Authorization': f'Bearer {token}'}
        response = self.client.post('/api/family', 
                                  data=json.dumps(family_data),
                                  content_type='application/json',
                                  headers=headers)
        
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['family']['family_name'], 'Test Family')
    
    def test_get_families(self):
        """Test getting user's families"""
        # Register, login, and create family
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        register_response = self.client.post('/api/auth/register', 
                                           data=json.dumps(user_data),
                                           content_type='application/json')
        
        token_data = json.loads(register_response.data)
        token = token_data['access_token']
        
        family_data = {
            'family_name': 'Test Family',
            'address': '123 Test St',
            'city': 'Test City',
            'state': 'TS',
            'zip_code': '12345'
        }
        
        headers = {'Authorization': f'Bearer {token}'}
        self.client.post('/api/family', 
                        data=json.dumps(family_data),
                        content_type='application/json',
                        headers=headers)
        
        # Get families
        response = self.client.get('/api/family', headers=headers)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['family_name'], 'Test Family')
    
    def test_sports_organizations_endpoint(self):
        """Test getting sports organizations"""
        response = self.client.get('/api/sports/organizations')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('organizations', data)
        self.assertIsInstance(data['organizations'], list)
    
    def test_performance_monitoring(self):
        """Test performance monitoring endpoint"""
        # Register and login to get token
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        
        register_response = self.client.post('/api/auth/register', 
                                           data=json.dumps(user_data),
                                           content_type='application/json')
        
        token_data = json.loads(register_response.data)
        token = token_data['access_token']
        
        headers = {'Authorization': f'Bearer {token}'}
        response = self.client.get('/api/performance', headers=headers)
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('healthy', data)
        self.assertIn('metrics', data)

class TestPerformanceRequirements(unittest.TestCase):
    """Test performance requirements (100 concurrent users, 95% uptime)"""
    
    def setUp(self):
        """Set up performance test environment"""
        self.app = app
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.create_all()
    
    def test_concurrent_requests(self):
        """Test handling multiple concurrent requests"""
        import threading
        import time
        
        results = []
        errors = []
        
        def make_request():
            try:
                response = self.client.get('/api/health')
                results.append(response.status_code)
            except Exception as e:
                errors.append(str(e))
        
        # Simulate 50 concurrent requests (half of target 100)
        threads = []
        for _ in range(50):
            thread = threading.Thread(target=make_request)
            threads.append(thread)
            thread.start()
        
        # Wait for all threads to complete
        for thread in threads:
            thread.join()
        
        # Check results
        self.assertEqual(len(errors), 0, f"Errors occurred: {errors}")
        self.assertEqual(len(results), 50)
        self.assertTrue(all(status == 200 for status in results))
    
    def test_response_time(self):
        """Test that response times are acceptable"""
        import time
        
        start_time = time.time()
        response = self.client.get('/api/health')
        end_time = time.time()
        
        response_time = end_time - start_time
        
        # Response should be under 2 seconds
        self.assertLess(response_time, 2.0)
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    # Run tests
    unittest.main(verbosity=2)
