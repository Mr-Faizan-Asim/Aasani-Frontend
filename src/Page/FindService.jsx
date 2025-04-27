// src/components/FindService.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ category: '', offerPrice: '' });
  const [allProviders, setAllProviders] = useState([]);
  const [displayedProviders, setDisplayedProviders] = useState([]);
  const [error, setError] = useState('');

  // Fetch all services on mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/provider/all')
      .then(res => {
        setAllProviders(res.data);
        setDisplayedProviders(res.data);
      })
      .catch(err => {
        console.error('Error loading services:', err);
        setError('Could not load services. Try again later.');
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const { category, offerPrice } = formData;

    // If no filters, just show full list
    if (!category && !offerPrice) {
      return setDisplayedProviders(allProviders);
    }

    try {
      const res = await axios.get(
        'http://localhost:5000/api/provider/find',
        { params: { category, offerPrice } }
      );
      setDisplayedProviders(res.data);
    } catch (err) {
      console.error('Error fetching filtered services:', err);
      setError('Error fetching services. Please try again.');
    }
  };

  const viewProfile = userId => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              <option value="household">Household Work</option>
              <option value="outside">Outside Work</option>
              <option value="automechanics">AutoMechanics Work</option>
              <option value="electric">Electric Work</option>
            </select>
          </div>

          {/* Max Offer Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="e.g., 2000"
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Providers Grid */}
      {displayedProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProviders.map(p => (
            <div key={p._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{p.service}</h3>
                <span className="inline-block mb-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {p.category}
                </span>
                <p className="text-gray-700 mb-1">By: {p.email}</p>
                <p className="text-gray-900 font-bold mb-3">
                  Price: {p.price} PKR
                </p>
                <p className="text-sm mb-4">
                  Authorized:{' '}
                  <span className={p.authorized ? 'text-green-600' : 'text-red-600'}>
                    {p.authorized ? 'Yes' : 'No'}
                  </span>
                </p>
                <button
                  onClick={() => viewProfile(p.user)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No providers found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default FindService;
