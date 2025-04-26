import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProviderRegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    cnic: "",
    cnicPicFront: null,
    cnicPicBack: null,
    userPic: null,
    tags: [],
    inputTag: "",
    description: "",
    price: "",
    location: ""
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && formData.inputTag.trim() !== "") {
      e.preventDefault();
      if (formData.tags.length < 5) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.inputTag.trim()],
          inputTag: ""
        }));
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required";
    } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(formData.cnic)) {
      newErrors.cnic = "Invalid CNIC format (XXXXX-XXXXXXX-X)";
    }
    if (!formData.cnicPicFront) {
      newErrors.cnicPicFront = "CNIC front image is required";
    }
    if (!formData.cnicPicBack) {
      newErrors.cnicPicBack = "CNIC back image is required";
    }
    if (!formData.userPic) {
      newErrors.userPic = "User picture is required";
    }
    if (formData.tags.length === 0) {
      newErrors.tags = "At least one service tag is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const dataToSend = new FormData();
      dataToSend.append("email", formData.email);
      dataToSend.append("cnic", formData.cnic);
      dataToSend.append("cnicPicFront", formData.cnicPicFront);
      dataToSend.append("cnicPicBack", formData.cnicPicBack);
      dataToSend.append("userPic", formData.userPic);
      formData.tags.forEach(tag => dataToSend.append("tags[]", tag));
      dataToSend.append("description", formData.description);
      dataToSend.append("price", formData.price);
      dataToSend.append("location", formData.location);

      try {
        setLoading(true);
        const res = await axios.post(
          "https://sahulat-kar-backend.vercel.app/api/provider/register",
          dataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Provider Registration Submitted:", res.data);
        setShowModal(true);
      } catch (error) {
        console.error("Error registering provider:", error.response?.data || error.message);
        setErrors({ submit: error.response?.data?.message || "Registration failed" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Service Provider</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

        {/* CNIC Field */}
        <input
          type="text"
          name="cnic"
          placeholder="CNIC (XXXXX-XXXXXXX-X)"
          value={formData.cnic}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border rounded-md"
        />
        {errors.cnic && <p className="text-red-500 text-xs mb-2">{errors.cnic}</p>}

        {/* CNIC Pictures and User Pic */}
        {["cnicPicFront", "cnicPicBack", "userPic"].map((picType) => (
          <div key={picType}>
            <input
              type="file"
              name={picType}
              onChange={handleChange}
              className="mb-4 w-full"
            />
            {errors[picType] && <p className="text-red-500 text-xs mb-2">{errors[picType]}</p>}
          </div>
        ))}

        {/* Service Tags */}
        <div className="mb-4">
          <input
            type="text"
            name="inputTag"
            value={formData.inputTag}
            onChange={(e) => setFormData((prev) => ({ ...prev, inputTag: e.target.value }))}
            onKeyDown={handleTagKeyDown}
            placeholder="Add a service tag and press Enter"
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="flex flex-wrap mt-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full mr-2 mb-2">
                <span>{tag}</span>
                <button type="button" onClick={() => removeTag(index)} className="ml-2">&times;</button>
              </div>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
        </div>

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border rounded-md"
        />
        {errors.location && <p className="text-red-500 text-xs mb-2">{errors.location}</p>}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-4 w-full px-3 py-2 border rounded-md"
        />
        {errors.description && <p className="text-red-500 text-xs mb-2">{errors.description}</p>}

        {/* Price */}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="mb-6 w-full px-3 py-2 border rounded-md"
        />
        {errors.price && <p className="text-red-500 text-xs mb-2">{errors.price}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-md ${loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {loading ? "Submitting..." : "Become Service Provider"}
        </button>
      </form>

      {errors.submit && <p className="text-red-500 text-xs text-center mt-2">{errors.submit}</p>}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 max-w-sm mx-auto text-center">
            <p className="text-gray-800 mb-4">Verification has been sent to the authority.</p>
            <button
              onClick={handleModalOk}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderRegisterForm;