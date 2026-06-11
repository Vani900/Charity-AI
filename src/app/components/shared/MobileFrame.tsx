import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div style={{
      width: 393,
      height: 852,
      background: "#000",
      borderRadius: 50,
      overflow: "hidden",
      border: "10px solid #1a1a1a",
      boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px #333",
      position: "relative",
      flexShrink: 0,
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 124,
        height: 36,
        background: "#000",
        borderRadius: 20,
        zIndex: 200,
      }} />
      <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}