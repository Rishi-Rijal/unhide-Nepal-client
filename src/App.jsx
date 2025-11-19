import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import Contact from './pages/Contact.jsx'
import ExplorePlaces from './pages/Explore.jsx'
import NotFound from './pages/NotFound.jsx'
import NewListing from './pages/AddListing.jsx'
import Listing from './pages/Listing.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import Wishlist from './pages/Wishlist.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout/Layout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route with Outlet */}
        <Route path="/" element={<Layout />}>
          {/* Child routes */}
          <Route index element={<Home />} />   
          <Route path="/About" element={<About />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Explore" element={<ExplorePlaces />} />
          <Route path="/Listing/New" element={<NewListing />} />
          <Route path="/Listing/:id" element={<Listing />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

