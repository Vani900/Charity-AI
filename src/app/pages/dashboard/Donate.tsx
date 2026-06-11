import React, { useState } from "react";
import { Heart, Package, Shirt, BookOpen, Pill, MapPin, Camera, Calendar, CheckCircle2 } from "lucide-react";

export function Donate() {
  const [selectedCategory, setSelectedCategory] = useState("money");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");

  const categories = [
    { id: "money", label: "Money", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
    { id: "food", label: "Food", icon: Package, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "clothes", label: "Clothes", icon: Shirt, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "books", label: "Books", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "medicine", label: "Medicine", icon: Pill, color: "text-green-500", bg: "bg-green-50" },
  ];

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Thank you for your generosity!</h1>
          <p className="text-[var(--brand-grey-dark)] max-w-md mx-auto">
            Your {selectedCategory} donation has been recorded. Our AI engine is currently matching your contribution with the most urgent needs.
          </p>
        </div>
        <button className="btn-primary mt-4" onClick={() => setIsSubmitted(false)}>Make Another Donation</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Make a Donation</h1>
        <p className="text-[var(--brand-grey-dark)]">Select what you would like to contribute. Every resource counts.</p>
      </div>

      <div className="card-surface p-6 sm:p-8 shadow-xl">
        <h2 className="text-lg font-bold mb-6">1. Select Donation Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  isSelected 
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue-tint)] dark:bg-blue-500/10 shadow-md transform scale-105' 
                    : 'border-[var(--border-color)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`p-3 rounded-full ${isSelected ? 'bg-white dark:bg-[#222] shadow-sm' : cat.bg} ${cat.color}`}>
                  <Icon size={24} />
                </div>
                <span className={`font-semibold text-sm ${isSelected ? 'text-[var(--brand-blue)]' : 'text-[var(--text-color)]'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          <h2 className="text-lg font-bold mb-4 pt-6 border-t border-[var(--border-color)]">
            2. Donation Details
          </h2>
          
          {selectedCategory === "money" ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                  {[10, 25, 50, 100, 250].map((amt) => (
                    <button 
                      key={amt} 
                      type="button" 
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-2 border rounded-xl font-bold transition-colors ${selectedAmount === amt ? 'border-[var(--brand-blue)] text-[var(--brand-blue)] bg-blue-50 dark:bg-blue-900/30' : 'border-[var(--border-color)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]'}`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[var(--brand-grey-dark)]">$</span>
                    <input 
                      type="number" 
                      placeholder="Custom" 
                      className={`input-field pl-8 text-center ${customAmount ? 'border-[var(--brand-blue)]' : ''}`}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-xl border border-[var(--border-color)]">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                <div>
                  <h4 className="font-bold text-sm">Make this a recurring monthly donation</h4>
                  <p className="text-xs text-[var(--brand-grey-dark)]">Sustain long-term impact with automatic monthly contributions.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity / Description</label>
                  <textarea 
                    className="input-field h-24 py-2" 
                    placeholder={`Describe the ${selectedCategory} you are donating (e.g. 5 boxes of winter coats)...`}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                    <input type="text" className="input-field pl-10" placeholder="Enter full address" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                    <input type="date" className="input-field pl-10" required />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Upload Images (Optional)</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl h-[216px] flex flex-col items-center justify-center text-center p-6 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-[var(--brand-grey-bg)] dark:bg-[#222] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera size={24} className="text-[var(--brand-grey-dark)] group-hover:text-[var(--brand-blue)]" />
                  </div>
                  <p className="font-bold text-sm">Click to upload photos</p>
                  <p className="text-xs text-[var(--brand-grey-dark)] mt-1">JPEG, PNG up to 5MB. Helps NGOs assess the resources.</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-[var(--border-color)] flex justify-end">
            <button type="submit" className="btn-primary w-full sm:w-auto py-3 px-8 text-lg shadow-xl shadow-blue-500/20">
              Confirm & Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
