import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Note: updated route to /providers/all
    axios
      .get('https://backend-gdg.vercel.app/api/providers/all')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Services</h2>
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Provider Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Authorized</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {/* assuming backend .populate('user', 'name') */}
                  {s.user?.name || 'Unknown'}
                </td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.service}</td>
                <td className="px-4 py-2">{s.category}</td>
                <td className="px-4 py-2">₹{s.price}</td>
                <td className="px-4 py-2">
                  {s.authorized ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
