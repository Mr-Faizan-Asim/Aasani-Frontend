// src/components/GuestsDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestsDashboard = () => {
  const [houseNo, setHouseNo] = useState('');
  const [guests, setGuests] = useState([]);
  const [topGuests, setTopGuests] = useState([]);
  const [error, setError] = useState('');

  // Fetch top 5 recent guests across all houses
  useEffect(() => {
    const fetchTopGuests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/guests'); // fetch all then slice
        const sorted = res.data
          .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
        setTopGuests(sorted.slice(0, 5));
      } catch (err) {
        setError('Failed to load top guests');
      }
    };
    fetchTopGuests();
  }, []);

  const handleFilter = async () => {
    if (!houseNo.trim()) {
      setError('Enter a house number');
      return;
    }
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/guests/house/${houseNo}`);
      setGuests(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'No guests found');
      setGuests([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Guest Dashboard</h2>

      {/* Filter Section */}
      <div className="flex items-center mb-8">
        <input
          type="text"
          placeholder="Enter House ID or Number"
          value={houseNo}
          onChange={e => setHouseNo(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleFilter}
          className="px-6 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition"
        >
          Filter
        </button>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Filtered Guests */}
      {guests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guests.map(g => (
            <div key={g._id} className="bg-white p-4 rounded-lg shadow">
              <p><span className="font-semibold">Name:</span> {g.guestName}</p>
              <p><span className="font-semibold">House ID:</span> {g.houseId}</p>
              <p><span className="font-semibold">House No:</span> {g.houseNumber}</p>
              <p><span className="font-semibold">Colony:</span> {g.colony}</p>
              <p><span className="font-semibold">Visit Date:</span> {new Date(g.visitDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Top 5 Guests */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Top 5 Recent Guests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topGuests.map(g => (
          <div key={g._id} className="bg-white p-4 rounded-lg shadow">
            <p><span className="font-semibold">Name:</span> {g.guestName}</p>
            <p><span className="font-semibold">House ID:</span> {g.houseId}</p>
            <p><span className="font-semibold">Visit Date:</span> {new Date(g.visitDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestsDashboard;
