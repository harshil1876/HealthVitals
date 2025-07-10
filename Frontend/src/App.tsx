import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OverviewPage from "./components/pages/Overview";
import Dashboard from "./components/pages/Overview/components/Dashboard";
import SymptomAnalyzer from "./components/pages/Overview/components/SymptomAnalyzer";
import LifestyleAssistant from "./components/pages/Overview/components/LifestyleAssistant";
import PersonaAI from "./components/pages/Overview/components/PersonaAI";
import InsightsPage from "./components/pages/Insights";
import AnalyticsPage from "./components/pages/Analytics";
import GoalsPage from "./components/pages/Goals";
import ReportsPage from "./components/pages/Reports";
import ProfileSettings from "./components/pages/Settings/components/ProfileSettings";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import NotificationsPage from "./components/pages/Notifications";
import History from "./components/pages/History";

const queryClient = new QueryClient();

const user = { name: "Harshil" };
const onLogout = () => { alert("Logged out"); };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout user={user} onLogout={onLogout}>
                <Navigate to="/overview" />
              </Layout>
            }
          />
          <Route
            path="/overview"
            element={
              <Layout user={user} onLogout={onLogout}>
                <OverviewPage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout user={user} onLogout={onLogout}>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/symptom"
            element={
              <Layout user={user} onLogout={onLogout}>
                <SymptomAnalyzer />
              </Layout>
            }
          />
          <Route
            path="/lifestyle"
            element={
              <Layout user={user} onLogout={onLogout}>
                <LifestyleAssistant />
              </Layout>
            }
          />
          <Route
            path="/persona"
            element={
              <Layout user={user} onLogout={onLogout}>
                <PersonaAI />
              </Layout>
            }
          />
          <Route
            path="/insights"
            element={
              <Layout user={user} onLogout={onLogout}>
                <InsightsPage />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout user={user} onLogout={onLogout}>
                <AnalyticsPage />
              </Layout>
            }
          />
          <Route
            path="/goals"
            element={
              <Layout user={user} onLogout={onLogout}>
                <GoalsPage />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout user={user} onLogout={onLogout}>
                <ReportsPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout user={user} onLogout={onLogout}>
                <ProfileSettings />
              </Layout>
            }
          />
          <Route
            path="/notifications"
            element={
              <Layout user={user} onLogout={onLogout}>
                <NotificationsPage />
              </Layout>
            }
          />
          <Route
            path="/history"
            element={
              <Layout user={user} onLogout={onLogout}>
                <History />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
