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

const SERVICE_ID   = 'service_kolc749';
const TEMPLATE_ID  = 'template_c04eenr';
const PUBLIC_KEY   = 'GVy2LyEq-i4fIpV3A';

export default function SignUpForm() {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);
  const [showPwd, setShowPwd] = useState(false);

  // OTP-related state
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

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

  // Slide auto-rotate
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(iv);
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

  // 2. Send OTP
  const handleSendOtp = async () => {
    if (!formState.email) return alert('Enter an email first');
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    try {
      await send(
        SERVICE_ID,
        TEMPLATE_ID,
        { to_email: formState.email, otp_code: code },
        PUBLIC_KEY
      );
      setOtpSent(true);
      setOtpError('');
      alert('OTP sent to ' + formState.email);
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('Failed to send OTP. Try again.');
    }
  };

  // 3. Verify OTP
  const handleVerifyOtp = () => {
    if (userOtp === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Incorrect code. Please try again.');
    }
  };

  // 4. Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      return alert('Please verify your email first.');
    }
    const payload = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      avatarUrl: formState.avatarUrl,
      role: formState.role,
      institution: formState.institution,
      gender: formState.gender,
      enrollmentDate: formState.enrollmentDate || undefined,
    };

    try {
      const res = await fetch(
        'https://backend-gdg.vercel.app/api/users/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error('Registration failed');
      window.location.href = '/signin';
    } catch (err) {
      console.error(err);
      alert('Signup failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
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

      {/* RIGHT: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Create an account
        </h1>
        <p className="mb-6 text-gray-300 text-sm md:text-base">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-400 hover:underline">
            Log in
          </a>
        </p>

        {/* --- EMAIL + OTP STEPS --- */}
        {!otpSent ? (
          <div className="space-y-4">
            <input
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              placeholder="Email"
              required
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
            >
              Send OTP
            </button>
          </div>
        ) : !otpVerified ? (
          <div className="space-y-2">
            <input
              type="text"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              placeholder="Enter OTP"
            />
            {otpError && (
              <p className="text-red-400 text-sm">{otpError}</p>
            )}
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <p className="text-green-400 mb-4">
            Email verified ✅ You can now complete the form.
          </p>
        )}

        {/* --- REMAINING FORM --- */}
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

            {/* Password with toggle */}
            <div className="relative">
              <input
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter your password"
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
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <select
                name="gender"
                value={formState.gender}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
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

            {/* Institution & Enrollment Date */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                name="institution"
                placeholder="Institution (optional)"
                value={formState.institution}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              />
              <input
                name="enrollmentDate"
                type="date"
                value={formState.enrollmentDate}
                onChange={handleChange}
                className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            {/* Avatar URL */}
            <input
              name="avatarUrl"
              type="url"
              value={formState.avatarUrl}
              onChange={handleChange}
              className="w-full bg-gray-800 px-4 py-3 rounded-lg focus:outline-none"
              placeholder="Avatar URL (optional)"
            />

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                name="agree"
                type="checkbox"
                checked={formState.agree}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-400 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">
                I agree to the{' '}
                <a
                  href="/terms"
                  className="text-indigo-400 hover:underline"
                >
                  Terms &amp; Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formState.agree}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
            >
              Create account
            </button>
          </form>
        )}

        {/* Social login divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-2 text-gray-400 text-xs md:text-sm">
            Or register with
          </span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button className="w-full flex items-center justify-center border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition">
            <img
              src="https://www.svgrepo.com/show/303128/apple-logo.svg"
              alt="Apple"
              className="h-5 w-5 mr-2"
            />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}
