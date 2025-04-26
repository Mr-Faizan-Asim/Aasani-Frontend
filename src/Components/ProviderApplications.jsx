// src/components/ProviderApplications.jsx
import React from "react";

const ProviderApplications = () => {
  const applications = [
    {
      email: "provider1@example.com",
      cnic: "12345-6789012-3",
      cnicFront: "front.jpg",
      cnicBack: "back.jpg",
      userPic: "user1.jpg",
      service: "Cleaning",
      category: "Household",
      price: "1500",
    },
    {
      email: "provider2@example.com",
      cnic: "54321-0987654-1",
      cnicFront: "front2.jpg",
      cnicBack: "back2.jpg",
      userPic: "user2.jpg",
      service: "Plumbing",
      category: "Outside Work",
      price: "2000",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Provider Applications</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">CNIC</th>
              <th className="p-2 border">CNIC Front</th>
              <th className="p-2 border">CNIC Back</th>
              <th className="p-2 border">User Pic</th>
              <th className="p-2 border">Service Provided</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2 border">{app.email}</td>
                <td className="p-2 border">{app.cnic}</td>
                <td className="p-2 border">{app.cnicFront}</td>
                <td className="p-2 border">{app.cnicBack}</td>
                <td className="p-2 border">{app.userPic}</td>
                <td className="p-2 border">{app.service}</td>
                <td className="p-2 border">{app.category}</td>
                <td className="p-2 border">{app.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderApplications;
