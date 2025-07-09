import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OverviewPage from "./components/pages/OverviewPage";
import Dashboard from "./components/Dashboard";
import SymptomAnalyzer from "./components/chatbots/SymptomAnalyzer";
import LifestyleAssistant from "./components/chatbots/LifestyleAssistant";
import PersonaAI from "./components/chatbots/PersonaAI";
import InsightsPage from "./components/pages/InsightsPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import GoalsPage from "./components/pages/GoalsPage";
import ReportsPage from "./components/pages/ReportsPage";
import ProfileSettings from "./components/ProfileSettings";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import NotificationsPage from "./components/pages/NotificationsPage";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
