import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceApprovals() {
  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services').then(res => {
      const pending = res.data.filter(service => !service.authorized);
      setPendingServices(pending);
    });
  }, []);

  const approveService = async (id) => {
    await axios.put(`/https://backend-gdg.vercel.app/api/services/${id}/authorize`);
    setPendingServices(prev => prev.filter(service => service._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Service Approval Requests</h2>
      {pendingServices.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Provider</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingServices.map(service => (
                <tr key={service._id} className="border-t">
                  <td className="px-4 py-2">{service.user?.name || 'Unknown'}</td>
                  <td className="px-4 py-2">{service.tags.join(', ')}</td>
                  <td className="px-4 py-2">{service.price}</td>
                  <td className="px-4 py-2">{service.location}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => approveService(service._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
