import React, { Suspense } from "react";
import { useNavigate } from "react-router";
import { screenRegistry, moduleColors } from "../screens/registry";

const SCALE = 0.33;
const THUMB_W = Math.round(393 * SCALE);
const THUMB_H = Math.round(852 * SCALE);

export default function Gallery() {
  const navigate = useNavigate();

  const modules = ["Auth", "User", "NGO", "Admin", "Final"] as const;

  return (
    <div style={{ background: "#080C14", minHeight: "100vh", padding: "40px 24px 60px", fontFamily: '-apple-system,"SF Pro Display",sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⛓️</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#FFFFFF", letterSpacing: -1 }}>CharityChain AI</div>
        </div>
        <div style={{ fontSize: 16, color: "#475569", marginBottom: 6 }}>Smart Multi-Resource Donation App</div>
        <div style={{ fontSize: 14, color: "#334155" }}>50 Screens • Complete Mobile UI Kit</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          {modules.map((m) => {
            const count = screenRegistry.filter((s) => s.module === m).length;
            return (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: "#0F172A", border: `1px solid ${moduleColors[m]}40` }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: moduleColors[m] }} />
                <span style={{ fontSize: 12, color: moduleColors[m], fontWeight: 600 }}>{m}</span>
                <span style={{ fontSize: 11, color: "#475569" }}>{count} screens</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {modules.map((module) => {
        const screens = screenRegistry.filter((s) => s.module === module);
        return (
          <div key={module} style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 24, background: moduleColors[module], borderRadius: 2 }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>{module} Flow</span>
              <span style={{ fontSize: 13, color: "#475569" }}>— {screens.length} screens</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {screens.map((screen) => (
                <div
                  key={screen.id}
                  onClick={() => navigate(`/screen/${screen.id}`)}
                  style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                >
                  <div style={{
                    width: THUMB_W,
                    height: THUMB_H,
                    overflow: "hidden",
                    borderRadius: 14,
                    border: "2px solid #1E293B",
                    position: "relative",
                    transition: "transform 0.2s, border-color 0.2s",
                    background: "#111",
                    flexShrink: 0,
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = moduleColors[module];
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#1E293B";
                    }}
                  >
                    <div style={{
                      width: 393,
                      height: 852,
                      transformOrigin: "top left",
                      transform: `scale(${SCALE})`,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}>
                      <Suspense fallback={<div style={{ width: 393, height: 852, background: "#111" }} />}>
                        <screen.Component />
                      </Suspense>
                    </div>
                    {/* Screen number badge */}
                    <div style={{ position: "absolute", top: 6, left: 6, background: moduleColors[module], color: "white", width: 22, height: 22, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, zIndex: 10 }}>
                      {screen.id}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#64748B", textAlign: "center", maxWidth: THUMB_W, lineHeight: 1.3 }}>
                    {screen.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 13, color: "#334155" }}>⛓ Powered by Blockchain Technology • CharityChain AI v2.4.1</div>
      </div>
    </div>
  );
}