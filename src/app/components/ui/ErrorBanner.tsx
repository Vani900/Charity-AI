import React from "react";

export function ErrorBanner({ error, onRetry }: { error: string; onRetry?: () => void }) {
  if (!error) return null;
  return (
    <div style={{ padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{ fontSize: 18 }}>⚠️</span>
      <div style={{ flex: 1, fontSize: 13, color: "#991B1B" }}>{error}</div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          style={{ background: "#DC2626", color: "white", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
