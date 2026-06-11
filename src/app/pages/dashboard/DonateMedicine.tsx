import React, { useState } from "react";
import { Pill, MapPin, Calendar, Camera, CheckCircle2, AlertTriangle } from "lucide-react";

export function DonateMedicine() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Medical Donation Registered!</h1>
          <p className="text-[var(--brand-grey-dark)] max-w-md mx-auto">
            Our medical verification team will reach out within 24 hours to coordinate secure transit.
          </p>
        </div>
        <button className="btn-primary mt-4" onClick={() => setIsSubmitted(false)}>Register Another Donation</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-2xl">
          <Pill size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)]">Donate Medicines</h1>
          <p className="text-[var(--brand-grey-dark)]">Provide unexpired medical supplies and kits to clinics.</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-yellow-700 dark:text-yellow-400 text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p><strong>Strict Policy:</strong> We only accept sealed, unexpired medications and unused medical equipment. All items are verified by our medical logistics partners before distribution.</p>
      </div>

      <div className="card-surface p-8 shadow-xl">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Medication / Equipment Description</label>
                <textarea 
                  className="input-field h-24 py-2" 
                  placeholder="E.g., 100 sealed First-Aid kits, 5 boxes of Ibuprofen..."
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expiration Date(s)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                  <input type="text" className="input-field pl-10" placeholder="MM/YYYY or multiple dates" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                  <input type="text" className="input-field pl-10" placeholder="Enter full address" required />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Upload Images (Required)</label>
              <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl h-[264px] flex flex-col items-center justify-center text-center p-6 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[var(--brand-grey-bg)] dark:bg-[#222] rounded-full flex items-center justify-center mb-3">
                  <Camera size={24} className="text-[var(--brand-grey-dark)]" />
                </div>
                <p className="font-bold text-sm">Click to upload photos</p>
                <p className="text-xs text-[var(--brand-grey-dark)] mt-1">Please include clear photos of expiration dates and intact seals.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex justify-end">
            <button type="submit" className="btn-primary w-full py-4 text-lg bg-green-600 hover:bg-green-700 shadow-xl shadow-green-500/20">
              Submit Medical Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
