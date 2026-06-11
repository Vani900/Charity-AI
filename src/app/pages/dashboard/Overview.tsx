import React from "react";
import { Link } from "react-router";
import { Heart, Target, Award, ArrowUpRight, ArrowDownRight, Package, Shirt, BookOpen, Pill, Building2, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Overview() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-[var(--brand-grey-dark)]">Here is what's happening with your impact today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/reports" className="btn-secondary">Export Report</Link>
          <Link to="/dashboard/donate-money" className="btn-primary flex items-center gap-2">
            <Heart size={18} /> Make Donation
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Link to="/dashboard/donate-money" className="card-surface p-4 hover:border-red-300 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500 group-hover:scale-110 transition-transform">
              <Heart size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Total Funds</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">$24,500</p>
        </Link>

        <Link to="/dashboard/donate-food" className="card-surface p-4 hover:border-orange-300 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 group-hover:scale-110 transition-transform">
              <Package size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Food Provided</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">12,450 lbs</p>
        </Link>

        <Link to="/dashboard/donate-clothes" className="card-surface p-4 hover:border-blue-300 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
              <Shirt size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Clothes Donated</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">4,820 Items</p>
        </Link>

        <Link to="/dashboard/donate-medicine" className="card-surface p-4 hover:border-green-300 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
              <Pill size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Medical Kits</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">850 Kits</p>
        </Link>

        <Link to="/dashboard/donate-books" className="card-surface p-4 hover:border-purple-300 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
              <BookOpen size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Books Donated</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">1,200 Books</p>
        </Link>

        <Link to="/dashboard/campaigns" className="card-surface p-4 hover:border-[var(--brand-blue)] transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-[var(--brand-blue)] group-hover:scale-110 transition-transform">
              <Target size={20} />
            </div>
          </div>
          <h3 className="text-[var(--brand-grey-dark)] text-xs font-medium mb-1">Active Campaigns</h3>
          <p className="text-xl font-bold text-[var(--text-color)]">14</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Insights Card */}
          <div className="card-surface p-6 bg-gradient-to-r from-[var(--brand-blue-tint)] to-white dark:from-[#1A1A1A] dark:to-[#222] border-l-4 border-l-[var(--brand-blue)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--brand-blue)] text-white rounded-lg">
                <Target size={20} />
              </div>
              <h2 className="text-lg font-bold">AI Recommended Actions</h2>
            </div>
            <p className="text-[var(--brand-grey-dark)] mb-4 leading-relaxed">
              Based on your previous donations, we found 3 urgent campaigns matching your profile. 
              <strong> The Syrian Refugee Relief Fund</strong> is currently in critical need of winter clothing and medical kits.
            </p>
            <Link to="/dashboard/ai-insights" className="text-[var(--brand-blue)] font-semibold hover:underline">
              View all AI insights &rarr;
            </Link>
          </div>

          {/* Recent Activity Table */}
          <div className="card-surface overflow-hidden">
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
              <h2 className="text-lg font-bold">Recent Donations</h2>
              <Link to="/dashboard/donations" className="text-sm font-medium text-[var(--brand-blue)] hover:underline">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--brand-grey-bg)] dark:bg-[#1A1A1A]">
                    <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Campaign / NGO</th>
                    <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Resource</th>
                    <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Date</th>
                    <th className="py-3 px-6 text-xs font-medium text-[var(--brand-grey-dark)] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {[
                    { campaign: "Global Food Initiative", resource: "50 lbs Food", date: "Today, 10:23 AM", status: "Delivered", color: "text-green-600", bg: "bg-green-100" },
                    { campaign: "Winter Warmth", resource: "10 Coats", date: "Yesterday", status: "In Transit", color: "text-blue-600", bg: "bg-blue-100" },
                    { campaign: "Disaster Relief Net", resource: "$500", date: "Oct 12, 2026", status: "Verified", color: "text-purple-600", bg: "bg-purple-100" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[var(--brand-grey-bg)]/50 dark:hover:bg-[#222]">
                      <td className="py-4 px-6 text-sm font-medium">{row.campaign}</td>
                      <td className="py-4 px-6 text-sm font-bold">{row.resource}</td>
                      <td className="py-4 px-6 text-sm text-[var(--brand-grey-dark)]">{row.date}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.bg} ${row.color} dark:bg-opacity-20`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Top NGOs */}
          <div className="card-surface p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Top Verified NGOs</h2>
              <Link to="/dashboard/ngos" className="text-sm text-[var(--brand-blue)] hover:underline">See all</Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "Disaster Relief Net", type: "Emergency Response" },
                { name: "Teach for All", type: "Education" },
                { name: "Global Food Initiative", type: "Food Security" },
              ].map((ngo, i) => (
                <Link to="/dashboard/ngos" key={i} className="flex items-center gap-3 p-2 hover:bg-[var(--brand-grey-bg)] dark:hover:bg-[#222] rounded-lg transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-grey-bg)] dark:bg-[#111] flex items-center justify-center text-[var(--brand-blue)] group-hover:scale-110 transition-transform">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{ngo.name}</h4>
                    <p className="text-xs text-[var(--brand-grey-dark)]">{ngo.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-surface p-6 bg-[var(--brand-dark)] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-blue)] opacity-20 blur-2xl rounded-full" />
            <h2 className="text-lg font-bold mb-4 relative z-10">Platform Impact</h2>
            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Users</p>
                <p className="text-xl font-bold">142,593</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Resources Donated</p>
                <p className="text-xl font-bold">2.4M Items</p>
              </div>
              <Link to="/dashboard/analytics" className="w-full mt-4 btn-primary bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm flex justify-center py-2">
                View Full Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
