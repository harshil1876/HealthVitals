import { useState } from "react";
import { Heart, LogOut, Mic, MicOff, Globe, Menu, Bell, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="mr-2 p-2 rounded hover:bg-gray-100 hidden md:inline-flex"
            title="Toggle Sidebar"
          >
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthVitals-AI
            </h1>
            <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleVoice}
            className={`${isVoiceEnabled ? 'bg-green-50 border-green-200' : 'border-gray-200'} border rounded p-2`}
            title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
          >
            {isVoiceEnabled ? <Mic className="w-4 h-4 text-green-600" /> : <MicOff className="w-4 h-4" />}
          </button>
          <button
            onClick={handleLanguageToggle}
            className="border border-gray-200 rounded p-2 flex items-center"
            title="Change Language"
          >
            <Globe className="w-4 h-4 mr-1" />
            <span>{currentLanguage === "English" ? "EN" : "हि"}</span>
          </button>
          <button
            onClick={handleNotificationClick}
            className="border border-gray-200 rounded p-2 relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white text-xs">{notificationCount}</Badge>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 border border-gray-200 rounded p-2"
              title="User Menu"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 text-sm font-bold">{getInitials(user?.name || "U")}</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-4 border-b">
                  <div className="font-semibold">{user?.name || "User"}</div>
                  <div className="text-sm text-gray-500">{user?.email || "user@healthvitals.com"}</div>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => {navigate("/settings"); setShowProfileMenu(false);}}>Settings</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 