import React from "react";
import { Signal, Wifi, Battery } from "lucide-react";

interface StatusBarProps {
  light?: boolean;
}

export function StatusBar({ light = false }: StatusBarProps) {
  const color = light ? "#FFFFFF" : "#111111";
  return (
    <div style={{ height: 54, display: "flex", alignItems: "flex-end", paddingBottom: 8, paddingLeft: 20, paddingRight: 20, paddingTop: 0, position: "relative" }}>
      <span style={{ color, fontSize: 15, fontWeight: 600, letterSpacing: -0.3 }}>9:41</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Signal size={15} color={color} />
        <Wifi size={15} color={color} />
        <Battery size={15} color={color} />
      </div>
    </div>
  );
}