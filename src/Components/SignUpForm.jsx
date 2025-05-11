import React, { useState, useEffect } from 'react';
import { send } from '@emailjs/browser';
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';


import slide1 from '../assets/signinpageside.png';
import slide2 from '../assets/signinpageside.png';
import slide3 from '../assets/signinpageside.png';

const SERVICE_ID = 'service_kolc749';
const TEMPLATE_ID = 'template_jvhk2ux';
const PUBLIC_KEY = 'GVy2LyEq-i4fIpV3A';
const OTP_VALIDITY = 300; // 5 minutes in seconds

export default function SignUpForm() {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  
  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(OTP_VALIDITY);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    password: '',
    avatarUrl: '',
    role: 'User',
    institution: '',
    enrollmentDate: '',
    gender: '',
    agree: false,
  });

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

    const goPrev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const goNext = () =>
    setCurrent((c) => (c + 1) % slides.length);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  // OTP Timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0 && !otpVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer, otpVerified]);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    if (!formState.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setOtpError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setOtpError('');
    
    try {
      const otp = generateOtp();
      await send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: formState.email,
          otp_code: otp,
          sent_time: new Date().toLocaleString()
        },
        PUBLIC_KEY
      );
      
      setGeneratedOtp(otp);
      setOtpSent(true);
      setTimer(OTP_VALIDITY);
      setUserOtp('');
      setOtpVerified(false);
    } catch (error) {
      console.error('OTP Send Error:', error);
      setOtpError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (timer <= 0) {
      setOtpError('OTP has expired. Please request a new one.');
      return;
    }

    if (userOtp === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP entered. Please check and try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpVerified) {
      setOtpError('Email verification required');
      return;
    }

    if (!formState.agree) {
      setOtpError('You must agree to the terms & conditions');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('https://backend-gdg.vercel.app/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
          avatarUrl: formState.avatarUrl,
          role: formState.role,
          institution: formState.institution,
          gender: formState.gender,
          enrollmentDate: formState.enrollmentDate || undefined,
        }),
      });
      
      if (!res.ok) throw new Error('Registration failed');
      window.location.href = '/signin';
    } catch (err) {
      console.error(err);
      setOtpError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Left Slider */}
      {/* LEFT: Slider */}
      <div className="w-full md:w-1/2 p-4 md:p-8 relative">
        <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 md:h-full">
          <img
            src={slides[current]}
            alt={`slide-${current}`}
            className="object-cover w-full h-full"
          />
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-1.5 rounded-full hover:bg-opacity-75"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-white' : 'w-3 bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create an account</h1>
        <p className="mb-6 text-gray-300 text-sm md:text-base">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-400 hover:underline">Log in</a>
        </p>

        {/* OTP Verification Section */}
        {!otpVerified ? (
          <div className="space-y-4">
            <div className="relative">
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={(e) => {
                  setFormState(prev => ({...prev, email: e.target.value}));
                  setOtpError('');
                }}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none pr-32"
                placeholder="Email"
                disabled={otpSent}
                required
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 px-4 py-1.5 rounded text-sm disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              )}
            </div>

            {otpSent && (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={userOtp}
                    onChange={(e) => {
                      setUserOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setOtpError('');
                    }}
                    className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none pr-32"
                    placeholder="Enter 6-digit OTP"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                    {formatTime(timer)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={userOtp.length !== 6 || isLoading}
                    className="flex-1 bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={timer > 0 || isLoading}
                    className="px-4 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-600 transition disabled:opacity-50"
                  >
                    ↻
                  </button>
                </div>
              </div>
            )}

            {otpError && <p className="text-red-400 text-sm">{otpError}</p>}
          </div>
        ) : (
          <div className="mb-4 p-3 bg-green-900/20 rounded-lg">
            <p className="text-green-400">✓ Email verified ({formState.email})</p>
          </div>
        )}

        {/* Registration Form */}
        {otpVerified && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              placeholder="Full Name"
              required
            />

            {/* Password */}
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

            {/* Gender & Role */}
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-y-4">
              <select
                name="gender"
                value={formState.gender}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              >
                <option value="User">User</option>
                <option value="Service-Provider">Service Provider</option>
                <option value="Guard">Guard</option>
                <option value="SocietyAdmin">Society Admin</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Institution & Date */}
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-y-4">
              <input
                name="institution"
                value={formState.institution}
                onChange={handleChange}
                placeholder="Institution (optional)"
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              />
              <input
                type="date"
                name="enrollmentDate"
                value={formState.enrollmentDate}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            {/* Avatar URL */}
            <input
              type="url"
              name="avatarUrl"
              value={formState.avatarUrl}
              onChange={handleChange}
              placeholder="Avatar URL (optional)"
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
            />

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                name="agree"
                checked={formState.agree}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-400 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">
                I agree to the{' '}
                <a href="/terms" className="text-indigo-400 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formState.agree || isLoading}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Social Login */}
        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-2 text-gray-400 text-sm">Or register with</span>
          <hr className="flex-1 border-gray-700" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Social buttons... */}
        </div>
      </div>
    </div>
  );
} 