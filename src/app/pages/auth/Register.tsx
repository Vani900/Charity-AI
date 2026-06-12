import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { AlertCircle, Loader2, User, Mail, Lock, Phone, MapPin } from "lucide-react";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
      const response = await registerUser({ name, email, password, phone, address, role });
      const payload = response.data.data || response.data;
      const { token, user } = payload;
      login({
        id: user.id || user._id,
        name: user.name || name,
        email: user.email || email,
        role: user.role as any,
        token,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-2">Create an account</h2>
      <p className="text-[var(--brand-grey-dark)] mb-6">Join Charity AI today.</p>

      {error && (
        <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Role Toggle */}
      <div className="flex gap-4 p-1 bg-[var(--brand-grey-bg)] dark:bg-[#111] rounded-xl mb-6">
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            role === "donor"
              ? "bg-white dark:bg-[#222] shadow text-[var(--brand-blue)]"
              : "text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]"
          }`}
          onClick={() => setRole("donor")}
        >
          I want to Donate
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            role === "ngo"
              ? "bg-white dark:bg-[#222] shadow text-[var(--brand-blue)]"
              : "text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]"
          }`}
          onClick={() => setRole("ngo")}
        >
          I am an NGO
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
            <input
              type="text"
              required
              className="input-field pl-10"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Gmail ID</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
            <input
              type="email"
              required
              className="input-field pl-10"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
            <input
              type="tel"
              required
              className="input-field pl-10"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address / City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
            <input
              type="text"
              required
              className="input-field pl-10"
              placeholder="Chennai, Tamil Nadu"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
            <input
              type="password"
              required
              minLength={6}
              className="input-field pl-10"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Creating account…
            </>
          ) : (
            `Sign up as ${role === "ngo" ? "NGO" : "Donor"}`
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--brand-grey-dark)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[var(--brand-blue)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
