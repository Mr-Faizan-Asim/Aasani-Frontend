// src/components/ServiceProviders.jsx
import React from "react";

const ServiceProviders = () => {
  const providers = [
    { userId: "P-001", location: "Karachi" },
    { userId: "P-002", location: "Islamabad" },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Service Providers</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2 border">{provider.userId}</td>
                <td className="p-2 border">{provider.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProviders;
