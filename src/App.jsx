import { useState } from 'react'
import './App.css'
import Home from './Home.jsx'
import ExplorePlaces from './Explore.jsx'
import NewListing from './AddListing.jsx'
import Listing from './Listing.jsx'
import LoginPage from './Login.jsx'
import RegisterPage from './Register.jsx'
import Wishlist from './Wishlist.jsx'
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
          <Route path="/Explore" element={<ExplorePlaces />} />
          <Route path="/Listing/New" element={<NewListing />} />
          <Route path="/Listing/:id" element={<Listing />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

