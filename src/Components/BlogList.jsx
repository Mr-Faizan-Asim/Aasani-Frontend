// src/components/blog/BlogList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(() => setError('Failed to load blogs'));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Blog Posts</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-6">
        {blogs.map(b => (
          <div key={b._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600 mb-1">By {b.author.name} on {new Date(b.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-800 mb-2">Provider: {b.provider.service} ({b.provider.email})</p>
            <p className="text-gray-700">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
