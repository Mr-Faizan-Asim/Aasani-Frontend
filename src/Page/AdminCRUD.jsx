import React, { useEffect, useState } from "react";

const AdminCRUD = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({ email: "", role: "" });
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const res = await fetch("https://backend-gdg.vercel.app/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      await fetch(`https://backend-gdg.vercel.app/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditData({ email: user.email, role: user.role });
  };

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const res = await fetch(`https://backend-gdg.vercel.app/api/users/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const updatedUser = await res.json();
      setUsers(users.map((u) => (u._id === editingUserId ? updatedUser : u)));
      setEditingUserId(null);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin User Management</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-center font-semibold">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-t hover:bg-gray-50 transition">
                <td className="p-3 border">{user._id}</td>
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3 border">
                  {editingUserId === user._id ? (
                    <select
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="border p-1 rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-3 border space-x-2">
                  {editingUserId === user._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCRUD;
