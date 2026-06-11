import React from "react";
import { BarChart3, TrendingUp, Package, Shirt, Heart, Pill, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const multiResourceData = [
  { month: 'Jan', money: 4000, food: 2400, clothes: 2400, medicine: 800 },
  { month: 'Feb', money: 3000, food: 1398, clothes: 2210, medicine: 900 },
  { month: 'Mar', money: 2000, food: 9800, clothes: 2290, medicine: 1200 },
  { month: 'Apr', money: 2780, food: 3908, clothes: 2000, medicine: 2500 },
  { month: 'May', money: 1890, food: 4800, clothes: 2181, medicine: 4000 },
  { month: 'Jun', money: 2390, food: 3800, clothes: 2500, medicine: 3800 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <BarChart3 className="text-[var(--brand-blue)]" /> Deep Analytics
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Comprehensive breakdown of all resource contributions.</p>
        </div>
        <select className="input-field py-2 text-sm bg-white dark:bg-[#1A1A1A]">
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card-surface p-4 text-center">
          <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
          <p className="text-xs text-[var(--brand-grey-dark)] font-medium">Monetary (USD)</p>
          <p className="text-xl font-bold">$16,060</p>
        </div>
        <div className="card-surface p-4 text-center">
          <Package className="w-8 h-8 mx-auto text-orange-500 mb-2" />
          <p className="text-xs text-[var(--brand-grey-dark)] font-medium">Food (Lbs)</p>
          <p className="text-xl font-bold">26,106</p>
        </div>
        <div className="card-surface p-4 text-center">
          <Shirt className="w-8 h-8 mx-auto text-blue-500 mb-2" />
          <p className="text-xs text-[var(--brand-grey-dark)] font-medium">Clothes (Items)</p>
          <p className="text-xl font-bold">13,581</p>
        </div>
        <div className="card-surface p-4 text-center">
          <Pill className="w-8 h-8 mx-auto text-green-500 mb-2" />
          <p className="text-xs text-[var(--brand-grey-dark)] font-medium">Medicine (Kits)</p>
          <p className="text-xl font-bold">13,200</p>
        </div>
        <div className="card-surface p-4 text-center">
          <BookOpen className="w-8 h-8 mx-auto text-purple-500 mb-2" />
          <p className="text-xs text-[var(--brand-grey-dark)] font-medium">Books</p>
          <p className="text-xl font-bold">4,200</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-surface p-6 h-[400px]">
          <h2 className="text-lg font-bold mb-6">Multi-Resource Contribution Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiResourceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="money" name="Money (USD)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="food" name="Food (Lbs)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="medicine" name="Medicine" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-surface p-6 h-[400px]">
          <h2 className="text-lg font-bold mb-6">Resource Distribution by Category</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={multiResourceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="clothes" name="Clothes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="books" name="Books" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
