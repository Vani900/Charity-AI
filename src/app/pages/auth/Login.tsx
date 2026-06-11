import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../../api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { AlertCircle } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await loginUser({ email, password });
      if (response.data.success) {
        login({
          id: "mock_id",
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role as any,
          token: response.data.token
        });
        
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    setLoading(true);
    // In a real app, you would send this token to your backend to exchange it for a session.
    // For now, we mock the successful response:
    login({
      id: "google_mock_id",
      name: "Google User",
      email: "google.user@example.com",
      role: "donor",
      token: tokenResponse.access_token
    });
    navigate("/dashboard");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => setError("Google Authentication failed. Please try again or use email login."),
  });

  const handleGoogleLogin = () => {
    if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      googleLogin();
    } else {
      setError("Google Login is currently disabled. Please use email and password to log in.");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
      <p className="text-[var(--brand-grey-dark)] mb-8">Please enter your details to sign in.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
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
            <input type="checkbox" className="rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
            <span className="text-[var(--text-color)]">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-[var(--brand-blue)] hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-color)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--bg-color)] text-[var(--brand-grey-dark)]">Or continue with</span>
          </div>
        </div>
        
        <button onClick={handleGoogleLogin} className="btn-secondary w-full mt-6 flex items-center justify-center gap-3 bg-white dark:bg-black border border-[var(--border-color)]">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-[var(--brand-grey-dark)]">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-[var(--brand-blue)] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
