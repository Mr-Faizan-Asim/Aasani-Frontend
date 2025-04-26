// src/components/FindService.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ category: '', issue: '', offerPrice: '' });
  const [allProviders, setAllProviders] = useState([]);
  const [displayedProviders, setDisplayedProviders] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState('');

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch providers from backend based on category and offerPrice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get('https://sahulat-kar-backend.vercel.app/api/provider/find', {
        params: {
          category: formData.category,
          offerPrice: formData.offerPrice
        }
      });
      const providers = res.data;
      setAllProviders(providers);
      setDisplayedProviders(providers);

      // derive unique tags from providers
      const tagsSet = new Set();
      providers.forEach(p => p.serviceTags?.forEach(tag => tagsSet.add(tag)));
      setAvailableTags(Array.from(tagsSet));
      setSelectedTags([]);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('There was an error fetching the services. Please try again later.');
    }
  };

  // Filter providers whenever selectedTags changes
  useEffect(() => {
    if (selectedTags.length === 0) {
      setDisplayedProviders(allProviders);
    } else {
      setDisplayedProviders(
        allProviders.filter(provider =>
          selectedTags.every(tag => provider.serviceTags?.includes(tag))
        )
      );
    }
  }, [selectedTags, allProviders]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  // Navigate to provider's profile
  const viewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Find a Service Provider</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Tag Filters */}
      {availableTags.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Filter by Tags</h2>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border transition ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 ml-2 rounded-full text-sm text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Providers Grid */}
      {displayedProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProviders.map(provider => (
            <div key={provider._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{provider.service}</h3>
                <p className="text-gray-700 mb-2">By: {provider.email}</p>
                <p className="text-gray-900 font-bold mb-4">Price: {provider.price} PKR</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {provider.serviceTags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => viewProfile(provider.user)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No providers found. Try a different search.</p>
      )}
    </div>
  );
};

export default FindService;
