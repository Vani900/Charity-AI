import React, { useState } from "react";
import { Link } from "react-router";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full">
      <Link to="/login" className="text-sm text-[var(--brand-grey-dark)] hover:text-[var(--text-color)] mb-6 inline-flex items-center gap-2">
        &larr; Back to login
      </Link>
      
      <h2 className="text-3xl font-bold mb-2">Reset password</h2>
      <p className="text-[var(--brand-grey-dark)] mb-8">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {submitted ? (
        <div className="p-6 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-xl text-center">
          <p className="font-medium mb-2">Check your email</p>
          <p className="text-sm">We've sent a password reset link to {email}</p>
        </div>
      ) : (
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
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </form>
      )}
    </div>
  );
}
