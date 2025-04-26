// src/components/FindServiceForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindServiceForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    issue: "",
    offerPrice: "",
  });
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.get("https://sahulat-kar-backend.vercel.app/api/provider/find", {
        params: {
          category: formData.category,
          offerPrice: formData.offerPrice,
        },
      });
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("There was an error fetching the services. Please try again later.");
    }
  };

  // When a provider result is clicked, navigate to their read-only profile.
  const handleResultClick = (provider) => {
    // We assume the provider document has the user ID stored in provider.user.
    navigate(`/user/${provider.user}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Find a Service</h1>
      <p className="text-gray-600 mb-8">Describe your issue and your budget</p>
      <form onSubmit={handleSubmit}>
        {/* Category */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Category</option>
          <option value="household">House Hold Work</option>
          <option value="outside">Outside Work</option>
          <option value="automechanics">AutoMechanics Work</option>
          <option value="electric">Electric Work</option>
        </select>

        {/* Issue Description (optional) */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Issue Description
        </label>
        <textarea
          name="issue"
          rows="3"
          value={formData.issue}
          onChange={handleChange}
          placeholder="Describe the issue you’re facing..."
          className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Offer Price */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Offer Price
        </label>
        <input
          type="number"
          name="offerPrice"
          value={formData.offerPrice}
          onChange={handleChange}
          placeholder="e.g., 2000"
          className="mb-6 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Find Button */}
        <button
          type="submit"
          className="w-full py-2 mb-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Find
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Matching Results */}
      {matches.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Matching Providers</h2>
          {matches.map((provider, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(provider)}
              className="cursor-pointer bg-white rounded-md p-3 mb-2 shadow-sm border hover:bg-gray-50 transition-colors"
            >
              <p className="text-purple-700 font-medium">
                {provider.service} by {provider.email}
              </p>
              <p className="text-sm text-gray-600">Price: {provider.price} PKR</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindServiceForm;
