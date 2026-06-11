import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "missing_client_id";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
