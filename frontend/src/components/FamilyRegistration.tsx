import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface FamilyRegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FamilyRegistration: React.FC<FamilyRegistrationProps> = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    family_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/family', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || 'Failed to register family');
      }
    } catch (err) {
      setError('Error registering family');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-mobile">
      <div className="modal-content-mobile">
        <div className="flex justify-between items-center mb-4 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold">Register Family</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 btn-mobile touch-feedback"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 form-mobile p-4 sm:p-6">
          <div>
            <label htmlFor="family_name" className="block text-sm font-medium text-gray-700">
              Family Name *
            </label>
            <input
              type="text"
              id="family_name"
              name="family_name"
              required
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              value={formData.family_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
              value={formData.zip_code}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 btn-mobile touch-feedback"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 btn-mobile touch-feedback"
            >
              {loading ? 'Registering...' : 'Register Family'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyRegistration;
