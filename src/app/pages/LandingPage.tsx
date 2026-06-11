import React from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Heart, Shield, Zap, CheckCircle2, Globe, Users, TrendingUp } from "lucide-react";
import { PageLayout } from "../components/ui/PageLayout";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageLayout fullWidth className="bg-white dark:bg-[#0A0A0A]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 rounded-none px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-brand-dark dark:text-white">CharityChain AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#features" className="hover:text-brand-blue transition-colors">Features</a>
          <a href="#impact" className="hover:text-brand-blue transition-colors">Impact</a>
          <a href="#testimonials" className="hover:text-brand-blue transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-sm font-semibold text-brand-dark dark:text-white hover:text-brand-blue transition-colors">
            Log in
          </button>
          <button onClick={() => navigate("/register")} className="btn-primary py-2 px-4 text-sm rounded-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue-tint dark:bg-brand-blue opacity-20 dark:opacity-10 blur-[100px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-tint dark:bg-gray-800 text-brand-blue dark:text-brand-blue-light text-sm font-semibold mb-8">
          <Zap size={16} /> Introducing Smart Matching AI
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark dark:text-white tracking-tight max-w-4xl mb-6">
          The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Transparent</span> Giving
        </h1>
        
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
          CharityChain AI connects donors directly to verifiable NGOs, tracking every contribution on the blockchain to ensure 100% of your impact reaches those in need.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button onClick={() => navigate("/register")} className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
            Start Donating <ArrowRight size={20} />
          </button>
          <button onClick={() => navigate("/ngo/register")} className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A]">
            Register as NGO
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="impact" className="py-20 px-6 bg-gray-50 dark:bg-black border-y border-gray-200 dark:border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl lg:text-5xl font-bold text-brand-blue mb-2">₹12.4M</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Transparently Donated</div>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-bold text-brand-blue mb-2">450+</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Verified NGOs</div>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-bold text-brand-blue mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Blockchain Verified</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-4">Enterprise-grade infrastructure for modern giving</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">We've rebuilt the donation pipeline from the ground up.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield />}
            title="Blockchain Tracking"
            desc="Every donation is minted on a public ledger. Track exactly where your funds or physical items end up."
          />
          <FeatureCard 
            icon={<Zap />}
            title="AI Smart Matching"
            desc="Our AI instantly matches your physical donations (clothes, food) with the nearest NGOs that urgently need them."
          />
          <FeatureCard 
            icon={<Globe />}
            title="Global Map Integration"
            desc="Explore verified NGOs near you in real-time, view their active campaigns, and organize direct drops."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brand-blue rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[80px] rounded-full" />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 relative z-10">Ready to make a real impact?</h2>
          <p className="text-blue-100 text-lg lg:text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of donors and NGOs building the most transparent charity network in the world.
          </p>
          <button onClick={() => navigate("/register")} className="bg-white text-brand-blue font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform relative z-10">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-[#1A1A1A] bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-brand-blue" />
            <span className="font-bold text-xl text-brand-dark dark:text-white">CharityChain AI</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 CharityChain AI. All rights reserved.
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="card-surface p-8 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl dark:bg-[#111]">
      <div className="w-12 h-12 bg-brand-blue-tint dark:bg-[#1A1A1A] text-brand-blue dark:text-brand-blue-light rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
