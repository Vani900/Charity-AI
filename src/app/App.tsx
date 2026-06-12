import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeProvider";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
