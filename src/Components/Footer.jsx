import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-white text-center text-sm">
          &copy; {new Date().getFullYear()} Shaulat Kar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
