import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import FamilyRegistration from '../components/FamilyRegistration';

interface Family {
  id: number;
  family_name: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFamilyModal, setShowFamilyModal] = useState(false);

  useEffect(() => {
    if (token) {
      fetchFamilies();
    }
  }, [token]);

  const fetchFamilies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/family', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFamilies(data);
      } else {
        setError('Failed to fetch families');
      }
    } catch (err) {
      setError('Error fetching families');
    } finally {
      setLoading(false);
    }
  };

  const handleFamilySuccess = () => {
    fetchFamilies();
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-responsive">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-600 text-responsive">
            Manage your family registrations and sports programs.
          </p>
        </div>

        <div className="grid-mobile">
          {/* User Profile Card */}
          <div className="card-mobile">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-2">
              <p className="text-responsive"><span className="font-medium">Name:</span> {user?.first_name} {user?.last_name}</p>
              <p className="text-responsive"><span className="font-medium">Email:</span> {user?.email}</p>
              {user?.phone && <p className="text-responsive"><span className="font-medium">Phone:</span> {user.phone}</p>}
            </div>
          </div>

          {/* Family Registrations */}
          <div className="card-mobile">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Family Registrations</h2>
            {loading ? (
              <div className="loading-mobile">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : error ? (
              <p className="text-red-600 text-responsive">{error}</p>
            ) : families.length === 0 ? (
              <p className="text-gray-600 text-responsive">No family registrations yet.</p>
            ) : (
              <div className="space-y-3">
                {families.map((family) => (
                  <div key={family.id} className="border rounded-lg p-3">
                    <h3 className="font-medium text-responsive">{family.family_name}</h3>
                    {family.address && (
                      <p className="text-sm text-gray-600">
                        {family.address}, {family.city}, {family.state} {family.zip_code}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8 card-mobile">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid-mobile">
            <button 
              onClick={() => setShowFamilyModal(true)}
              className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors btn-mobile touch-feedback"
            >
              Register Family
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors btn-mobile touch-feedback">
              Browse Programs
            </button>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors btn-mobile touch-feedback">
              View Schedule
            </button>
          </div>
        </div>
      </div>
      
      {showFamilyModal && (
        <FamilyRegistration
          onClose={() => setShowFamilyModal(false)}
          onSuccess={handleFamilySuccess}
        />
      )}
    </ProtectedRoute>
  );
};

export default Dashboard;