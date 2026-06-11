import React, { useState } from "react";
import { Building2, Search, CheckCircle2, MapPin, Globe } from "lucide-react";

const mockNGOs = [
  { id: 1, name: "Global Food Initiative", category: "Food Security", location: "Global", verified: true, activeCampaigns: 3 },
  { id: 2, name: "Disaster Relief Net", category: "Emergency Relief", location: "Asia Pacific", verified: true, activeCampaigns: 5 },
  { id: 3, name: "Teach for All", category: "Education", location: "India", verified: true, activeCampaigns: 2 },
  { id: 4, name: "Winter Warmth", category: "Clothing", location: "North America", verified: false, activeCampaigns: 1 },
];

export function NGOs() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Building2 className="text-[var(--brand-blue)]" /> Verified NGOs
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Discover and support organizations making a difference.</p>
        </div>
      </div>

      <div className="card-surface p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search organizations by name or category..." 
            className="input-field py-2 pl-9 pr-4 text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="input-field py-2 text-sm">
            <option>All Categories</option>
            <option>Food Security</option>
            <option>Education</option>
            <option>Emergency Relief</option>
            <option>Healthcare</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNGOs.filter(ngo => ngo.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ngo) => (
          <div key={ngo.id} className="card-surface p-6 flex flex-col h-full hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-[var(--brand-blue)] rounded-xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              {ngo.verified && (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                  <CheckCircle2 size={14} /> Verified Partner
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold mb-1">{ngo.name}</h3>
            <span className="inline-block bg-[var(--brand-grey-bg)] dark:bg-[#222] text-xs px-2 py-1 rounded mb-4 w-max">
              {ngo.category}
            </span>
            <div className="flex flex-col gap-2 mt-auto text-sm text-[var(--brand-grey-dark)]">
              <div className="flex items-center gap-2"><MapPin size={16} /> {ngo.location}</div>
              <div className="flex items-center gap-2"><Globe size={16} /> {ngo.activeCampaigns} Active Campaigns</div>
            </div>
            <button className="w-full mt-6 py-2 border border-[var(--border-color)] rounded-lg font-medium hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-colors">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
