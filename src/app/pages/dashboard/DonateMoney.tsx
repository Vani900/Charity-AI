import React, { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";

export function DonateMoney() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
          <p className="text-[var(--brand-grey-dark)] max-w-md mx-auto">
            Your monetary donation has been securely processed.
          </p>
        </div>
        <button className="btn-primary mt-4" onClick={() => setIsSubmitted(false)}>Make Another Donation</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-2xl">
          <Heart size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)]">Donate Funds</h1>
          <p className="text-[var(--brand-grey-dark)]">Provide financial support for critical campaigns.</p>
        </div>
      </div>

      <div className="card-surface p-8 shadow-xl">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          <div>
            <label className="block text-sm font-medium mb-2">Select Amount (USD)</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
              {[10, 25, 50, 100, 250].map((amt) => (
                <button 
                  key={amt} 
                  type="button" 
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`py-3 border rounded-xl font-bold transition-colors ${selectedAmount === amt ? 'border-[var(--brand-blue)] text-[var(--brand-blue)] bg-blue-50 dark:bg-blue-900/30' : 'border-[var(--border-color)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]'}`}
                >
                  ${amt}
                </button>
              ))}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[var(--brand-grey-dark)]">$</span>
                <input 
                  type="number" 
                  placeholder="Custom" 
                  className={`input-field pl-8 text-center h-full w-full ${customAmount ? 'border-[var(--brand-blue)]' : ''}`}
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
              <p className="text-xs text-[var(--brand-grey-dark)]">Sustain long-term impact with automatic contributions.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex justify-end">
            <button type="submit" className="btn-primary w-full py-4 text-lg shadow-xl shadow-blue-500/20">
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
