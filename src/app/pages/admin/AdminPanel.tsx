import React, { useState } from "react";
import { Users, Building, ShieldAlert, BarChart, CheckCircle2, XCircle, FileText } from "lucide-react";

const mockNgos = [
  { id: "NGO-101", name: "Global Food Initiative", status: "Verified", docs: "Valid", date: "2026-05-15" },
  { id: "NGO-102", name: "Water For All", status: "Pending", docs: "Under Review", date: "2026-05-28" },
  { id: "NGO-103", name: "Tech Relief", status: "Rejected", docs: "Invalid", date: "2026-05-10" },
  { id: "NGO-104", name: "Paws Rescue", status: "Verified", docs: "Valid", date: "2026-04-20" },
];

const mockCampaignApprovals = [
  { id: "CAMP-901", title: "Flood Relief Kerala", ngo: "Disaster Relief Net", status: "Pending", goal: "$50,000" },
  { id: "CAMP-902", title: "Rural Education", ngo: "Teach for All", status: "Pending", goal: "$10,000" },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"ngos" | "campaigns">("ngos");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">System Administration</h1>
          <p className="text-[var(--brand-grey-dark)]">Manage users, verify NGOs, and monitor platform health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-[var(--brand-blue)]">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-[var(--brand-blue)] rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold">12,450</p>
          </div>
        </div>
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-green-500">
          <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl">
            <Building size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Verified NGOs</h3>
            <p className="text-2xl font-bold">842</p>
          </div>
        </div>
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-yellow-500">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Pending Approvals</h3>
            <p className="text-2xl font-bold">14</p>
          </div>
        </div>
        <div className="card-surface p-6 flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium">Fraud Alerts</h3>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <div className="card-surface overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[var(--border-color)]">
            <div className="flex gap-4">
              <button 
                className={`text-lg font-bold pb-2 border-b-2 transition-colors ${activeTab === 'ngos' ? 'border-[var(--brand-blue)] text-[var(--brand-blue)]' : 'border-transparent text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]'}`}
                onClick={() => setActiveTab("ngos")}
              >
                NGO Verification
              </button>
              <button 
                className={`text-lg font-bold pb-2 border-b-2 transition-colors ${activeTab === 'campaigns' ? 'border-[var(--brand-blue)] text-[var(--brand-blue)]' : 'border-transparent text-[var(--brand-grey-dark)] hover:text-[var(--text-color)]'}`}
                onClick={() => setActiveTab("campaigns")}
              >
                Campaign Approvals
              </button>
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                  <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">{activeTab === 'ngos' ? 'NGO Name' : 'Campaign'}</th>
                  <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Status</th>
                  <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {activeTab === 'ngos' ? (
                  mockNgos.map((ngo) => (
                    <tr key={ngo.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222]">
                      <td className="py-4 px-6 text-sm font-medium">
                        {ngo.name}
                        <div className="text-xs text-[var(--brand-grey-dark)] font-normal">{ngo.id}</div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ngo.status === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          ngo.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {ngo.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {ngo.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                              <CheckCircle2 size={16} />
                            </button>
                            <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                              <XCircle size={16} />
                            </button>
                          </div>
                        ) : (
                          <button className="text-sm text-[var(--brand-blue)] hover:underline">View details</button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  mockCampaignApprovals.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222]">
                      <td className="py-4 px-6 text-sm font-medium">
                        {camp.title}
                        <div className="text-xs text-[var(--brand-grey-dark)] font-normal">{camp.ngo}</div>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {camp.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <div className="flex gap-2">
                          <button className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                            <CheckCircle2 size={16} />
                          </button>
                          <button className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="card-surface p-6">
          <h2 className="text-lg font-bold mb-6">System Health & Activity</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Blockchain Node Sync Completed</p>
                <p className="text-xs text-[var(--brand-grey-dark)]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-[var(--brand-blue)]"></div>
              <div>
                <p className="text-sm font-medium">AI Matching Engine Model Updated</p>
                <p className="text-xs text-[var(--brand-grey-dark)]">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
              <div>
                <p className="text-sm font-medium">Fraud Alert: Suspicious transaction pattern detected</p>
                <p className="text-xs text-[var(--brand-grey-dark)]">3 hours ago</p>
                <button className="mt-2 text-xs font-medium text-[var(--brand-blue)] hover:underline">Investigate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
