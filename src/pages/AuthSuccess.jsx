import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/authSlice.js";
import { getUserProfile, refreshAccessToken } from '../services'

export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // getUserProfile returns response.data where user is at data.user
        const profile = await getUserProfile();
        dispatch(setUser(profile.data.user));
        navigate("/");
        return;
      } catch {
        // try to refresh token once and retry
      }
      try {
        await refreshAccessToken();
        const profile = await getUserProfile();
        dispatch(setUser(profile.data.user));
        navigate("/");
      } catch {
        navigate("/login");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">Signing you in…</div>
        <div className="animate-pulse text-sm text-slate-500">Redirecting to the app</div>
      </div>
    </div>
  );
}
