
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "./app/context/ToastContext";
import App from "./app/App.tsx";
import "./styles/index.css";
import { store } from "./store/store";
import { ErrorBoundary } from "./app/components/shared/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "mock_client_id_for_fallback_testing"}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </GoogleOAuthProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
  