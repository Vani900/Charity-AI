import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, CheckCircle2, CreditCard, Calendar, User, ArrowLeft, Loader2, Download, Receipt, ExternalLink, ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function DonateMoney() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Steps: 'form' | 'payment' | 'processing' | 'success'
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'success'>('form');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  
  // Payment Form States
  const [cardName, setCardName] = useState(user?.name || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  
  // Processing States
  const [processingText, setProcessingText] = useState("Connecting to secure payment gateway...");
  
  // Success receipt details
  const [transactionId, setTransactionId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  
  const getAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const val = parseFloat(customAmount);
    return isNaN(val) ? 0 : val;
  };

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = getAmount();
    if (amount <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }
    setStep('payment');
  };

  const handleCardNumberChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    const formatted = numbersOnly.match(/.{1,4}/g)?.join(" ") || numbersOnly;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 2) {
      setExpiry(`${clean.slice(0, 2)}/${clean.slice(2)}`);
    } else {
      setExpiry(clean);
    }
  };

  const handleCvvChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 3);
    setCvv(clean);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!cardName.trim()) errors.cardName = "Cardholder name is required";
    if (cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errors.expiry = "Expiry must be MM/YY";
    if (cvv.length < 3) errors.cvv = "CVV must be 3 digits";
    
    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }
    
    setPaymentErrors({});
    setStep('processing');
    
    const texts = [
      "Contacting secure banking host...",
      "Authorizing and verifying transaction...",
      "Recording donation receipt on blockchain ledger..."
    ];
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < texts.length - 1) {
        currentIdx++;
        setProcessingText(texts[currentIdx]);
      }
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      const hash = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join("");
      setTransactionId(hash);
      setTimestamp(new Date().toLocaleString());
      setStep('success');
    }, 3200);
  };

  const resetAll = () => {
    setStep('form');
    setSelectedAmount(50);
    setCustomAmount("");
    setIsRecurring(false);
    setCardName(user?.name || "");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setPaymentErrors({});
  };

  const handleDownloadReceipt = () => {
    const receiptText = `
======================================
      CHARITY AI DONATION RECEIPT
======================================
Transaction Status: SUCCESS (CONFIRMED)
Transaction Hash: ${transactionId}
Date & Time: ${timestamp}
--------------------------------------
Donor Name: ${cardName}
Donation Amount: $${getAmount().toFixed(2)}
Donation Type: Financial Funds
Frequency: ${isRecurring ? "Monthly Recurring" : "One-Time"}
Assigned NGO: Disaster Relief Net
======================================
Thank you for your generous support!
    `;
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CharityAI_Receipt_${transactionId.substring(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Render Step 1: Selection Form
  if (step === 'form') {
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
          <form className="space-y-6" onSubmit={handleAmountSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Select Amount (USD)</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {[10, 25, 50, 100, 250].map((amt) => (
                  <button 
                    key={amt} 
                    type="button" 
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-3 border rounded-xl font-bold transition-colors cursor-pointer ${selectedAmount === amt ? 'border-[var(--brand-blue)] text-[var(--brand-blue)] bg-blue-50 dark:bg-blue-900/30' : 'border-[var(--border-color)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] text-[var(--text-color)]'}`}
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
              <input 
                type="checkbox" 
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)] cursor-pointer" 
              />
              <label htmlFor="recurring" className="cursor-pointer">
                <h4 className="font-bold text-sm text-[var(--text-color)]">Make this a recurring monthly donation</h4>
                <p className="text-xs text-[var(--brand-grey-dark)]">Sustain long-term impact with automatic contributions.</p>
              </label>
            </div>

            <div className="pt-6 border-t border-[var(--border-color)] flex justify-end">
              <button type="submit" className="btn-primary w-full py-4 text-lg shadow-xl shadow-blue-500/20 cursor-pointer">
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render Step 2: Payment Details (Checkout Form)
  if (step === 'payment') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button 
          onClick={() => setStep('form')}
          className="flex items-center gap-1.5 text-sm text-[var(--brand-grey-dark)] hover:text-[var(--text-color)] transition-colors bg-transparent border-none cursor-pointer mb-2"
        >
          <ArrowLeft size={16} /> Back to amount selection
        </button>

        <div className="flex items-center gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-[var(--brand-blue)] rounded-xl">
            <CreditCard size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-color)]">Secure Checkout</h1>
            <p className="text-[var(--brand-grey-dark)] text-sm">Please complete your payment details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Card Form */}
          <div className="card-surface p-6 lg:col-span-2 space-y-6">
            <h3 className="font-bold text-lg border-b border-[var(--border-color)] pb-2 text-[var(--text-color)]">Credit Card Details</h3>
            
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-grey-dark)] mb-1">Cardholder Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={`input-field pl-10 ${paymentErrors.cardName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {paymentErrors.cardName && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-grey-dark)] mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
                  <input 
                    type="text" 
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className={`input-field pl-10 tracking-widest ${paymentErrors.cardNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {paymentErrors.cardNumber && <p className="text-xs text-red-500 mt-1">{paymentErrors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-grey-dark)] mb-1">Expiry Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-grey-dark)]" />
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className={`input-field pl-10 ${paymentErrors.expiry ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                  </div>
                  {paymentErrors.expiry && <p className="text-xs text-red-500 mt-1">{paymentErrors.expiry}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--brand-grey-dark)] mb-1">CVV / CVC</label>
                  <input 
                    type="password" 
                    required
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    className={`input-field text-center ${paymentErrors.cvv ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {paymentErrors.cvv && <p className="text-xs text-red-500 mt-1">{paymentErrors.cvv}</p>}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="btn-primary w-full py-3.5 font-bold shadow-xl shadow-blue-500/10 cursor-pointer">
                  Confirm & Pay ${getAmount().toFixed(2)}
                </button>
              </div>
            </form>
          </div>

          {/* Checkout Summary Card */}
          <div className="card-surface p-6 space-y-6">
            <h3 className="font-bold text-lg border-b border-[var(--border-color)] pb-2 text-[var(--text-color)]">Donation Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--brand-grey-dark)]">Amount:</span>
                <span className="font-bold text-[var(--text-color)]">${getAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--brand-grey-dark)]">Frequency:</span>
                <span className="font-medium text-[var(--text-color)]">{isRecurring ? "Monthly Recurring" : "One-Time"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--brand-grey-dark)]">Destination:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Disaster Relief Net (AI Match)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--brand-grey-dark)]">Processor Fee:</span>
                <span className="text-gray-400 font-medium">Free ($0.00)</span>
              </div>
              
              <div className="border-t border-[var(--border-color)] pt-3 flex justify-between font-bold text-base">
                <span className="text-[var(--text-color)]">Total Impact:</span>
                <span className="text-[var(--brand-blue)]">${getAmount().toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 rounded-xl text-xs flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <p>100% of your funds are matched to our NGO partners and monitored via blockchain ledger receipts.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 3: Processing Loader
  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-[var(--border-color)] border-t-[var(--brand-blue)] animate-spin" />
          <Heart size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--brand-blue)] animate-pulse" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Processing Payment</h2>
          <p className="text-[var(--brand-grey-dark)] text-sm animate-pulse">{processingText}</p>
        </div>
      </div>
    );
  }

  // Render Step 4: Success Receipt (Order Confirmation)
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 size={44} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-color)] mb-1">Donation Confirmed!</h1>
          <p className="text-[var(--brand-grey-dark)] text-sm max-w-md mx-auto">
            Your generous financial support has been securely authorized and logged.
          </p>
        </div>
      </div>

      {/* Styled Blockchain Receipt Card */}
      <div className="card-surface p-6 shadow-xl relative overflow-hidden border-t-4 border-t-emerald-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 blur-3xl rounded-full" />
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-[var(--text-color)]">
            <Receipt className="h-5 w-5 text-emerald-500" />
            <span className="font-bold tracking-wider text-xs uppercase text-[var(--brand-grey-dark)]">Blockchain Receipt</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        </div>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Transaction ID (Hash)</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-[var(--text-color)] truncate max-w-[200px] md:max-w-xs">{transactionId}</span>
              </div>
            </div>
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Date & Time</p>
              <p className="font-medium text-[var(--text-color)]">{timestamp}</p>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Donor</p>
              <p className="font-medium text-[var(--text-color)]">{cardName}</p>
            </div>
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Method</p>
              <p className="font-medium text-[var(--text-color)] flex items-center gap-2">
                <CreditCard size={14} className="text-gray-400" />
                •••• •••• •••• {cardNumber.slice(-4) || "4242"}
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Recipient NGO</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">Disaster Relief Net</p>
            </div>
            <div>
              <p className="text-[var(--brand-grey-dark)] text-xs uppercase tracking-wider mb-0.5">Frequency</p>
              <p className="font-medium text-[var(--text-color)]">{isRecurring ? "Monthly Recurring" : "One-Time Donation"}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-[var(--border-color)] pt-4 flex justify-between items-center text-lg font-extrabold">
            <span className="text-[var(--text-color)]">Total Amount Paid</span>
            <span className="text-[var(--brand-blue)]">${getAmount().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <button 
          onClick={handleDownloadReceipt}
          className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-sm cursor-pointer"
        >
          <Download size={16} /> Download Receipt
        </button>

        <Link 
          to="/dashboard/blockchain"
          className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-sm cursor-pointer"
        >
          <ExternalLink size={16} /> Verify on Ledger
        </Link>
        
        <button 
          onClick={resetAll}
          className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm cursor-pointer"
        >
          Make Another Donation
        </button>
      </div>
    </div>
  );
}
