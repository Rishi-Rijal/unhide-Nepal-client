import { useState } from "react";
import { requestPasswordReset } from '../services/user.api.js';
import { useToast } from '../components/common/Toast.jsx';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { addToast } = useToast();

    const validate = () => {
        if (!email) {
            setMessage("Please enter your email");
            addToast("Please enter your email", "error");
            return false;
        }
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setMessage("Please enter a valid email");
            addToast("Please enter a valid email", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await requestPasswordReset(email);
            setMessage("If that email is registered you will receive reset instructions.");
            addToast("If that email is registered you will receive reset instructions.", "info");
        } catch (err) {
            setMessage(err?.response?.data?.message || "Failed to request password reset");
            const msg = err?.response?.data?.message || "Failed to request password reset";
            addToast(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-start justify-center py-25 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-semibold text-slate-800 mb-1">Forgot Password</h1>
                    <p className="text-sm text-slate-500 mb-6">Enter your account email and we'll send instructions to reset your password.</p> 
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                            <div className="relative mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                            >
                                {loading ? "Sending..." : "Send reset link"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
