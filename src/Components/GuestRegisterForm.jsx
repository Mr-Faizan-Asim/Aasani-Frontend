// src/components/GuestRegisterForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestRegisterForm = () => {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("userEmail");

  // inviter (user._id) we'll load here:
  const [inviterId, setInviterId] = useState(null);

  const [formData, setFormData] = useState({
    cnic: "",
    homeId: "",
    guestName: "",
    guestPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Load current user to get inviterId
  useEffect(() => {
    if (!storedEmail) return;
    axios
      .get(`https://sahulat-kar-backend.vercel.app/api/users/email/${storedEmail}`)
      .then((res) => setInviterId(res.data._id))
      .catch((err) => console.error("Failed to load inviter:", err));
  }, [storedEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.cnic.trim()) {
      errs.cnic = "CNIC is required";
    } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.cnic)) {
      errs.cnic = "Invalid CNIC format (XXXXX-XXXXXXX-X)";
    }
    if (!formData.homeId.trim()) errs.homeId = "House number is required";
    if (!formData.guestName.trim()) errs.guestName = "Guest name is required";
    if (!formData.guestPhone.trim()) {
      errs.guestPhone = "Guest phone is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.guestPhone)) {
      errs.guestPhone = "Invalid phone number";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      return setErrors(validationErrors);
    }
    if (!inviterId) {
      return setErrors({ submit: "Still loading your user info..." });
    }
    setErrors({});

    try {
      const payload = {
        inviter: inviterId,
        homeId: formData.homeId,
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
      };
      const res = await axios.post(
        "https://sahulat-kar-backend.vercel.app/api/guestToHome/invite",
        payload
      );
      console.log("Guest invited:", res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error inviting guest:", err.response?.data || err);
      setErrors({
        submit: err.response?.data.message || "Invitation failed",
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Add a Guest to Security Board</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* CNIC */}
        <label htmlFor="cnic" className="block mb-2 text-sm font-medium text-gray-700">
          Your CNIC
        </label>
        <input
          id="cnic"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          placeholder="XXXXX-XXXXXXX-X"
          className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.cnic ? "border-red-500" : ""
          }`}
        />
        {errors.cnic && <p className="text-red-500 text-xs mb-2">{errors.cnic}</p>}

        {/* House Number */}
        <label htmlFor="homeId" className="block mb-2 text-sm font-medium text-gray-700">
          House Number
        </label>
        <input
          id="homeId"
          name="homeId"
          value={formData.homeId}
          onChange={handleChange}
          placeholder="Enter your house number"
          className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.homeId ? "border-red-500" : ""
          }`}
        />
        {errors.homeId && <p className="text-red-500 text-xs mb-2">{errors.homeId}</p>}

        {/* Guest Name */}
        <label htmlFor="guestName" className="block mb-2 text-sm font-medium text-gray-700">
          Guest Name
        </label>
        <input
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          placeholder="Enter guest's name"
          className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.guestName ? "border-red-500" : ""
          }`}
        />
        {errors.guestName && <p className="text-red-500 text-xs mb-2">{errors.guestName}</p>}

        {/* Guest Phone */}
        <label htmlFor="guestPhone" className="block mb-2 text-sm font-medium text-gray-700">
          Guest Phone
        </label>
        <input
          id="guestPhone"
          name="guestPhone"
          value={formData.guestPhone}
          onChange={handleChange}
          placeholder="+923001234567"
          className={`mb-6 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.guestPhone ? "border-red-500" : ""
          }`}
        />
        {errors.guestPhone && <p className="text-red-500 text-xs mb-2">{errors.guestPhone}</p>}

        <button
          type="submit"
          className="w-full py-2 mb-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Send Invitation
        </button>

        {errors.submit && <p className="text-red-500 text-xs mb-2">{errors.submit}</p>}
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 max-w-sm mx-auto text-center">
            <p className="text-gray-800 mb-4">Invitation sent successfully!</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestRegisterForm;