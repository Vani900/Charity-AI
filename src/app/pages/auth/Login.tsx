import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { loginUser, sendOtp, verifyOtp } from "../../../api/auth";
import { AlertCircle, Loader2 } from "lucide-react";

export function Login() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  
  // Email States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Phone OTP States
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data.data || response.data;
      login({
        id: user.id || user._id,
        name: user.name,
        email: user.email || email,
        role: user.role,
        token,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await sendOtp({ phone });
      setOtpSent(true);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await verifyOtp({ phone, otp });
      if (response.data?.data?.token) {
        const { token, user } = response.data.data;
        login({
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        });
        navigate("/dashboard");
      } else {
        setError("Phone verified, but no account exists. Please register first.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
      <p className="text-[var(--brand-grey-dark)] mb-8">Please enter your details to sign in.</p>

      {/* Login Method Tabs */}
      <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            loginMethod === "email"
              ? "bg-white dark:bg-gray-700 shadow text-[var(--brand-blue)]"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => { setLoginMethod("email"); setError(null); }}
        >
          Gmail ID
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            loginMethod === "phone"
              ? "bg-white dark:bg-gray-700 shadow text-[var(--brand-blue)]"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => { setLoginMethod("phone"); setError(null); }}
        >
          Mobile OTP
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {loginMethod === "email" ? (
        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Gmail ID</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]"
              />
              <span className="text-[var(--text-color)]">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[var(--brand-blue)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Signing in…</>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              disabled={otpSent}
              className="input-field"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {otpSent ? (
            <div>
              <label className="block text-sm font-medium mb-1">6-Digit OTP</label>
              <input
                type="text"
                required
                className="input-field tracking-[0.5em] font-mono text-center"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Verifying…</>
                ) : (
                  "Verify & Sign in"
                )}
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full mt-4 text-sm text-gray-500 hover:text-[var(--brand-blue)]"
              >
                Use a different number
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : (
                "Send OTP"
              )}
            </button>
          )}
        </form>
      )}

      <p className="mt-8 text-center text-sm text-[var(--brand-grey-dark)]">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-[var(--brand-blue)] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
