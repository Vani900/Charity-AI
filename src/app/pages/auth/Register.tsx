import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../../api/auth";
import { useAuth } from "../../context/AuthContext";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"donor" | "ngo">("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await registerUser({ name, email, password, role });
      if (response.data.success) {
        // Auto-login and Redirect to dashboard after successful registration
        login({
          id: "new_mock_id",
          name: response.data.user.name,
          email,
          role: response.data.user.role as any,
          token: response.data.token
        });
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-2">Create an account</h2>
      <p className="text-[var(--brand-grey-dark)] mb-8">Join Charity AI today.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4 p-1 bg-[var(--brand-grey-bg)] dark:bg-[#111] rounded-xl mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'donor' ? 'bg-white dark:bg-[#222] shadow text-[var(--brand-blue)]' : 'text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]'}`}
            onClick={() => setRole("donor")}
          >
            I want to Donate
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'ngo' ? 'bg-white dark:bg-[#222] shadow text-[var(--brand-blue)]' : 'text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]'}`}
            onClick={() => setRole("ngo")}
          >
            I am an NGO
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text"
            required
            className="input-field" 
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
        
        <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-[var(--brand-grey-dark)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[var(--brand-blue)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
