
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastProvider } from "./app/context/ToastContext";
import App from "./app/App.tsx";
import "./styles/index.css";
import { store } from "./store/store";
import { ErrorBoundary } from "./app/components/shared/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
          <ToastProvider>
            <App />
          </ToastProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
  