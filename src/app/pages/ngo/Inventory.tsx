import React, { useState } from "react";
import { Package, Shirt, Pill, Search, MapPin, Truck, CheckCircle2 } from "lucide-react";

const mockInventory = [
  { id: "INV-001", type: "Food", desc: "50 Boxes of Canned Goods", from: "Local Donor", status: "In Transit", date: "2026-05-31" },
  { id: "INV-002", type: "Clothes", desc: "10 Winter Coats", from: "Community Drive", status: "Received", date: "2026-05-30" },
  { id: "INV-003", type: "Medicine", desc: "100 First-Aid Kits", from: "PharmaCorp", status: "Pending Pickup", date: "2026-05-29" },
  { id: "INV-004", type: "Food", desc: "500kg Rice", from: "Farmers Coop", status: "Received", date: "2026-05-25" },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <Package className="text-[var(--brand-blue)]" /> Resource Inventory
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Track incoming physical donations and manage distribution.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-surface p-6 border-l-4 border-l-orange-500">
          <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium mb-1">Food Stock</h3>
          <p className="text-2xl font-bold">1,250 kg</p>
          <span className="text-xs text-orange-500 font-medium">+15% this week</span>
        </div>
        <div className="card-surface p-6 border-l-4 border-l-blue-500">
          <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium mb-1">Clothing Units</h3>
          <p className="text-2xl font-bold">450 Items</p>
          <span className="text-xs text-blue-500 font-medium">Critical need: Winter</span>
        </div>
        <div className="card-surface p-6 border-l-4 border-l-green-500">
          <h3 className="text-[var(--brand-grey-dark)] text-sm font-medium mb-1">Medical Supplies</h3>
          <p className="text-2xl font-bold">85 Kits</p>
          <span className="text-xs text-[var(--brand-grey-dark)] font-medium">Stable</span>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold">Incoming & Received Shipments</h2>
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search inventory..." 
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
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Item ID</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Category</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Description</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Source</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Status</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {mockInventory.filter(i => i.desc.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <tr key={item.id} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222]">
                  <td className="py-4 px-6 text-sm font-mono text-[var(--brand-grey-dark)]">{item.id}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold ${
                      item.type === 'Food' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                      item.type === 'Clothes' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {item.type === 'Food' && <Package size={12} />}
                      {item.type === 'Clothes' && <Shirt size={12} />}
                      {item.type === 'Medicine' && <Pill size={12} />}
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-bold">{item.desc}</td>
                  <td className="py-4 px-6 text-sm text-[var(--brand-grey-dark)]">{item.from}</td>
                  <td className="py-4 px-6 text-sm">
                    {item.status === 'Received' ? (
                      <span className="text-[var(--brand-success)] font-medium flex items-center gap-1"><CheckCircle2 size={16} /> Received</span>
                    ) : item.status === 'In Transit' ? (
                      <span className="text-[var(--brand-blue)] font-medium flex items-center gap-1"><Truck size={16} /> In Transit</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-1"><MapPin size={16} /> Pending</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-right">
                    <button className="text-[var(--brand-blue)] hover:underline font-medium">Update Status</button>
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
