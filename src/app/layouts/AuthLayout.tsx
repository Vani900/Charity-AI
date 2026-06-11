import React from "react";
import { Outlet, Link } from "react-router";
import { Heart } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-color)]">
      {/* Left side - Branding & Image (hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 bg-[var(--brand-blue-tint)] flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 text-[var(--brand-blue)] mb-12">
            <Heart className="h-8 w-8 fill-current" />
            <span className="font-bold text-2xl tracking-tight">Charity AI</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] leading-tight mb-6">
            Make an impact <br />
            with intelligent giving.
          </h1>
          <p className="text-lg text-[var(--brand-grey-dark)] max-w-md">
            Join thousands of donors and NGOs making a real difference using blockchain transparency and AI-driven recommendations.
          </p>
        </div>
        
        {/* Abstract shapes for decoration */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--brand-blue)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-32 -right-32 w-80 h-80 bg-purple-400 opacity-10 rounded-full blur-3xl" />
      </div>
      
      {/* Right side - Form area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          {/* Mobile header (hidden on desktop) */}
          <div className="md:hidden flex items-center justify-center gap-2 text-[var(--brand-blue)] mb-12">
            <Heart className="h-8 w-8 fill-current" />
            <span className="font-bold text-2xl tracking-tight text-[var(--text-color)]">Charity AI</span>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
}
