import React from "react";
import { Outlet, Link } from "react-router";
import { Heart, Menu } from "lucide-react";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)]">
      <header className="border-b border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[var(--brand-blue)]">
            <Heart className="h-8 w-8 fill-current" />
            <span className="font-bold text-xl tracking-tight text-[var(--text-color)]">Charity AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/" className="text-[var(--text-color)] hover:text-[var(--brand-blue)] transition-colors">Home</Link>
            <Link to="/about" className="text-[var(--text-color)] hover:text-[var(--brand-blue)] transition-colors">About</Link>
            <Link to="/contact" className="text-[var(--text-color)] hover:text-[var(--brand-blue)] transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="btn-secondary py-2 px-6">Log in</Link>
            <Link to="/register" className="btn-primary py-2 px-6">Sign up</Link>
          </div>
          
          <button className="md:hidden p-2 text-[var(--text-color)]">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      <footer className="border-t border-[var(--border-color)] py-12 bg-[var(--card-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-[var(--brand-blue)] fill-current" />
              <span className="font-bold text-lg">Charity AI</span>
            </div>
            <div className="text-sm text-[var(--brand-grey-dark)]">
              &copy; {new Date().getFullYear()} Charity AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
