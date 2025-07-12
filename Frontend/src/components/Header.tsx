import { useState } from "react";
import { Heart, LogOut, Mic, MicOff, Globe, Menu, Bell, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Images/logo.png";

const Header = ({ user, onLogout, onMenuClick }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Example badge count
  const navigate = useNavigate();

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const handleLanguageToggle = () => {
    setCurrentLanguage(currentLanguage === "English" ? "Hindi" : "English");
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleNotificationClick = () => {
    // Navigate to notifications page or open modal
    navigate("/notifications");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-md rounded-b-2xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="mr-2 p-2 rounded-lg hover:bg-blue-50 transition hidden md:inline-flex"
            title="Toggle Sidebar"
          >
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-md object-contain bg-white" />
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent tracking-tight">
              HealthVitals-AI
            </h1>
            <p className="text-sm text-gray-500 font-medium">Welcome back, {user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleVoice}
            className={`${isVoiceEnabled ? 'bg-green-50 border-green-200' : 'border-gray-200'} border rounded-lg p-2 transition hover:bg-green-50`}
            title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
          >
            {isVoiceEnabled ? <Mic className="w-5 h-5 text-green-600" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={handleLanguageToggle}
            className="border border-gray-200 rounded-lg p-2 flex items-center transition hover:bg-blue-50"
            title="Change Language"
          >
            <Globe className="w-5 h-5 mr-1" />
            <span className="font-semibold text-xs">{currentLanguage === "English" ? "EN" : "हि"}</span>
          </button>
          <button
            onClick={handleNotificationClick}
            className="border border-gray-200 rounded-lg p-2 relative transition hover:bg-blue-50"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white text-xs shadow">{notificationCount}</Badge>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg p-2 transition hover:bg-blue-50"
              title="User Menu"
            >
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shadow">
                <span className="text-blue-700 text-base font-bold">{getInitials(user?.name || "U")}</span>
              </div>
              <ChevronDown className="w-5 h-5" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
                <div className="p-4 border-b">
                  <div className="font-semibold">{user?.name || "User"}</div>
                  <div className="text-sm text-gray-500">{user?.email || "user@healthvitals.com"}</div>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-50" onClick={() => {navigate("/settings"); setShowProfileMenu(false);}}>Settings</button>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-50" onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 