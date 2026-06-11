import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Shared
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";

// Lazy-loaded Pages
const LandingPage = lazy(() => import("./pages/public/LandingPage").then(m => ({ default: m.LandingPage })));
const About = lazy(() => import("./pages/public/About").then(m => ({ default: m.About })));
const Contact = lazy(() => import("./pages/public/Contact").then(m => ({ default: m.Contact })));

const Login = lazy(() => import("./pages/auth/Login").then(m => ({ default: m.Login })));
const Register = lazy(() => import("./pages/auth/Register").then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword").then(m => ({ default: m.ForgotPassword })));

const Overview = lazy(() => import("./pages/dashboard/Overview").then(m => ({ default: m.Overview })));
const DonateMoney = lazy(() => import("./pages/dashboard/DonateMoney").then(m => ({ default: m.DonateMoney })));
const DonateFood = lazy(() => import("./pages/dashboard/DonateFood").then(m => ({ default: m.DonateFood })));
const DonateClothes = lazy(() => import("./pages/dashboard/DonateClothes").then(m => ({ default: m.DonateClothes })));
const DonateBooks = lazy(() => import("./pages/dashboard/DonateBooks").then(m => ({ default: m.DonateBooks })));
const DonateMedicine = lazy(() => import("./pages/dashboard/DonateMedicine").then(m => ({ default: m.DonateMedicine })));
const Donations = lazy(() => import("./pages/dashboard/Donations").then(m => ({ default: m.Donations })));
const DonationTracking = lazy(() => import("./pages/dashboard/DonationTracking").then(m => ({ default: m.DonationTracking })));
const Analytics = lazy(() => import("./pages/dashboard/Analytics").then(m => ({ default: m.Analytics })));
const NGOs = lazy(() => import("./pages/dashboard/NGOs").then(m => ({ default: m.NGOs })));
const Campaigns = lazy(() => import("./pages/dashboard/Campaigns").then(m => ({ default: m.Campaigns })));
const AiInsights = lazy(() => import("./pages/dashboard/AiInsights").then(m => ({ default: m.AiInsights })));
const BlockchainLedger = lazy(() => import("./pages/dashboard/BlockchainLedger").then(m => ({ default: m.BlockchainLedger })));
const Beneficiaries = lazy(() => import("./pages/dashboard/Beneficiaries").then(m => ({ default: m.Beneficiaries })));
const Reports = lazy(() => import("./pages/dashboard/Reports").then(m => ({ default: m.Reports })));
const Profile = lazy(() => import("./pages/dashboard/Profile").then(m => ({ default: m.Profile })));
const Settings = lazy(() => import("./pages/dashboard/Settings").then(m => ({ default: m.Settings })));

const ManageCampaigns = lazy(() => import("./pages/ngo/ManageCampaigns").then(m => ({ default: m.ManageCampaigns })));
const Inventory = lazy(() => import("./pages/ngo/Inventory").then(m => ({ default: m.Inventory })));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel").then(m => ({ default: m.AdminPanel })));

const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

// Suspense wrapper
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[var(--bg-color)]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand-blue)]"></div></div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: withSuspense(LandingPage) },
      { path: "about", element: withSuspense(About) },
      { path: "contact", element: withSuspense(Contact) },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: withSuspense(Login) },
      { path: "register", element: withSuspense(Register) },
      { path: "forgot-password", element: withSuspense(ForgotPassword) },
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(Overview) },
      { path: "donate-money", element: withSuspense(DonateMoney) },
      { path: "donate-food", element: withSuspense(DonateFood) },
      { path: "donate-clothes", element: withSuspense(DonateClothes) },
      { path: "donate-books", element: withSuspense(DonateBooks) },
      { path: "donate-medicine", element: withSuspense(DonateMedicine) },
      { path: "donations", element: withSuspense(Donations) },
      { path: "tracking", element: withSuspense(DonationTracking) },
      { path: "analytics", element: withSuspense(Analytics) },
      { path: "ngos", element: withSuspense(NGOs) },
      { path: "campaigns", element: withSuspense(Campaigns) },
      { path: "ai-insights", element: withSuspense(AiInsights) },
      { path: "blockchain", element: withSuspense(BlockchainLedger) },
      { path: "beneficiaries", element: withSuspense(Beneficiaries) },
      { path: "reports", element: withSuspense(Reports) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "settings", element: withSuspense(Settings) },
      { path: "ngo/campaigns", element: withSuspense(ManageCampaigns) },
      { path: "ngo/inventory", element: withSuspense(Inventory) },
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(AdminPanel) }
    ]
  },
  { path: "*", element: withSuspense(NotFound) },
]);
