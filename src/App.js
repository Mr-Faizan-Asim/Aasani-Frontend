import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './Page/SignInPage.jsx';
import SignUpPage from './Page/SignUpPage.jsx';
import Home from './Page/Home.jsx';
import ProviderRegisterPage from './Page/ProviderRegisterPage.jsx';
import FindServicePage from './Page/FindServicePage.jsx';
import AdminDashboard from './Page/AdminDashboard.jsx';
import ChatbotPage from './Page/ChatbotPage.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import UserProfile from './Page/UserProfile.jsx';
import SingleUser from './Page/SingleUser.jsx';
import Contact from './Page/Contact.jsx';
import GuestRegisterPage from './Page/GuestRegisterPage.jsx';
import UserDashboard from './Page/UserDashboard.jsx';
import GuestsDashboard from './Page/GuestsDashboard.jsx';
import FindService from './Page/FindService.jsx';
import SocietyOwnerDashboard from './Page/SocietyOwnerDashboard.jsx';
import AddBlog from './Components/AddBlog.jsx';
import BlogList from './Components/BlogList.jsx';
import ChatPage from './Page/ChatPage.jsx';
import ChatBox from './Page/ChatBox.jsx';
import AnalysisAdminDashboard from './Page/AnalysisAdminDashboard.jsx';
import AdminDetails from './Components/AdminDetails.jsx';
import RideTracker from './Page/RideTracker.jsx';

// Function to get current user from localStorage
const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return user;
  } catch {
    return null;
  }
};

// PrivateRoute wrapper for admin-only routes
const AdminRoute = ({ element }) => {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    console.log(user);
    return <Navigate to="/signin" replace />;
  }
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <div className="font-GoogleSans">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<FindService />} />
          <Route path="/provider-register" element={<ProviderRegisterPage />} />
          <Route path="/find-service" element={<FindServicePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Shaulat" element={<ChatbotPage />} />
          <Route path="/addguest" element={<GuestRegisterPage />} />
          <Route path="/user/:userId" element={<SingleUser />} />

          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard/userdetails" element={<UserProfile />} />
          <Route path="/user-dashboard/become-service-provider" element={<ProviderRegisterPage />} />
          <Route path="/user-dashboard/chats" element={<ChatPage />} />

          <Route path="/GuardDashboard" element={<GuestsDashboard />} />
          <Route path="/SocietyOwnerDashboard" element={<SocietyOwnerDashboard />} />

          {/* Admin Protected Routes */}
          <Route path="/AdminDashboard" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/AdminDashboard/analysis" element={<AdminRoute element={<AnalysisAdminDashboard />} />} />
          <Route path="/AdminDashboard/details" element={<AdminRoute element={<AdminDetails />} />} />

          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/chatting" element={<ChatBox />} />
          <Route path="/tracker" element={<RideTracker />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
