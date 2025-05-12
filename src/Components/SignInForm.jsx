import React, { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import slide1 from '../assets/signinpageside.png';
import slide2 from '../assets/signinpageside.png';
import slide3 from '../assets/signinpageside.png';

export default function SignInForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent(prev => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  const goPrev = () =>
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent(prev => (prev + 1) % slides.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded yet');
      return;
    }

    try {
      const token = await executeRecaptcha('signin');
      if (!token) throw new Error('reCAPTCHA validation failed');

      const res = await fetch('https://backend-gdg.vercel.app/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
          recaptchaToken: token,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sign in failed');
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/user-dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 relative p-4 md:p-8">
        {/* Slider */}
        <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 md:h-full">
          <img
            src={slides[current]}
            alt={`slide-${current}`}
            className="object-cover w-full h-full"
          />
          <button onClick={goPrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75">
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </button>
          <button onClick={goNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75">
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </button>
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`${idx === current ? 'w-6' : 'w-3'} h-1 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-600'} transition-all duration-300`}
              />
            ))}
          </div>
          <div className="absolute bottom-8 left-4 space-y-1">
            <h2 className="text-2xl md:text-3xl font-semibold">Welcome Back</h2>
            <h2 className="text-2xl md:text-3xl font-semibold">Sign in to continue</h2>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Sign In</h1>
        <p className="mb-6 text-gray-300 text-sm md:text-base">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-400 hover:underline">Create one</a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPwd ? 'text' : 'password'}
              value={formState.password}
              onChange={handleChange}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPwd ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
);
}
