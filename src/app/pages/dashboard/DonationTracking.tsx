import React, { useState } from "react";
import { Link as LinkIcon, Search, CheckCircle2, Clock, Truck, MapPin } from "lucide-react";

export function DonationTracking() {
  const [trackingId, setTrackingId] = useState("TX-90425");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <LinkIcon className="text-purple-600" /> Donation Tracking
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Track your physical and monetary donations on the blockchain.</p>
        </div>
      </div>

      <div className="card-surface p-6">
        <h2 className="text-lg font-bold mb-4">Track a Donation</h2>
        <div className="flex gap-4 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. TX-90425)" 
              className="input-field py-3 pl-10 w-full font-mono"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary px-6"
            onClick={() => {
              setIsSearching(true);
              setTimeout(() => setIsSearching(false), 800);
            }}
          >
            {isSearching ? "Searching..." : "Track"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-surface p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8 border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="text-xl font-bold">Shipment Status</h2>
                <p className="text-sm font-mono text-[var(--brand-grey-dark)]">ID: {trackingId}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-[var(--brand-blue)] dark:bg-blue-900/30 rounded-full font-bold text-sm flex items-center gap-2">
                <Truck size={16} /> In Transit
              </span>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-blue-500 before:to-gray-200">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-[var(--card-bg)] bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle2 size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl card-surface shadow">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-green-600">Donation Registered</h3>
                    <span className="text-xs text-[var(--brand-grey-dark)]">Oct 12, 10:00 AM</span>
                  </div>
                  <p className="text-sm text-[var(--brand-grey-dark)]">50 Boxes of Winter Coats registered by Donor.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-[var(--card-bg)] bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle2 size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl card-surface shadow">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-green-600">Pickup Completed</h3>
                    <span className="text-xs text-[var(--brand-grey-dark)]">Oct 13, 02:30 PM</span>
                  </div>
                  <p className="text-sm text-[var(--brand-grey-dark)]">Logistics partner collected the items from New York.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-[var(--card-bg)] bg-[var(--brand-blue)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 animate-pulse">
                  <Truck size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl card-surface shadow border-2 border-[var(--brand-blue)]">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-[var(--brand-blue)]">In Transit</h3>
                    <span className="text-xs text-[var(--brand-grey-dark)]">Current</span>
                  </div>
                  <p className="text-sm text-[var(--brand-grey-dark)]">En route to Syrian Refugee Relief Fund warehouse.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-[var(--card-bg)] bg-gray-300 dark:bg-gray-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <MapPin size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl card-surface shadow opacity-50">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-500">Delivered</h3>
                    <span className="text-xs text-[var(--brand-grey-dark)]">Pending</span>
                  </div>
                  <p className="text-sm text-[var(--brand-grey-dark)]">Awaiting receipt confirmation by NGO.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="card-surface p-6 self-start space-y-6">
          <h3 className="font-bold border-b border-[var(--border-color)] pb-3">Blockchain Verification</h3>
          <div className="space-y-4 font-mono text-sm">
            <div>
              <p className="text-xs text-[var(--brand-grey-dark)] mb-1">Smart Contract Hash</p>
              <p className="break-all text-[var(--brand-blue)]">0x9f8e7d6c5b4a3928170...</p>
            </div>
            <div>
              <p className="text-xs text-[var(--brand-grey-dark)] mb-1">Network</p>
              <p>Ethereum Mainnet (L2)</p>
            </div>
            <div>
              <p className="text-xs text-[var(--brand-grey-dark)] mb-1">Block Confirmations</p>
              <p className="text-green-600 font-bold">12,450 Verified</p>
            </div>
          </div>
          <button className="w-full py-2 bg-[var(--brand-grey-bg)] dark:bg-[#222] rounded font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            View on Explorer
          </button>
        </div>
      </div>
    </div>
  );
}
