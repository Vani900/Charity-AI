import React, { useState } from "react";
import { Download, Search, Filter, MapPin, Truck, CheckCircle2, Clock, Map } from "lucide-react";

// Mock Data
const donationHistory = [
  { id: "DON-7829", date: "2026-05-31", category: "Monetary", amount: "$500", ngo: "Global Food Initiative", status: "Delivered", txHash: "0x3a...9f2b" },
  { id: "DON-7828", date: "2026-05-29", category: "Food", amount: "50 Meals", ngo: "Local Shelter", status: "In Transit", txHash: "0x1c...4d8e" },
  { id: "DON-7827", date: "2026-05-25", category: "Clothes", amount: "3 Boxes", ngo: "Winter Relief Fund", status: "Delivered", txHash: "0x9d...2a1c" },
  { id: "DON-7826", date: "2026-05-15", category: "Books", amount: "100 Books", ngo: "Education First", status: "Pending Pickup", txHash: "0x4e...7b9a" },
  { id: "DON-7825", date: "2026-05-02", category: "Monetary", amount: "$1,200", ngo: "Disaster Relief Network", status: "Delivered", txHash: "0x8f...3c5d" },
];

export function Donations() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">My Donations</h1>
          <p className="text-[var(--brand-grey-dark)]">Track and manage your past and active contributions.</p>
        </div>
        <button className="btn-secondary">
          <Download size={18} />
          Export Tax Receipt
        </button>
      </div>

      {/* Active Tracking */}
      <h2 className="text-lg font-bold mt-8 mb-4">Active Deliveries</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card-surface p-6 border-l-4 border-l-yellow-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">DON-7826: Books Collection</h3>
              <p className="text-sm text-[var(--brand-grey-dark)]">To: Education First</p>
            </div>
            <span className="bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Clock size={14} /> Pending Pickup
            </span>
          </div>
          
          <div className="relative pt-8 pb-2">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-[25%] h-1 bg-yellow-500 -translate-y-1/2 z-0 rounded-full"></div>
            
            <div className="relative z-10 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center mb-2 shadow-lg ring-4 ring-[var(--card-bg)]">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-xs font-medium">Scheduled</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center mb-2 ring-4 ring-[var(--card-bg)]">
                  <Truck size={16} />
                </div>
                <span className="text-xs text-gray-500 font-medium">In Transit</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center mb-2 ring-4 ring-[var(--card-bg)]">
                  <MapPin size={16} />
                </div>
                <span className="text-xs text-gray-500 font-medium">Delivered</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 border-l-4 border-l-[var(--brand-blue)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">DON-7828: 50 Meals</h3>
              <p className="text-sm text-[var(--brand-grey-dark)]">To: Local Shelter</p>
            </div>
            <span className="bg-blue-50 dark:bg-blue-500/10 text-[var(--brand-blue)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Truck size={14} /> In Transit
            </span>
          </div>
          
          <div className="relative pt-8 pb-2">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-[50%] h-1 bg-[var(--brand-blue)] -translate-y-1/2 z-0 rounded-full"></div>
            
            <div className="relative z-10 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center mb-2 shadow-lg ring-4 ring-[var(--card-bg)]">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-xs font-medium">Scheduled</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center mb-2 shadow-lg ring-4 ring-[var(--card-bg)] animate-bounce">
                  <Truck size={16} />
                </div>
                <span className="text-xs font-medium">In Transit</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400 flex items-center justify-center mb-2 ring-4 ring-[var(--card-bg)]">
                  <MapPin size={16} />
                </div>
                <span className="text-xs text-gray-500 font-medium">Delivered</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 btn-outline py-2 border-gray-200 dark:border-gray-700 text-[var(--text-color)] hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-center items-center gap-2">
            <Map size={16} /> View Live Map
          </button>
        </div>
      </div>

      {/* Full History Table */}
      <div className="card-surface overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold">Donation History</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search donations..." 
                className="input-field py-2 pl-9 pr-4 text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-[var(--border-color)] rounded-xl hover:bg-[var(--brand-grey-bg)] transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">NGO</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">Amount/Qty</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase tracking-wider">Txn Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {donationHistory.filter(d => d.ngo.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.includes(searchTerm)).map((doc) => (
                <tr key={doc.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222] transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">{doc.id}</td>
                  <td className="py-4 px-6 text-sm text-[var(--brand-grey-dark)]">{doc.date}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      doc.category === 'Monetary' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      doc.category === 'Food' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">{doc.ngo}</td>
                  <td className="py-4 px-6 text-sm font-bold">{doc.amount}</td>
                  <td className="py-4 px-6 text-sm">
                    {doc.status === 'Delivered' ? (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                        <CheckCircle2 size={16} /> Delivered
                      </span>
                    ) : doc.status === 'In Transit' ? (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--brand-blue)]">
                        <Truck size={16} /> In Transit
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        <Clock size={16} /> {doc.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <a href="#" className="text-[var(--brand-blue)] hover:underline font-mono text-xs bg-[var(--brand-blue-tint)] dark:bg-blue-500/10 px-2 py-1 rounded">
                      {doc.txHash}
                    </a>
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
