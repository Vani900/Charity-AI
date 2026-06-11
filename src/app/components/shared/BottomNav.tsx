import React from "react";
import { Home, Compass, Clock, User, Plus } from "lucide-react";
import { useNavigate } from "react-router";

interface BottomNavProps {
  active?: "home" | "explore" | "history" | "profile";
  dark?: boolean;
}

function NavItem({ icon, label, active, color, onClick }: { icon: React.ReactNode; label: string; active: boolean; color: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", background: "none", border: "none" }}>
      <div style={{ color: active ? "#2563EB" : color }}>{icon}</div>
      <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? "#2563EB" : color }}>{label}</span>
    </button>
  );
}

export function BottomNav({ active = "home", dark = false }: BottomNavProps) {
  const navigate = useNavigate();
  const bg = dark ? "#1C1C1E" : "#FFFFFF";
  const border = dark ? "#2A2A2E" : "#E5E7EB";
  const inactiveColor = dark ? "#6B7280" : "#9CA3AF";

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 80,
      background: bg,
      borderTop: `1px solid ${border}`,
      display: "flex", alignItems: "center",
      paddingBottom: 18,
      paddingLeft: 8, paddingRight: 8,
    }}>
      <NavItem icon={<Home size={22} />} label="Home" active={active === "home"} color={inactiveColor} onClick={() => navigate(dark ? "/ngo/home" : "/donor/home")} />
      <NavItem icon={<Compass size={22} />} label="Explore" active={active === "explore"} color={inactiveColor} onClick={() => navigate(dark ? "/ngo/donations" : "/donor/ngos/map")} />
      <button onClick={() => navigate(dark ? "/ngo/requirements/new" : "/donor/categories")} style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 0, cursor: "pointer", background: "none", border: "none" }}>
        <div style={{
          width: 56, height: 56,
          background: "#2563EB",
          borderRadius: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37,99,235,0.45)",
          marginTop: -18,
        }}>
          <Plus size={26} color="white" />
        </div>
      </button>
      <NavItem icon={<Clock size={22} />} label="History" active={active === "history"} color={inactiveColor} onClick={() => navigate(dark ? "/ngo/analytics" : "/donor/history")} />
      <NavItem icon={<User size={22} />} label="Profile" active={active === "profile"} color={inactiveColor} onClick={() => navigate(dark ? "/settings" : "/donor/profile")} />
    </div>
  );
}