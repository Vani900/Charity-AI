import React from "react";
import { Link } from "react-router";
import { Heart, Activity, Globe, Shield, ArrowRight, BrainCircuit, Link as LinkIcon, Users, CheckCircle2, Package, Shirt, Pill, BookOpen, Quote } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--brand-blue)] opacity-[0.15] dark:opacity-10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-blue-tint)] dark:bg-blue-500/10 text-[var(--brand-blue)] text-sm font-semibold mb-8 border border-[var(--brand-blue-light)]/30 dark:border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-blue)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-blue)]"></span>
            </span>
            Donate Funds, Food, Clothes & More
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-[var(--text-color)]">
            A smarter way to give, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-blue)] to-purple-600">
              powered by AI & Blockchain.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--brand-grey-dark)] max-w-3xl mx-auto mb-10 leading-relaxed">
            Don't just give money. Donate food, clothes, books, and medical supplies. Let our AI match your resources with the world's most urgent needs, tracked transparently on the blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard/donate-money" className="btn-primary w-full sm:w-auto flex justify-center text-lg py-3 px-8 shadow-xl shadow-[var(--brand-blue)]/20">
              Start Donating Now
            </Link>
            <Link to="/about" className="btn-secondary w-full sm:w-auto flex justify-center text-lg py-3 px-8 border border-[var(--border-color)]">
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECT OVERVIEW: DONATION CATEGORIES */}
      <section className="py-24 bg-[var(--brand-grey-bg)] dark:bg-[#111]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Donate more than just money</h2>
            <p className="text-lg text-[var(--brand-grey-dark)] max-w-2xl mx-auto">Charity AI supports a multi-resource ecosystem. You can provide exactly what beneficiaries need most right now.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-8 text-center">
            <div className="p-6 card-surface hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4"><Heart size={32} /></div>
              <h3 className="font-bold">Money</h3>
            </div>
            <div className="p-6 card-surface hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4"><Package size={32} /></div>
              <h3 className="font-bold">Food</h3>
            </div>
            <div className="p-6 card-surface hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-[var(--brand-blue)] rounded-2xl flex items-center justify-center mb-4"><Shirt size={32} /></div>
              <h3 className="font-bold">Clothes</h3>
            </div>
            <div className="p-6 card-surface hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4"><Pill size={32} /></div>
              <h3 className="font-bold">Medicines</h3>
            </div>
            <div className="p-6 card-surface hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} /></div>
              <h3 className="font-bold">Books</h3>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CHARITY AI WORKS */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-[var(--brand-grey-dark)] max-w-2xl mx-auto">A seamless pipeline from your hands to the beneficiary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "List Resource", desc: "Select the resource you want to donate and schedule a pickup." },
              { step: "2", title: "AI Matching", desc: "Our AI matches your specific resource to the nearest urgent NGO campaign." },
              { step: "3", title: "Logistics", desc: "Verified delivery partners pick up and transport the physical goods." },
              { step: "4", title: "Blockchain Track", desc: "The entire journey is recorded immutably. Receive delivery confirmation." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center font-bold text-xl mb-6">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--brand-grey-dark)]">{item.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 left-16 w-[calc(100%-2rem)] h-0.5 bg-gray-200 dark:bg-gray-800"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI RECOMMENDATION EXPLANATION */}
      <section className="py-24 bg-blue-50 dark:bg-blue-900/10 border-y border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-[var(--brand-blue)] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI Recommendation Engine</h2>
              <p className="text-lg text-[var(--brand-grey-dark)] mb-6">
                Our proprietary machine learning models constantly analyze global crises, regional shortages, and NGO capacity. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Dynamic urgency scoring for campaigns</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Personalized donor matching based on past history</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Multi-resource allocation optimization (e.g. routing medicine to clinics)</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="card-surface p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-blue)] to-purple-500"></div>
                <h3 className="font-bold mb-4">Live AI Match</h3>
                <div className="p-4 border border-[var(--brand-blue-light)] bg-blue-50/50 dark:bg-blue-500/10 rounded-xl mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">Your Donation: 50 Winter Coats</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">98% Match</span>
                  </div>
                  <p className="text-sm text-[var(--brand-grey-dark)]">Matched with: <strong>Syrian Refugee Relief Fund</strong></p>
                  <p className="text-xs text-red-500 font-bold mt-2">URGENT: Blizzard warning in region.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCKCHAIN TRANSPARENCY EXPLANATION */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <LinkIcon size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Blockchain Transparency</h2>
              <p className="text-lg text-[var(--brand-grey-dark)] mb-6">
                Trust is the foundation of charity. We use smart contracts to enforce fund allocation and an immutable public ledger to track every physical and monetary transaction.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Zero fund diversion guaranteed</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Publicly verifiable transaction hashes</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[var(--brand-success)]" /> Smart contract automated escrow release</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="card-surface p-8 font-mono text-sm shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border-color)] pb-4">
                  <span className="text-[var(--brand-grey-dark)]">Latest Block</span>
                  <span className="text-[var(--brand-blue)]">#104523</span>
                </div>
                <div className="space-y-3">
                  <div><span className="text-gray-500">Hash:</span> 0x3a9f2b8c9d4e7f1a...</div>
                  <div><span className="text-gray-500">From:</span> DonorWallet (John D.)</div>
                  <div><span className="text-gray-500">To:</span> GlobalFoodInitiative</div>
                  <div><span className="text-gray-500">Asset:</span> 500 Food Kits</div>
                  <div className="flex items-center gap-2 mt-4 text-green-500 font-bold"><Shield size={16}/> VERIFIED BY NETWORK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-24 bg-[var(--brand-dark)] dark:bg-[#111]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-[var(--brand-blue)] mb-2">$12M+</div>
              <div className="text-gray-400 font-medium">Funds Distributed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">450k</div>
              <div className="text-gray-400 font-medium">Meals Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-500 mb-2">85k</div>
              <div className="text-gray-400 font-medium">Medical Kits</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">Transparency</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted globally</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Charity AI let us donate our excess warehouse inventory of winter coats directly to an orphanage that the AI identified as highly critical.", author: "Sarah Jenkins, Retail CEO" },
              { text: "The blockchain transparency is incredible. I can literally track the exact meal kits I funded all the way to the beneficiary camp.", author: "Michael T., Monthly Donor" },
              { text: "As an NGO, the predictive insights help us prepare for seasonal shortages before they even happen. It's revolutionized our logistics.", author: "Dr. Ahmed, Global Relief" }
            ].map((t, i) => (
              <div key={i} className="card-surface p-8 relative">
                <Quote className="absolute top-6 right-6 text-[var(--brand-grey-bg)] dark:text-[#222]" size={48} />
                <p className="relative z-10 text-lg mb-6 italic text-[var(--text-color)]">"{t.text}"</p>
                <p className="font-bold text-sm text-[var(--brand-blue)]">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 border-t border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need assistance?</h2>
          <p className="text-[var(--brand-grey-dark)] mb-8 max-w-lg mx-auto">Whether you're an enterprise looking to donate bulk resources, or an NGO needing verification, we're here to help.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="btn-secondary">Contact Support</Link>
            <a href="mailto:support@charity.ai" className="btn-primary">Email Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-blue)] flex items-center justify-center text-white">
                <Heart size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[var(--text-color)]">Charity AI</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-[var(--brand-grey-dark)]">
              <Link to="/about" className="hover:text-[var(--brand-blue)]">About</Link>
              <Link to="/contact" className="hover:text-[var(--brand-blue)]">Contact</Link>
              <Link to="/privacy" className="hover:text-[var(--brand-blue)]">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[var(--brand-blue)]">Terms of Service</Link>
            </div>
            <div className="text-sm text-[var(--brand-grey-dark)]">
              &copy; 2026 Charity AI Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
