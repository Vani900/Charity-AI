import React, { useState } from "react";
import { Link as LinkIcon, ShieldCheck, FileText, ExternalLink, Search } from "lucide-react";

const mockLedger = [
  { block: 104523, hash: "0x3a9f2b8c9d4e7f1a...", from: "0xdonor1...", to: "0xngo_food...", amount: "$500.00", timestamp: "2 mins ago", status: "Verified" },
  { block: 104522, hash: "0x1c4d8e3a2f9b6c5d...", from: "0xngo_food...", to: "0xvendor_local...", amount: "$450.00", timestamp: "15 mins ago", status: "Verified" },
  { block: 104521, hash: "0x9d2a1c4b8e3f7a6c...", from: "0xdonor2...", to: "0xngo_water...", amount: "$1,200.00", timestamp: "1 hour ago", status: "Verified" },
  { block: 104520, hash: "0x4e7b9a1c2d3f8e5c...", from: "0xngo_water...", to: "0xvendor_pipe...", amount: "$1,100.00", timestamp: "3 hours ago", status: "Verified" },
  { block: 104519, hash: "0x8f3c5d7a9b1e2c4f...", from: "0xdonor3...", to: "0xngo_medical...", amount: "$75.00", timestamp: "5 hours ago", status: "Verified" },
  { block: 104518, hash: "0x2a1b3c4d5e6f7g8h...", from: "0xngo_medical...", to: "0xvendor_meds...", amount: "$70.00", timestamp: "1 day ago", status: "Verified" },
];

export function BlockchainLedger() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <LinkIcon className="text-[var(--brand-blue)]" /> Blockchain Ledger
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Immutable donation ledger, smart contract execution, and fund transparency.</p>
        </div>
        <button className="btn-secondary">
          <FileText size={18} /> Generate Transparency Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-surface p-6 flex flex-col justify-center items-center text-center">
          <ShieldCheck size={48} className="text-[var(--brand-success)] mb-4" />
          <h3 className="font-bold text-lg mb-1">100% Fund Integrity</h3>
          <p className="text-sm text-[var(--brand-grey-dark)]">All donations are secured via smart contracts ensuring funds are only released to verified vendors.</p>
        </div>
        <div className="card-surface p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-[var(--brand-blue)] mb-4">
            <span className="font-bold text-xl">1.2s</span>
          </div>
          <h3 className="font-bold text-lg mb-1">Block Time</h3>
          <p className="text-sm text-[var(--brand-grey-dark)]">Average time for a transaction to be permanently written to the ledger.</p>
        </div>
        <div className="card-surface p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <span className="font-bold text-xl">104k</span>
          </div>
          <h3 className="font-bold text-lg mb-1">Blocks Generated</h3>
          <p className="text-sm text-[var(--brand-grey-dark)]">Total immutable records safeguarding donor funds globally.</p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold">Public Explorer</h2>
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search by wallet address or Txn Hash..." 
              className="input-field py-2 pl-9 pr-4 text-sm w-full font-mono"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Block</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Txn Hash</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">From</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">To</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Amount</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Age</th>
                <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Verify</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {mockLedger.filter(l => l.hash.includes(searchTerm) || l.from.includes(searchTerm) || l.to.includes(searchTerm)).map((tx) => (
                <tr key={tx.block} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222] font-mono text-sm transition-colors">
                  <td className="py-4 px-6 text-[var(--brand-blue)] font-medium">#{tx.block}</td>
                  <td className="py-4 px-6 truncate max-w-[120px]" title={tx.hash}>{tx.hash}</td>
                  <td className="py-4 px-6 truncate max-w-[100px] text-gray-500" title={tx.from}>{tx.from}</td>
                  <td className="py-4 px-6 truncate max-w-[100px] text-gray-500" title={tx.to}>{tx.to}</td>
                  <td className="py-4 px-6 font-bold font-sans">{tx.amount}</td>
                  <td className="py-4 px-6 text-gray-500 font-sans text-xs">{tx.timestamp}</td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-1 text-[var(--brand-success)] font-sans text-xs font-bold hover:underline bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded">
                      <ShieldCheck size={12} /> {tx.status}
                    </button>
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
