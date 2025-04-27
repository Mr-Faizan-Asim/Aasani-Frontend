// src/components/dashboard/SocietyOwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SocietyOwnerDashboard() {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [error, setError] = useState('');

  // Fetch all houses for this society owner
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await axios.get('https://backend-gdg.vercel.app/api/houses'); // expects all houses
        setHouses(res.data);
      } catch (err) {
        setError('Failed to load houses');
      }
    };
    fetchHouses();
  }, []);

  const handleSelect = id => {
    const house = houses.find(h => h._id === id);
    setSelectedHouse(house || null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Society Owner Dashboard</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* House Selector */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-gray-700">Select House:</label>
        <select
          value={selectedHouse?._id || ''}
          onChange={e => handleSelect(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose a house --</option>
          {houses.map(h => (
            <option key={h._id} value={h._id}>
              {h.houseNumber} - {h.colony}
            </option>
          ))}
        </select>
      </div>

      {/* House Details */}
      {selectedHouse && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">House Details</h3>
          <p><span className="font-semibold">House Number:</span> {selectedHouse.houseNumber}</p>
          <p><span className="font-semibold">Colony:</span> {selectedHouse.colony}</p>
          <p><span className="font-semibold">Owner ID:</span> {selectedHouse.user}</p>
          {/* Additional details if any */}
        </div>
      )}
    </div>
  );
}
