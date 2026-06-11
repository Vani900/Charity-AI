import React, { Suspense } from "react";
import { useParams, useNavigate } from "react-router";
import { screenRegistry, moduleColors } from "../screens/registry";
import { MobileFrame } from "../components/shared/MobileFrame";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

export default function ScreenView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const screenId = parseInt(id || "1");
  const screen = screenRegistry.find((s) => s.id === screenId);
  const prev = screenRegistry.find((s) => s.id === screenId - 1);
  const next = screenRegistry.find((s) => s.id === screenId + 1);

  if (!screen) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#080C14" }}>
        <div style={{ color: "white", fontSize: 18 }}>Screen not found</div>
      </div>
    );
  }

  const moduleColor = moduleColors[screen.module];

  return (
    <div style={{
      background: "#080C14",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: '-apple-system,"SF Pro Display",sans-serif',
      padding: "0 0 40px",
    }}>
      {/* Top bar */}
      <div style={{ width: "100%", background: "#0F172A", borderBottom: "1px solid #1E293B", padding: "0 24px", display: "flex", alignItems: "center", height: 60, gap: 16 }}>
        <button
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
        >
          <Grid3X3 size={18} />
          Gallery
        </button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: moduleColor }} />
          <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{screen.module} Flow</span>
          <span style={{ color: "#475569" }}>·</span>
          <span style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 600 }}>{screen.name}</span>
        </div>
        <span style={{ color: "#475569", fontSize: 13 }}>{screenId} / 50</span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 48, flex: 1 }}>
        {/* Prev button */}
        <button
          onClick={() => prev && navigate(`/screen/${prev.id}`)}
          disabled={!prev}
          style={{
            width: 52, height: 52, borderRadius: 26,
            background: prev ? "#1E293B" : "transparent",
            border: prev ? "1px solid #334155" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: prev ? "pointer" : "default",
            opacity: prev ? 1 : 0.2,
          }}
        >
          <ChevronLeft size={24} color={prev ? "#94A3B8" : "#334155"} />
        </button>

        {/* Phone frame */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <MobileFrame>
            <Suspense fallback={<div style={{ width: 393, height: 852, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#444" }}>Loading...</div></div>}>
              <screen.Component />
            </Suspense>
          </MobileFrame>
          {/* Screen label */}
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#0F172A", borderRadius: 20, border: `1px solid ${moduleColor}30` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: moduleColor }}>#{String(screenId).padStart(2, "0")}</span>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>{screen.name}</span>
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={() => next && navigate(`/screen/${next.id}`)}
          disabled={!next}
          style={{
            width: 52, height: 52, borderRadius: 26,
            background: next ? "#1E293B" : "transparent",
            border: next ? "1px solid #334155" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: next ? "pointer" : "default",
            opacity: next ? 1 : 0.2,
          }}
        >
          <ChevronRight size={24} color={next ? "#94A3B8" : "#334155"} />
        </button>
      </div>

      {/* Bottom mini navigation */}
      <div style={{ marginTop: 32, display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", maxWidth: 600, padding: "0 20px" }}>
        {screenRegistry.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/screen/${s.id}`)}
            title={s.name}
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: s.id === screenId ? moduleColors[s.module] : "#1E293B",
              border: `1px solid ${s.id === screenId ? moduleColors[s.module] : "#334155"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              fontSize: 10, fontWeight: 700,
              color: s.id === screenId ? "white" : "#475569",
              transition: "all 0.15s",
            }}
          >
            {s.id}
          </div>
        ))}
      </div>
    </div>
  );
}