import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services').then(res => setServices(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Services</h2>
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Provider</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Authorized</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id} className="border-t">
                <td className="px-4 py-2">{s.user.name}</td>
                <td className="px-4 py-2">{s.tags.join(', ')}</td>
                <td className="px-4 py-2">{s.price}</td>
                <td className="px-4 py-2">{s.location}</td>
                <td className="px-4 py-2">{s.authorized ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
