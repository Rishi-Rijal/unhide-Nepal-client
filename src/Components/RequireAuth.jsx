
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // If no user, redirect to Login and preserve the intended location
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
