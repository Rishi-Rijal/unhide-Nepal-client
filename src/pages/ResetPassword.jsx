import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyPasswordResetToken, resetPassword } from '../services';
import { useToast } from '../components/common';
const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const toast = useToast();
  const navigate = useNavigate();
  const showToastRef = useRef(null);

  // Keep a stable reference to the toast function so we don't need to add the
  // toast object to effect dependency arrays (which can change identity on each render).
  useEffect(() => {
    showToastRef.current = toast?.showToast;
  }, [toast]);

  // Verify token when params change. We avoid calling toast directly here to
  // prevent effect loops if the toast hook returns a new object identity.
  useEffect(() => {
    const verify = async () => {
      if (!id || !token) {
        setErrorMessage("Invalid reset link");
        setValid(false);
        return;
      }
      try {
        await verifyPasswordResetToken(id, token);
        setValid(true);
      } catch (err) {
        const msg = err?.response?.data?.message || "Invalid or expired reset link";
        setErrorMessage(msg);
        setValid(false);
      }
    };
    verify();
  }, [id, token]);

  useEffect(() => {
    if (errorMessage && showToastRef.current) {
      // call stable ref to avoid re-running when toast identity changes
      showToastRef.current(errorMessage, "error");
    }
  }, [errorMessage]);

  const validate = () => {
    if (!password || !confirmPassword) {
      toast.showToast("Please fill both password fields", "error");
      return false;
    }
    if (password.length < 8) {
      toast.showToast("Password must be at least 8 characters", "error");
      return false;
    }
    if (password !== confirmPassword) {
      toast.showToast("Passwords do not match", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await resetPassword({ id, token, password, confirmPassword });
      toast.showToast("Password reset successful. You can now log in.", "info");
      navigate("/Login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to reset password";
      toast.showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-start justify-center py-25 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">Reset Password</h1>
          <p className="text-sm text-slate-500 mb-6">Set a new password for your account.</p>

          {valid === false && (
            <div className="text-sm text-red-600 mb-4">This reset link is invalid or expired.</div>
          )}

          {valid === true && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">New password</label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 pr-10 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center p-1 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters.</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm new password</label>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 pr-10 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center p-1 text-slate-500 hover:text-slate-700"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Reset password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
