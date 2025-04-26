// src/components/blog/AddBlog.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ title: '', providerId: '', description: '' });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch service providers
    axios.get('/api/services')
      .then(res => setProviders(res.data))
      .catch(() => setError('Failed to load providers'));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const { title, providerId, description } = form;
    if (!title || !providerId || !description) {
      setError('All fields required'); return;
    }
    try {
      await axios.post('/api/blogs', { title, providerId, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/blog');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Blog Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title}
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <select name="providerId" value={form.providerId} onChange={handleChange}
          className="w-full mb-3 p-2 border rounded">
          <option value="">Select Provider</option>
          {providers.map(p => (
            <option key={p._id} value={p._id}>{p.service} ({p.email})</option>
          ))}
        </select>
        <textarea name="description" placeholder="Description" value={form.description}
          onChange={handleChange} className="w-full mb-3 p-2 border rounded h-32" />
        <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
}
