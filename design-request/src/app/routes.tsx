import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { SettingsLayout } from "./components/layouts/SettingsLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { CustomerScreening } from "./pages/CustomerScreening";
import { TransactionMonitoring } from "./pages/TransactionMonitoring";
import { RiskScoring } from "./pages/RiskScoring";
import { CaseManagement } from "./pages/CaseManagement";
import { AdverseMedia } from "./pages/AdverseMedia";
import { Watchlists } from "./pages/Watchlists";
import { Reports } from "./pages/Reports";
import { DeveloperPortal } from "./pages/DeveloperPortal";
import { AuditLogs } from "./pages/AuditLogs";
import { Profile } from "./pages/settings/Profile";
import { Notifications } from "./pages/settings/Notifications";
import { Security } from "./pages/settings/Security";
import { Privacy } from "./pages/settings/Privacy";
import { Appearance } from "./pages/settings/Appearance";
import { Integrations } from "./pages/settings/Integrations";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customer-screening",
        element: <CustomerScreening />,
      },
      {
        path: "transaction-monitoring",
        element: <TransactionMonitoring />,
      },
      {
        path: "risk-scoring",
        element: <RiskScoring />,
      },
      {
        path: "case-management",
        element: <CaseManagement />,
      },
      {
        path: "adverse-media",
        element: <AdverseMedia />,
      },
      {
        path: "watchlists",
        element: <Watchlists />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "developer-portal",
        element: <DeveloperPortal />,
      },
      {
        path: "audit-logs",
        element: <AuditLogs />,
      },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "privacy",
            element: <Privacy />,
          },
          {
            path: "appearance",
            element: <Appearance />,
          },
          {
            path: "integrations",
            element: <Integrations />,
          },
        ],
      },
    ],
  },
]);