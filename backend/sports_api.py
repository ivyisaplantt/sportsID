import requests
import json
from datetime import datetime
from typing import List, Dict, Optional

class SportsAPIIntegration:
    """
    Integration service for sports organization APIs
    Supports multiple sports organizations and their APIs
    """
    
    def __init__(self):
        self.api_configs = {
            'youth_sports_league': {
                'base_url': 'https://api.youthsportsleague.com/v1',
                'api_key': 'your-api-key-here',
                'headers': {
                    'Authorization': 'Bearer your-api-key-here',
                    'Content-Type': 'application/json'
                }
            },
            'community_rec_center': {
                'base_url': 'https://api.communityrec.com/v2',
                'api_key': 'your-api-key-here',
                'headers': {
                    'X-API-Key': 'your-api-key-here',
                    'Content-Type': 'application/json'
                }
            }
        }
    
    def fetch_programs_from_organization(self, org_name: str, filters: Optional[Dict] = None) -> List[Dict]:
        """
        Fetch programs from a specific sports organization
        """
        try:
            config = self.api_configs.get(org_name)
            if not config:
                raise ValueError(f"Unknown organization: {org_name}")
            
            # Build URL with filters
            url = f"{config['base_url']}/programs"
            params = filters or {}
            
            response = requests.get(
                url,
                headers=config['headers'],
                params=params,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return self._normalize_program_data(data, org_name)
            else:
                print(f"API Error for {org_name}: {response.status_code}")
                return []
                
        except requests.RequestException as e:
            print(f"Request failed for {org_name}: {str(e)}")
            return []
        except Exception as e:
            print(f"Error fetching from {org_name}: {str(e)}")
            return []
    
    def _normalize_program_data(self, data: Dict, org_name: str) -> List[Dict]:
        """
        Normalize program data from different organizations into a standard format
        """
        programs = []
        
        if org_name == 'youth_sports_league':
            # Handle Youth Sports League API format
            for program in data.get('programs', []):
                programs.append({
                    'name': program.get('title', ''),
                    'age_range': program.get('age_group', ''),
                    'price': program.get('cost', 0),
                    'location': program.get('venue', ''),
                    'description': program.get('description', ''),
                    'sport_type': program.get('sport', ''),
                    'organization': 'Youth Sports League',
                    'external_id': program.get('id'),
                    'registration_url': program.get('registration_link', ''),
                    'start_date': program.get('start_date', ''),
                    'end_date': program.get('end_date', '')
                })
        
        elif org_name == 'community_rec_center':
            # Handle Community Rec Center API format
            for program in data.get('activities', []):
                programs.append({
                    'name': program.get('name', ''),
                    'age_range': program.get('age_range', ''),
                    'price': program.get('fee', 0),
                    'location': program.get('facility', ''),
                    'description': program.get('details', ''),
                    'sport_type': program.get('category', ''),
                    'organization': 'Community Rec Center',
                    'external_id': program.get('activity_id'),
                    'registration_url': program.get('signup_url', ''),
                    'start_date': program.get('session_start', ''),
                    'end_date': program.get('session_end', '')
                })
        
        return programs
    
    def sync_all_organizations(self) -> Dict[str, List[Dict]]:
        """
        Sync programs from all configured organizations
        """
        all_programs = {}
        
        for org_name in self.api_configs.keys():
            print(f"Syncing programs from {org_name}...")
            programs = self.fetch_programs_from_organization(org_name)
            all_programs[org_name] = programs
            print(f"Found {len(programs)} programs from {org_name}")
        
        return all_programs
    
    def get_program_details(self, org_name: str, program_id: str) -> Optional[Dict]:
        """
        Get detailed information about a specific program
        """
        try:
            config = self.api_configs.get(org_name)
            if not config:
                return None
            
            url = f"{config['base_url']}/programs/{program_id}"
            response = requests.get(
                url,
                headers=config['headers'],
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return None
                
        except Exception as e:
            print(f"Error fetching program details: {str(e)}")
            return None
    
    def check_availability(self, org_name: str, program_id: str) -> Dict:
        """
        Check program availability and registration status
        """
        try:
            config = self.api_configs.get(org_name)
            if not config:
                return {'available': False, 'error': 'Unknown organization'}
            
            url = f"{config['base_url']}/programs/{program_id}/availability"
            response = requests.get(
                url,
                headers=config['headers'],
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'available': data.get('spots_available', 0) > 0,
                    'spots_remaining': data.get('spots_available', 0),
                    'registration_deadline': data.get('deadline', ''),
                    'status': data.get('status', 'unknown')
                }
            else:
                return {'available': False, 'error': 'API error'}
                
        except Exception as e:
            return {'available': False, 'error': str(e)}

# Mock data for development/testing
def get_mock_sports_data() -> List[Dict]:
    """
    Return mock sports program data for development
    """
    return [
        {
            'name': 'Youth Soccer League',
            'age_range': '8-12',
            'price': 120,
            'location': 'Atlanta Sports Park',
            'description': 'Learn soccer fundamentals in a fun, competitive environment',
            'sport_type': 'Soccer',
            'organization': 'Youth Sports League',
            'external_id': 'YSL001',
            'registration_url': 'https://youthsportsleague.com/register/soccer',
            'start_date': '2024-03-15',
            'end_date': '2024-05-15'
        },
        {
            'name': 'Junior Basketball Camp',
            'age_range': '10-14',
            'price': 95,
            'location': 'Midtown Rec Center',
            'description': 'Develop basketball skills with professional coaching',
            'sport_type': 'Basketball',
            'organization': 'Community Rec Center',
            'external_id': 'CRC002',
            'registration_url': 'https://communityrec.com/register/basketball',
            'start_date': '2024-03-20',
            'end_date': '2024-05-20'
        },
        {
            'name': 'Swimming Lessons',
            'age_range': '6-10',
            'price': 80,
            'location': 'Aquatic Center',
            'description': 'Learn to swim with certified instructors',
            'sport_type': 'Swimming',
            'organization': 'Community Rec Center',
            'external_id': 'CRC003',
            'registration_url': 'https://communityrec.com/register/swimming',
            'start_date': '2024-04-01',
            'end_date': '2024-06-01'
        }
    ]

