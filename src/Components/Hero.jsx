// src/components/Hero.js
import React from "react";


const Hero = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to Our Clinic
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We provide quality healthcare services for you and your family.
        </p>
        <div className="mt-8">
          <a
            href="/services"
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
