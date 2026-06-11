import React from "react";
import { Moon, Sun, Monitor, Bell, Shield, Key } from "lucide-react";
import { useTheme } from "next-themes";

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-color)]">Settings</h1>
        <p className="text-[var(--brand-grey-dark)]">Manage your app preferences and security.</p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Monitor className="text-[var(--brand-blue)]" size={20} /> Appearance
          </h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setTheme('light')}
            className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-colors ${theme === 'light' ? 'border-[var(--brand-blue)] bg-[var(--brand-blue-tint)] text-[var(--brand-blue)]' : 'border-[var(--border-color)] hover:border-gray-300 text-[var(--brand-grey-dark)]'}`}
          >
            <Sun size={24} />
            <span className="font-medium">Light Mode</span>
          </button>
          
          <button 
            onClick={() => setTheme('dark')}
            className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-colors ${theme === 'dark' ? 'border-[var(--brand-blue)] bg-blue-500/10 text-[var(--brand-blue)]' : 'border-[var(--border-color)] hover:border-gray-700 text-[var(--brand-grey-dark)]'}`}
          >
            <Moon size={24} />
            <span className="font-medium">Dark Mode</span>
          </button>
          
          <button 
            onClick={() => setTheme('system')}
            className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-colors ${theme === 'system' ? 'border-[var(--brand-blue)] bg-[var(--brand-blue-tint)] dark:bg-blue-500/10 text-[var(--brand-blue)]' : 'border-[var(--border-color)] hover:border-gray-400 dark:hover:border-gray-600 text-[var(--brand-grey-dark)]'}`}
          >
            <Monitor size={24} />
            <span className="font-medium">System Sync</span>
          </button>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Shield className="text-[var(--brand-blue)]" size={20} /> Security
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-[var(--brand-grey-dark)]">Last changed 3 months ago</p>
            </div>
            <button className="btn-secondary py-2 text-sm">Change Password</button>
          </div>
          
          <div className="border-t border-[var(--border-color)] pt-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-[var(--brand-grey-dark)]">Add an extra layer of security to your account</p>
            </div>
            <button className="btn-primary py-2 text-sm">Enable 2FA</button>
          </div>
        </div>
      </div>
    </div>
  );
}
