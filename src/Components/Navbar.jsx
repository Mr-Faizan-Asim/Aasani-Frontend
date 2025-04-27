import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user info from localStorage
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.email) setUserEmail(data.email);
      } catch (err) {
        console.error("Failed to parse userInfo:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove user info from localStorage
    localStorage.removeItem("userInfo");
    setUserEmail(null);
    navigate("/signin");
  };

  return (
    <>
      {/* Fixed floating navbar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 shadow-lg w-full max-w-7xl rounded-md md:rounded-full">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Brand + desktop links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white text-lg font-bold hover:text-indigo-400 transition">
              Aasani
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Home
              </Link>
              <Link to="/Shaulat" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Shaulat
              </Link>
              
              <Link to="/services" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Services
              </Link>
              <Link to="/find-service" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Find Near Service
              </Link>
              <Link to="/contact" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Contact
              </Link>
              <Link to="/provider-register" className="text-white text-sm font-medium hover:text-indigo-400 transition">
                Register as Service Provider
              </Link>
            </div>
          </div>

          {/* Desktop Profile/Dashboard/Logout */}
          <div className="hidden md:flex items-center space-x-2">
            {userEmail ? (
              <>
                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="px-4 py-2 rounded-md bg-green-600 text-white font-medium text-sm hover:bg-green-500 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-medium text-sm hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 px-4 py-4 rounded-b-md space-y-2">
            <Link to="/" className="block text-white text-base font-medium hover:text-indigo-400 transition">
              Home
            </Link>
            <Link to="/Shaulat" className="block text-white text-base font-medium hover:text-indigo-400 transition">
               Shaulat
            </Link>
            
            <Link to="/services" className="block text-white text-base font-medium hover:text-indigo-400 transition">
              Services
            </Link>
            <Link to="/find-service" className="block text-white text-base font-medium hover:text-indigo-400 transition">
              Find Near Service
            </Link>
            <Link to="/contact" className="block text-white text-base font-medium hover:text-indigo-400 transition">
              Contact
            </Link>
            <Link to="/provider-register" className="block text-white text-base font-medium hover:text-indigo-400 transition">
              Register as Service Provider
            </Link>
            {userEmail ? (
              <>
                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="block w-full text-center px-4 py-2 bg-green-600 text-white font-medium text-base hover:bg-green-500 transition rounded-md"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 bg-red-600 text-white font-medium text-base hover:bg-red-500 transition rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white font-medium text-base hover:bg-indigo-500 transition rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to push page content below fixed navbar */}
      <div className="h-24 md:h-20"></div>
    </>
  );
};

export default Navbar;