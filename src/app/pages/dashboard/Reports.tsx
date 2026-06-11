import React, { useState } from "react";
import { FileSpreadsheet, Download, FileText, FileJson, Calendar } from "lucide-react";

export function Reports() {
  const [reportType, setReportType] = useState("donation");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <FileSpreadsheet className="text-[var(--brand-blue)]" /> Reporting & Analytics
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Generate, view, and export comprehensive platform reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-surface p-6 lg:col-span-1 border-t-4 border-[var(--brand-blue)]">
          <h2 className="text-lg font-bold mb-4">Report Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Report Type</label>
              <select 
                className="input-field w-full"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="donation">Donation History & Trends</option>
                <option value="campaign">Campaign Performance</option>
                <option value="ngo">NGO Verification & Status</option>
                <option value="beneficiary">Beneficiary Impact Report</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                <select className="input-field w-full pl-9">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)]">
              <h3 className="text-sm font-medium mb-3">Export Format</h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex flex-col items-center gap-1 transition-colors">
                  <FileText size={20} />
                  <span className="text-xs font-bold">PDF</span>
                </button>
                <button className="flex-1 py-2 px-3 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg flex flex-col items-center gap-1 transition-colors">
                  <FileSpreadsheet size={20} />
                  <span className="text-xs font-bold">Excel</span>
                </button>
                <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex flex-col items-center gap-1 transition-colors">
                  <FileJson size={20} />
                  <span className="text-xs font-bold">CSV</span>
                </button>
              </div>
            </div>
            
            <button className="w-full btn-primary mt-4 flex justify-center items-center gap-2">
              <Download size={18} /> Generate & Download
            </button>
          </div>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Generated Report Preview</h2>
          <div className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A] rounded-xl p-4 h-[400px] flex flex-col font-mono text-sm overflow-hidden">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border-color)]">
              <span className="font-bold text-[var(--brand-blue)]">CHARITY_AI_{reportType.toUpperCase()}_REPORT</span>
              <span className="text-[var(--brand-grey-dark)]">Generated: 2026-05-31</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 text-gray-600 dark:text-gray-400">
              {reportType === "donation" && (
                <>
                  <p>ROW 1: TX-9021, 2026-05-31, $500, Global Food Initiative, SUCCESS</p>
                  <p>ROW 2: TX-9022, 2026-05-30, $150, Education for All, SUCCESS</p>
                  <p>ROW 3: TX-9023, 2026-05-28, $1200, Disaster Relief Fund, PENDING</p>
                  <p>ROW 4: TX-9024, 2026-05-25, $75, Local Animal Shelter, SUCCESS</p>
                  <p>SUMMARY: TOTAL_VOLUME=$1925.00, SUCCESS_RATE=75%</p>
                </>
              )}
              {reportType === "campaign" && (
                <>
                  <p>ROW 1: CAMP-101, Emergency Medical Relief, GOAL=$500000, RAISED=$450000</p>
                  <p>ROW 2: CAMP-102, Clean Water Wells, GOAL=$50000, RAISED=$28000</p>
                  <p>SUMMARY: TOTAL_ACTIVE=2, TOTAL_GOAL=$550000</p>
                </>
              )}
              {reportType !== "donation" && reportType !== "campaign" && (
                <p>Querying datastore for {reportType} metrics...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
