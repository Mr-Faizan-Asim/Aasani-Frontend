// src/components/SingleUser.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { userId } = useParams(); // Get userId from the URL (e.g., /user/:userId)
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user profile from the backend using the provided userId.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://sahulat-kar-backend.vercel.app/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Error loading profile");
      }
    };

    fetchUser();
  }, [userId]);

  // While the user data is loading, show a loading indicator.
  if (!user) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  // Read-only profile view: no edit button will be shown.
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            {user.name}'s Profile
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display fields in a read-only format */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                disabled
                value={user.name || ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                disabled
                value={user.email || ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            {/* For security reasons, you might not want to show the password */}
            <div>
              <label className="text-sm text-gray-600">Date of Birth</label>
              <input
                disabled
                type="date"
                value={user.dob ? user.dob.split("T")[0] : ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">CNIC</label>
              <input
                disabled
                value={user.cnic || ""}
                className="w-full mt-1 p-2 border border-gray-200 bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                disabled
                value={user.phone || ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <input
                disabled
                value={user.gender || ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <input
                disabled
                value={user.location || ""}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
          {/* Instead of an update button, we do not render any edit controls in read-only mode */}
        </div>

        {/* Optionally, you can display other information, such as services provided/requested */}
      </main>
    </div>
  );
};

export default SingleUser;
