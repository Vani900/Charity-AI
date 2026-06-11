import React from "react";
import { BrainCircuit, Lightbulb, Zap, LineChart as LineChartIcon, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const predictionData = [
  { month: "Jan", actual: 4000, predicted: 4200 },
  { month: "Feb", actual: 3000, predicted: 3500 },
  { month: "Mar", actual: 5000, predicted: 4800 },
  { month: "Apr", actual: 4500, predicted: 5100 },
  { month: "May", actual: 6000, predicted: 6200 },
  { month: "Jun", actual: 5500, predicted: 6800 },
  { month: "Jul", actual: null, predicted: 7500 },
  { month: "Aug", actual: null, predicted: 8200 },
];

const categorySuccessRate = [
  { category: "Medical", success: 92 },
  { category: "Education", success: 85 },
  { category: "Disaster", success: 98 },
  { category: "Food", success: 88 },
  { category: "Housing", success: 75 },
];

export function AiInsights() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
            <BrainCircuit className="text-[var(--brand-blue)]" /> AI Insights Dashboard
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Predictive analytics, campaign success prediction, and funding gap analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-surface p-6 border-t-4 border-t-[var(--brand-blue)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-[var(--brand-blue)] rounded-lg">
              <Zap size={20} />
            </div>
            <h3 className="font-bold">Donation Prediction</h3>
          </div>
          <p className="text-3xl font-bold mb-2">$8,200</p>
          <p className="text-sm text-[var(--brand-grey-dark)]">Predicted volume for August 2026 based on historical and seasonal trends.</p>
        </div>

        <div className="card-surface p-6 border-t-4 border-t-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-lg">
              <LineChartIcon size={20} />
            </div>
            <h3 className="font-bold">Donor Behavior</h3>
          </div>
          <p className="text-3xl font-bold mb-2">+15%</p>
          <p className="text-sm text-[var(--brand-grey-dark)]">Increase in recurring donations over the last 90 days. High retention detected.</p>
        </div>

        <div className="card-surface p-6 border-t-4 border-t-yellow-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 rounded-lg">
              <Activity size={20} />
            </div>
            <h3 className="font-bold">Funding Gap</h3>
          </div>
          <p className="text-3xl font-bold mb-2">Critical</p>
          <p className="text-sm text-[var(--brand-grey-dark)]">Education campaigns are currently underfunded by 35% relative to historical averages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Chart */}
        <div className="card-surface p-6">
          <h3 className="text-lg font-bold mb-6">Donation Trend & AI Forecast</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--brand-grey-dark)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--brand-grey-dark)' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="actual" stroke="var(--brand-blue)" strokeWidth={3} dot={{ r: 4 }} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="#9333ea" strokeWidth={3} strokeDasharray="5 5" dot={false} name="Predicted Forecast" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Success Rates */}
        <div className="card-surface p-6">
          <h3 className="text-lg font-bold mb-6">Campaign Success Prediction by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySuccessRate} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--brand-grey-dark)' }} tickFormatter={(val) => `${val}%`} />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-color)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--brand-grey-bg)' }}
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Bar dataKey="success" fill="var(--brand-success)" radius={[0, 4, 4, 0]} name="Probability of reaching goal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-surface p-6 bg-gradient-to-br from-[var(--brand-blue-tint)] to-purple-50 dark:from-[#111] dark:to-purple-900/20 border-l-4 border-l-[var(--brand-blue)]">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm text-[var(--brand-blue)]">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-[var(--brand-dark)] dark:text-white">AI Strategy Recommendation</h3>
            <p className="text-sm text-[var(--brand-grey-dark)] leading-relaxed">
              Based on the recent surge in global medical supply searches and winter clothing requests, shifting resource allocation to highlight **Medical** and **Clothing** campaigns over the next 14 days has a <strong>92% probability</strong> of increasing overall donation volume (both physical goods and monetary equivalents) by 35%. Targeted email campaigns to previous donors in the "Disaster Relief" segment are highly recommended.
            </p>
            <button className="mt-4 btn-primary py-2 px-6 text-sm">Apply Strategy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
