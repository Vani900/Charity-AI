import React, { useState } from "react";
import { Package, MapPin, Calendar, Camera, CheckCircle2 } from "lucide-react";

export function DonateFood() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Food Donation Registered!</h1>
          <p className="text-[var(--brand-grey-dark)] max-w-md mx-auto">
            Our logistics team will contact you shortly to coordinate the pickup.
          </p>
        </div>
        <button className="btn-primary mt-4" onClick={() => setIsSubmitted(false)}>Register Another Donation</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/30 text-orange-500 rounded-2xl">
          <Package size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)]">Donate Food</h1>
          <p className="text-[var(--brand-grey-dark)]">Provide non-perishable food items to communities in need.</p>
        </div>
      </div>

      <div className="card-surface p-8 shadow-xl">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Item Description & Quantity</label>
                <textarea 
                  className="input-field h-32 py-2" 
                  placeholder="E.g., 50 lbs of canned beans, 20 bags of rice..."
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
              <label className="block text-sm font-medium mb-1">Upload Images (Highly Recommended)</label>
              <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl h-[264px] flex flex-col items-center justify-center text-center p-6 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[var(--brand-grey-bg)] dark:bg-[#222] rounded-full flex items-center justify-center mb-3">
                  <Camera size={24} className="text-[var(--brand-grey-dark)]" />
                </div>
                <p className="font-bold text-sm">Click to upload photos</p>
                <p className="text-xs text-[var(--brand-grey-dark)] mt-1">JPEG, PNG up to 5MB. Helps NGOs verify food safety seals.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex justify-end">
            <button type="submit" className="btn-primary w-full py-4 text-lg bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20">
              Submit Food Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
