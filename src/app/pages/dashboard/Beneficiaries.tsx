import React, { useState } from "react";
import { Users, UserPlus, CheckCircle2, Clock, Search, MapPin, HeartPulse } from "lucide-react";

const mockBeneficiaries = [
  { id: "BEN-001", name: "Ramesh Family", need: "Housing", status: "Verified", allocated: "$1,200", location: "Chennai", date: "2026-05-10" },
  { id: "BEN-002", name: "City Orphanage", need: "Education", status: "Verified", allocated: "$5,000", location: "Bangalore", date: "2026-05-12" },
  { id: "BEN-003", name: "Suresh Kumar", need: "Medical", status: "Pending Verification", allocated: "$0", location: "Delhi", date: "2026-05-28" },
  { id: "BEN-004", name: "Local Farmers Coop", need: "Equipment", status: "Verified", allocated: "$3,400", location: "Punjab", date: "2026-04-15" },
];

export function Beneficiaries() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Users className="text-[var(--brand-blue)]" /> Beneficiary Management
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Track, verify, and allocate funds to beneficiaries transparently.</p>
        </div>
        <button className="btn-primary">
          <UserPlus size={18} /> Register Beneficiary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-surface p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-[var(--brand-blue)] rounded-lg">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-lg">Total Registered</h3>
          </div>
          <p className="text-3xl font-bold mt-2">142</p>
        </div>
        <div className="card-surface p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 text-[var(--brand-success)] rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-bold text-lg">Verified & Funded</h3>
          </div>
          <p className="text-3xl font-bold mt-2">128</p>
        </div>
        <div className="card-surface p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 rounded-lg">
              <HeartPulse size={20} />
            </div>
            <h3 className="font-bold text-lg">Total Impact</h3>
          </div>
          <p className="text-3xl font-bold mt-2">$24,500</p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold">Beneficiary Directory</h2>
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="input-field py-2 pl-9 pr-4 text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Beneficiary</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Location</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Need Type</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Status</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Funds Allocated</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {mockBeneficiaries.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ben) => (
                <tr key={ben.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222] transition-colors">
                  <td className="py-4 px-6 text-sm">
                    <div className="font-bold">{ben.name}</div>
                    <div className="text-xs text-[var(--brand-grey-dark)] font-mono">{ben.id}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[var(--brand-grey-dark)] flex items-center gap-1">
                    <MapPin size={14} /> {ben.location}
                  </td>
                  <td className="py-4 px-6 text-sm">{ben.need}</td>
                  <td className="py-4 px-6 text-sm">
                    {ben.status === 'Verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-500/10 text-[var(--brand-success)]">
                        <CheckCircle2 size={14} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-[var(--brand-blue)]">{ben.allocated}</td>
                  <td className="py-4 px-6 text-sm">
                    <button className="text-[var(--brand-blue)] hover:underline font-medium">View Timeline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
