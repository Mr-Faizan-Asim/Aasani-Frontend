import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './Page/SignInPage.jsx'; // Adjust the path based on your folder structure
import SignUpPage from './Page/SignUpPage.jsx';
import Home from './Page/Home.jsx';
import ProviderRegisterPage from './Page/ProviderRegisterPage.jsx';
import FindServicePage from './Page/FindServicePage.jsx';
import AdminDashboard from './Page/AdminDashboard.jsx';
import ChatbotPage from './Page/ChatbotPage.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import UserProfile from './Page/UserProfile.jsx'; // Import the UserProfile component
import SingleUser from './Page/SingleUser.jsx';
import Contact from './Page/Contact.jsx';
import GuestRegisterPage from './Page/GuestRegisterPage.jsx'; // Import the GuestRegisterPage component
import UserDashboard from './Page/UserDashboard.jsx';
import GuestsDashboard from './Page/GuestsDashboard.jsx';
import FindService from './Page/FindService.jsx';
import SocietyOwnerDashboard from './Page/SocietyOwnerDashboard.jsx';
import AddBlog from './Components/AddBlog.jsx';
import BlogList from './Components/BlogList.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="font-GoogleSans">
        <Navbar/>
        <Routes>
          {/* Set the sign in page as the default/homepage  */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />
          
          <Route path="/services" element={<FindService />} />
          <Route path="/provider-register" element={<ProviderRegisterPage />} />
          <Route path="/find-service" element={<FindServicePage />} />
         <Route path="/admin" element={<AdminDashboard/>} /> 
         <Route path="/user-dashboard" element={<UserDashboard/>} /> {/* Add this line for the user profile page /user-dashboard/userdetails*/}
         <Route path="/user-dashboard/userdetails" element={<UserProfile/>} /> {/* Add this line for the user profile page */}
         <Route path="/user/:userId" element={<SingleUser/>} />
         <Route path="/contact" element={<Contact/>} /> {/* Add this line for the contact page */}
         <Route path="/about" element={<ChatbotPage />}/> {/* Add this line for the chat page */}
         <Route path="/addguest" element={<GuestRegisterPage/>}/> {/* Add this line for the chat page */}
         <Route path="/user-dashboard/become-service-provider" element={<ProviderRegisterPage/>}/>
         <Route path="/GuardDashboard" element={<GuestsDashboard/>}/> {/* Add this line for the chat page */}
         
         <Route path="/SocietyOwnerDashboard" element={<SocietyOwnerDashboard/>}/> {/* Add this line for the chat page */}
         <Route path="/AdminDashboard" element={<AdminDashboard/>}/> {/* Add this line for the chat pag /SocietyOwnerDashboard */}

         <Route path='/addblog' element={<AddBlog/>}/> 
         <Route path='/blog' element={<BlogList/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
