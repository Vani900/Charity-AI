import React, { useState } from "react";
import { Search, Filter, Users, TrendingUp, Heart, Share2 } from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    title: "Emergency Medical Relief for Gaza",
    ngo: "Doctors Without Borders",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    raised: 450000,
    goal: 500000,
    donors: 12450,
    category: "Medical",
    urgency: "Critical"
  },
  {
    id: 2,
    title: "Clean Water Wells in Rural Kenya",
    ngo: "WaterAid",
    image: "https://images.unsplash.com/photo-1541810525281-a836263ce2f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    raised: 28000,
    goal: 50000,
    donors: 850,
    category: "Infrastructure",
    urgency: "High"
  },
  {
    id: 3,
    title: "Winter Blankets & Food for Refugees",
    ngo: "Global Relief Net",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    raised: 15000,
    goal: 20000,
    donors: 320,
    category: "Supplies",
    urgency: "Medium"
  },
  {
    id: 4,
    title: "Rebuilding Local Animal Shelter",
    ngo: "Paws Rescue",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    raised: 8000,
    goal: 10000,
    donors: 142,
    category: "Animals",
    urgency: "Medium"
  }
];

export function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[var(--brand-blue)] to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Discover Campaigns</h1>
          <p className="text-white/80">Support urgent causes recommended by our AI engine or explore campaigns globally. 100% of your donation is tracked on the blockchain.</p>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <button className="btn-primary bg-white text-[var(--brand-dark)] w-full md:w-auto shadow-xl hover:bg-gray-100">
            Start a Campaign
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          {["All", "Medical", "Infrastructure", "Supplies", "Animals", "Education"].map(cat => (
            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${cat === 'All' ? 'bg-[var(--brand-dark)] dark:bg-white text-white dark:text-black' : 'bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A] text-[var(--text-color)] hover:bg-gray-200 dark:hover:bg-[#222]'}`}>
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="input-field py-2 pl-9 pr-4 text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-[var(--border-color)] rounded-xl bg-[var(--card-bg)] hover:bg-[var(--brand-grey-bg)] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCampaigns.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((campaign) => {
          const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
          return (
            <div key={campaign.id} className="card-surface flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative overflow-hidden bg-gray-200">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {campaign.urgency === 'Critical' && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                    CRITICAL NEED
                  </span>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--brand-blue)] uppercase tracking-wider">{campaign.category}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-[var(--brand-blue)] transition-colors line-clamp-2">{campaign.title}</h3>
                <p className="text-sm text-[var(--brand-grey-dark)] mb-4">{campaign.ngo}</p>
                
                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span>${campaign.raised.toLocaleString()} raised</span>
                      <span className="text-[var(--brand-grey-dark)]">${campaign.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-[var(--brand-blue)] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--brand-grey-dark)]">
                      <Users size={16} />
                      <span>{campaign.donors.toLocaleString()} donors</span>
                    </div>
                    <button className="btn-primary py-1.5 px-4 text-sm rounded-lg shadow-md shadow-blue-500/20">
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
