import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OverviewPage from "./components/pages/Overview";
import SymptomAnalyzer from "./components/chatbots/SymptomAnalyzer";
import LifestyleAssistant from "./components/chatbots/LifestyleAssistant";
import PersonaAI from "./components/chatbots/PersonaAI";
import InsightsPage from "./components/pages/Insights";
import GoalsPage from "./components/pages/Goals";
import ReportsPage from "./components/pages/Reports";
import ProfileSettings from "./components/pages/Settings/components/ProfileSettings";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import NotificationsPage from "./components/pages/Notifications";
import History from "./components/pages/History";
import Symptoscan from "./components/pages/Symptoscan";
import LandingPage from "./components/pages/Landing/components/LandingPage";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import AuthPage from "./components/auth/AuthPage";
import SymptomScanProCard from "./components/pages/Symptoscan/SymptomScanProCard";

const queryClient = new QueryClient();

const user = { name: "Harshil" };
const onLogout = () => { alert("Logged out"); };

function RequireAuth({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="sign-in" />} />
          <Route path="/register" element={<AuthPage mode="sign-up" />} />
          <Route
            path="/overview"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <OverviewPage />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/symptom"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <SymptomAnalyzer />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/lifestyle"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <LifestyleAssistant />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/persona"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <PersonaAI />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/insights"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <InsightsPage />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/goals"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <GoalsPage />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <ReportsPage />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <ProfileSettings />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
              <Layout user={user} onLogout={onLogout}>
                <NotificationsPage />
              </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <Layout user={user} onLogout={onLogout}>
                  <History />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/symptoscan"
            element={
              <RequireAuth>
                <Layout user={user} onLogout={onLogout}>
                  <Symptoscan />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/symptoscan/analyze"
            element={
              <RequireAuth>
                <Layout user={user} onLogout={onLogout}>
                  <SymptomScanProCard />
                </Layout>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
