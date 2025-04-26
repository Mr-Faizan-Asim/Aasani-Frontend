import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Droplet, Brush } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import Features from "../Components/Features.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
    
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300">Aasani</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl">
            Hire trusted professionals or offer your skills — all in one platform.
          </p>
          <div className="mt-8">
            <Link
              to="/signin"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Our Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Services</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card */}
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <Wrench size={48} className="mx-auto text-blue-600" />
              <h3 className="mt-6 text-2xl font-semibold text-gray-800">Electrician</h3>
              <p className="mt-4 text-gray-600">Quick fixes to full installations — trust the experts.</p>
            </div>
            {/* Card */}
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <Droplet size={48} className="mx-auto text-blue-600" />
              <h3 className="mt-6 text-2xl font-semibold text-gray-800">Plumber</h3>
              <p className="mt-4 text-gray-600">Reliable plumbing solutions at your doorstep.</p>
            </div>
            {/* Card */}
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <Brush size={48} className="mx-auto text-blue-600" />
              <h3 className="mt-6 text-2xl font-semibold text-gray-800">Cleaning</h3>
              <p className="mt-4 text-gray-600">Top-to-bottom cleaning for a healthier home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Service Providers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Top Service Providers</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Provider Card */}
            <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80"
                alt="John Smith"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">John Smith</h3>
                <div className="text-yellow-500 mt-2">★★★★★ (156 reviews)</div>
                <p className="mt-2 text-gray-600">Electrician</p>
              </div>
            </div>

            {/* Provider Card */}
            <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Sarah Johnson"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <div className="text-yellow-500 mt-2">★★★★☆ (203 reviews)</div>
                <p className="mt-2 text-gray-600">Plumber</p>
              </div>
            </div>

            {/* Provider Card */}
            <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Mike Davis"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">Mike Davis</h3>
                <div className="text-yellow-500 mt-2">★★★★★ (178 reviews)</div>
                <p className="mt-2 text-gray-600">Cleaning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Testimonial Card */}
            <div className="bg-white rounded-xl p-8 shadow hover:shadow-md">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                  alt="Emma Wilson"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Emma Wilson</h4>
                  <p className="text-sm text-gray-500">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Aasani made finding reliable service professionals effortless. Highly recommend!"
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-xl p-8 shadow hover:shadow-md">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="David Chen"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">David Chen</h4>
                  <p className="text-sm text-gray-500">Property Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Our go-to platform for maintenance — easy, quick, and trustworthy every time."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
