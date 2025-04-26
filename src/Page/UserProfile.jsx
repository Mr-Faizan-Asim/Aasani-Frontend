// src/components/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  // Retrieve userInfo from localStorage
  const stored = localStorage.getItem("userInfo");
  const userInfo = stored ? JSON.parse(stored) : null;
  const token = userInfo?.token;
  const email = userInfo?.email;

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!token || !email) {
      navigate('/signin');
    }
  }, [token, email, navigate]);

  // Fetch user profile
  useEffect(() => {
    if (!token || !email) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/email/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          gender: data.gender || '',
          dob: data.dob ? data.dob.split('T')[0] : '',
          phone: data.phone || '',
          location: data.location || '',
          cnic: data.cnic || '',
        });
      } catch (err) {
        console.error(err);
        setError('Error loading profile');
      }
    };
    fetchUser();
  }, [token, email]);

  // Fetch invited guests
  useEffect(() => {
    if (!user?._id) return;
    const fetchGuests = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/guestToHome/invites/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Failed to fetch guests');
        const { invites } = await res.json();
        setGuests(invites);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGuests();
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updates = { ...formData };
      // Prevent email change if desired
      delete updates.email;

      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setUser(updated);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  const servicesProvided = [
    'Fixed kitchen light',
    'Bathroom plumbing',
    'Fan rewiring',
  ];
  const servicesRequested = [
    'Air conditioner repair',
    'Water motor check',
    'Gas pipeline leak',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          User Profile
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                disabled={!editMode}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none"
              />
            </div>
            {/* Email (read-only) */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                disabled
                value={formData.email}
                className="w-full mt-1 p-2 border bg-gray-100 rounded-md"
              />
            </div>
            {/* Password (hidden) */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                disabled
                type="password"
                value="********"
                className="w-full mt-1 p-2 border bg-gray-100 rounded-md"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label className="text-sm text-gray-600">Date of Birth</label>
              <input
                disabled={!editMode}
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            {/* CNIC */}
            <div>
              <label className="text-sm text-gray-600">CNIC</label>
              <input
                disabled
                value={formData.cnic}
                className="w-full mt-1 p-2 border bg-gray-100 rounded-md"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                disabled={!editMode}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                disabled={!editMode}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Location */}
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <input
                disabled={!editMode}
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Edit/Save Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {editMode ? (
              <>  
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Services Lists & Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Services Provided</h2>
            <ul className="list-disc list-inside text-gray-700">
              {servicesProvided.map((s,i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Services Requested</h2>
            <ul className="list-disc list-inside text-gray-700">
              {servicesRequested.map((s,i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Guests You Invited</h2>
          {guests.length ? (
            <ul className="list-disc list-inside text-gray-700">
              {guests.map(g => <li key={g._id}>{g.guestName}</li>)}
            </ul>
          ) : (
            <p className="text-gray-600">No guests invited yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
