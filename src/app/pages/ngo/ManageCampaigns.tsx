import React, { useState } from "react";
import { Target, Plus, Edit2, Trash2, PieChart, PlayCircle, PauseCircle } from "lucide-react";

const initialCampaigns = [
  { id: 1, title: "Emergency Medical Relief", goal: 500000, raised: 450000, status: "Active", donors: 1245 },
  { id: 2, title: "Clean Water Wells", goal: 50000, raised: 28000, status: "Active", donors: 850 },
  { id: 3, title: "School Supplies Drive", goal: 10000, raised: 10000, status: "Completed", donors: 340 },
  { id: 4, title: "Disaster Rebuilding", goal: 200000, raised: 5000, status: "Paused", donors: 12 },
];

export function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Target className="text-[var(--brand-blue)]" /> NGO Campaign Management
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Create, edit, and track the performance of your active requests.</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? "Cancel" : <><Plus size={18} /> Create Campaign</>}
        </button>
      </div>

      {isCreating && (
        <div className="card-surface p-6 animate-in slide-in-from-top-4 fade-in">
          <h2 className="text-lg font-bold mb-6">Create New Campaign</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsCreating(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Title</label>
                <input type="text" className="input-field" placeholder="e.g. Winter Clothing Drive" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Funding Goal ($)</label>
                <input type="number" className="input-field" placeholder="5000" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="input-field h-24 py-2" placeholder="Describe the urgency and impact..." required></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" className="btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Publish Campaign</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Analytics Summary */}
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-[var(--brand-blue)]">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-[var(--brand-blue)] rounded-xl">
            <PieChart size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Total Funds Raised</h3>
            <p className="text-2xl font-bold">$493,000</p>
          </div>
        </div>
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-green-500">
          <div className="p-3 bg-green-50 dark:bg-green-500/10 text-[var(--brand-success)] rounded-xl">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Active Campaigns</h3>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold">Your Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Campaign Title</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Progress</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Donors</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Status</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {campaigns.map((camp) => {
                const progress = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
                return (
                  <tr key={camp.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222]">
                    <td className="py-4 px-6 text-sm font-bold">{camp.title}</td>
                    <td className="py-4 px-6">
                      <div className="w-full max-w-[200px]">
                        <div className="flex justify-between text-xs mb-1">
                          <span>${camp.raised.toLocaleString()}</span>
                          <span className="text-[var(--brand-grey-dark)]">${camp.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[var(--brand-blue)] h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm">{camp.donors}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        camp.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        camp.status === 'Completed' ? 'bg-blue-100 text-[var(--brand-blue)] dark:bg-blue-900/30' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[var(--brand-blue)] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title={camp.status === 'Active' ? "Pause" : "Start"}>
                          {camp.status === 'Active' ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-[var(--brand-blue)] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
