import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Camera, Mail, Phone, MapPin, Building, Calendar, Shield, Save } from "lucide-react";

export function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">My Profile</h1>
          <p className="text-[var(--brand-grey-dark)]">Manage your personal information and preferences.</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <><Save size={18} /> Save Changes</> : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Profile Card */}
        <div className="card-surface p-6 flex flex-col items-center text-center lg:col-span-1">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-[var(--brand-blue-tint)] dark:bg-blue-500/10 text-[var(--brand-blue)] flex items-center justify-center text-5xl font-bold border-4 border-white dark:border-[#1A1A1A] shadow-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-[var(--brand-blue)] text-white rounded-full shadow-md hover:bg-[var(--brand-blue-light)] transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold mb-1">{user?.name || "User Name"}</h2>
          <p className="text-[var(--brand-grey-dark)] mb-4">{user?.email}</p>
          
          <div className="w-full flex items-center justify-center gap-2 py-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium mb-6 border border-green-100 dark:border-green-800">
            <Shield size={16} /> Verified {user?.role === 'ngo' ? 'NGO Partner' : 'Donor'}
          </div>

          <div className="w-full text-left space-y-4 border-t border-[var(--border-color)] pt-6">
            <h3 className="font-semibold text-sm text-[var(--brand-grey-dark)] uppercase tracking-wider mb-2">Account Info</h3>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-[var(--brand-grey-dark)]" />
              <span>Joined May 2026</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building size={16} className="text-[var(--brand-grey-dark)]" />
              <span>{user?.role === 'ngo' ? 'Organization Account' : 'Individual Account'}</span>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="card-surface p-6 lg:col-span-2">
          <h3 className="text-lg font-bold mb-6">Personal Information</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  defaultValue={user?.name || ""}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                  <input 
                    type="email" 
                    className="input-field pl-10" 
                    defaultValue={user?.email || ""}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                  <input 
                    type="tel" 
                    className="input-field pl-10" 
                    defaultValue="+1 (555) 000-0000"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-grey-dark)] h-4 w-4" />
                  <input 
                    type="text" 
                    className="input-field pl-10" 
                    defaultValue="San Francisco, CA"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border-color)] pt-6 mt-8">
              <h3 className="text-lg font-bold mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--brand-grey-bg)] dark:hover:bg-[#1A1A1A] transition-colors">
                  <div>
                    <h4 className="font-medium text-sm">Donation Updates</h4>
                    <p className="text-xs text-[var(--brand-grey-dark)]">Get notified when your donation is delivered.</p>
                  </div>
                  <input type="checkbox" defaultChecked disabled={!isEditing} className="w-5 h-5 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                </label>
                
                <label className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--brand-grey-bg)] dark:hover:bg-[#1A1A1A] transition-colors">
                  <div>
                    <h4 className="font-medium text-sm">Urgent Campaigns</h4>
                    <p className="text-xs text-[var(--brand-grey-dark)]">Receive alerts for critical AI-matched campaigns.</p>
                  </div>
                  <input type="checkbox" defaultChecked disabled={!isEditing} className="w-5 h-5 rounded border-gray-300 text-[var(--brand-blue)] focus:ring-[var(--brand-blue)]" />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
