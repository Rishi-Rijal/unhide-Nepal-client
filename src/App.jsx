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
import ChangePassword from './pages/ChangePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout/Layout.jsx';
import RequireAuth from './Components/RequireAuth.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser, clearUser } from './utils/authSlice.js';
import { getUserProfile } from './api/user.api.js'
import { refreshAccessToken } from './api/user.api.js'
import AuthSuccess from './pages/AuthSuccess.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import AdminRoute from './Components/Admin/AdminRoute.jsx'

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

useEffect(() => {
  const fetchUserProfile = async (options = { retry: true }) => {
    try {
      const userProfile = await getUserProfile();
      dispatch(setUser(userProfile.data.user));
      return userProfile;
    } catch (err) {
      const status = err?.response?.status;
      const isAuthFailure = status === 401;

      if (isAuthFailure && options.retry) {
        try {
          await refreshAccessToken(); 
          const retried = await getUserProfile();
          dispatch(setUser(retried.data.user));
          return retried;
        } catch (refreshErr) {
          dispatch(clearUser());
          throw refreshErr;
        }
      }

      dispatch(clearUser());
      throw err;
    }
  };

  if (user === undefined) {
    fetchUserProfile();
  }
}, [dispatch, user]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route with Outlet */}
        <Route path="/" element={<Layout />}>
          {/* Child routes */}
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<ExplorePlaces />} />
          <Route path="/listing/new" element={<RequireAuth><NewListing /></RequireAuth>} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/admin" element={<RequireAuth><AdminRoute><AdminDashboard /></AdminRoute></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

