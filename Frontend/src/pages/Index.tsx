
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../components/pages/Landing/components/LandingPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProfileSetup from "../components/auth/ProfileSetup";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem("healthvitals_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      if (userData.profileComplete) {
        setCurrentView("overview");
      } else {
        setCurrentView("profile-setup");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("healthvitals_user", JSON.stringify(userData));
    if (userData.profileComplete) {
      setCurrentView("overview");
    } else {
      setCurrentView("profile-setup");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("healthvitals_user");
    setCurrentView("landing");
  };

  const handleProfileComplete = (profileData) => {
    const updatedUser = { ...user, ...profileData, profileComplete: true };
    setUser(updatedUser);
    localStorage.setItem("healthvitals_user", JSON.stringify(updatedUser));
    setCurrentView("overview");
  };

  if (currentView === "landing") {
    return <LandingPage onLogin={() => setCurrentView("login")} onRegister={() => setCurrentView("register")} />;
  }

  if (currentView === "login") {
    return <Login onLogin={handleLogin} onBack={() => setCurrentView("landing")} onRegister={() => setCurrentView("register")} />;
  }

  if (currentView === "register") {
    return <Register onRegister={handleLogin} onBack={() => setCurrentView("landing")} onLogin={() => setCurrentView("login")} />;
  }

  if (currentView === "profile-setup") {
    return <ProfileSetup user={user} onComplete={handleProfileComplete} />;
  }

  if (currentView === "overview") {
    return <OverviewPage />;
  }

  return null;
};

export default Index;
