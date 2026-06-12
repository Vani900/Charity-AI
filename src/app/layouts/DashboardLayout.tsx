import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  Heart, 
  LayoutDashboard, 
  List, 
  Settings, 
  User as UserIcon, 
  LogOut,
  Menu,
  X,
  Target,
  BrainCircuit,
  Link as LinkIcon,
  Users,
  FileSpreadsheet,
  Bell
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Donate Funds", path: "/dashboard/donate-money", icon: Heart },
    { name: "Donate Food", path: "/dashboard/donate-food", icon: Heart },
    { name: "Donate Clothes", path: "/dashboard/donate-clothes", icon: Heart },
    { name: "My Donations", path: "/dashboard/donations", icon: List },
    { name: "Tracking", path: "/dashboard/tracking", icon: LinkIcon },
    { name: "Analytics", path: "/dashboard/analytics", icon: FileSpreadsheet },
    { name: "Campaigns", path: "/dashboard/campaigns", icon: Target },
    { name: "NGOs", path: "/dashboard/ngos", icon: Users },
    { name: "AI Insights", path: "/dashboard/ai-insights", icon: BrainCircuit },
    { name: "Profile", path: "/dashboard/profile", icon: UserIcon },
  ];

  // Role-specific routing logic
  if (user?.role === "ngo") {
    // NGO gets Campaign Management and Inventory
    navItems.splice(4, 0, { name: "Manage Campaigns", path: "/dashboard/ngo/campaigns", icon: Target });
    navItems.splice(5, 0, { name: "Inventory", path: "/dashboard/ngo/inventory", icon: List });
    
    // Hide 'Make a Donation' for NGOs if needed, but keeping it is fine as NGOs can also donate.
  }

  if (user?.role === "admin") {
    navItems.push({ name: "Admin Panel", path: "/admin", icon: Settings });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--card-bg)] border-r border-[var(--border-color)] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-color)]">
          <Link to="/" className="flex items-center gap-2 text-[var(--brand-blue)]">
            <Heart className="h-6 w-6 fill-current" />
            <span className="font-bold text-lg text-[var(--text-color)]">Charity AI</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[var(--text-color)]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-[var(--brand-blue-tint)] text-[var(--brand-blue)] font-medium" 
                      : "text-[var(--text-color)] hover:bg-[var(--brand-grey-bg)]"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[var(--border-color)] pt-4 mt-4">
            <Link 
              to="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className="block px-4 py-3 mb-2 rounded-xl hover:bg-[var(--brand-grey-bg)] dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
            >
              <p className="text-sm font-semibold text-[var(--text-color)] truncate group-hover:text-[var(--brand-blue)] transition-colors">{user?.name || "User"}</p>
              <p className="text-xs text-[var(--brand-grey-dark)] truncate">{user?.email}</p>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[var(--card-bg)] border-b border-[var(--border-color)] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-[var(--text-color)]"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto relative">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="relative p-2 text-[var(--brand-grey-dark)] hover:text-[var(--text-color)] transition-colors focus:outline-none cursor-pointer"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--card-bg)]"></span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-[var(--border-color)]">
                    <h4 className="font-bold text-sm text-[var(--text-color)]">Notifications</h4>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-[var(--brand-blue)] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    <div 
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/dashboard/donations");
                      }}
                      className="flex gap-3 text-xs p-2.5 hover:bg-[var(--brand-grey-bg)] rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-blue)] mt-1 shrink-0 animate-pulse" />
                      <div>
                        <p className="font-semibold text-[var(--text-color)]">AI Smart Match Successful</p>
                        <p className="text-[var(--brand-grey-dark)] mt-0.5">Your clothing donation is matched with ClothesForAll NGO.</p>
                        <p className="text-[var(--brand-grey-dark)] text-[10px] mt-1">2 mins ago</p>
                      </div>
                    </div>
                    <div 
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/dashboard/tracking");
                      }}
                      className="flex gap-3 text-xs p-2.5 hover:bg-[var(--brand-grey-bg)] rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-blue)] mt-1 shrink-0 animate-pulse" />
                      <div>
                        <p className="font-semibold text-[var(--text-color)]">Donation Picked Up!</p>
                        <p className="text-[var(--brand-grey-dark)] mt-0.5">Chennai Food Bank courier has collected your food package.</p>
                        <p className="text-[var(--brand-grey-dark)] text-[10px] mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="h-8 w-8 rounded-full bg-[var(--brand-blue)] flex items-center justify-center text-white font-medium shadow-md hover:scale-105 transition-transform focus:outline-none cursor-pointer"
              >
                {user?.name?.charAt(0) || "U"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200 text-left">
                  <div className="px-4 py-2.5 border-b border-[var(--border-color)]">
                    <p className="text-xs font-bold text-[var(--text-color)] truncate">{user?.name || "User"}</p>
                    <p className="text-[10px] text-[var(--brand-grey-dark)] truncate">{user?.email}</p>
                  </div>
                  <Link 
                    to="/dashboard/profile" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[var(--text-color)] hover:bg-[var(--brand-grey-bg)] transition-colors"
                  >
                    <UserIcon size={14} /> My Profile
                  </Link>
                  <Link 
                    to="/dashboard/settings" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[var(--text-color)] hover:bg-[var(--brand-grey-bg)] transition-colors"
                  >
                    <Settings size={14} /> Settings
                  </Link>
                  <button 
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left border-t border-[var(--border-color)] mt-1.5 bg-transparent border-none cursor-pointer"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
