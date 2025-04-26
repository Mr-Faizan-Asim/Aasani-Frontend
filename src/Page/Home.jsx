import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Hero from "../Components/Hero.jsx";
import Features from "../Components/Features.jsx";
import Footer from "../Components/Footer.jsx";
import { Wrench, Droplet, Brush } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section: You can either use your existing Hero component or the section below */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold text-white">Welcome to Shaulat Kar</h1>
            <p className="mt-4 text-xl text-white">
              Your trusted platform to register as a service provider or hire top talent for daily life tasks.
            </p>
            <div className="mt-8">
              <Link
                to="/signin"
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100 transition duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Additional Services Section */}
        <section id="services" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Wrench size={48} className="mx-auto text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Electrician</h3>
                <p className="mt-2 text-gray-600">Professional electrical repairs and installations</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Droplet size={48} className="mx-auto text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Plumber</h3>
                <p className="mt-2 text-gray-600">Expert plumbing services for your home</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Brush size={48} className="mx-auto text-blue-600" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Cleaning</h3>
                <p className="mt-2 text-gray-600">Complete home cleaning solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Service Providers Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Top Service Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80"
                  alt="John Smith"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">John Smith</h3>
                  <div className="text-yellow-500 mt-1">★★★★★ (156 reviews)</div>
                  <p className="mt-2 text-gray-600">Electrician</p>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                  alt="Sarah Johnson"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <div className="text-yellow-500 mt-1">★★★★☆ (203 reviews)</div>
                  <p className="mt-2 text-gray-600">Plumber</p>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                  alt="Mike Davis"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Mike Davis</h3>
                  <div className="text-yellow-500 mt-1">★★★★★ (178 reviews)</div>
                  <p className="mt-2 text-gray-600">Cleaning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="Emma Wilson"
                    className="w-12 h-12 rounded-full"
                  />
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">Emma Wilson</h3>
                </div>
                <p className="text-gray-600">
                  "SahulatKar made finding a reliable electrician so easy. The service was prompt and professional!"
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                    alt="David Chen"
                    className="w-12 h-12 rounded-full"
                  />
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">David Chen</h3>
                </div>
                <p className="text-gray-600">
                  "As a property manager, I rely on SahulatKar for all our maintenance needs. They never disappoint!"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
}

export default Home;
