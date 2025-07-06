import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Globe,
  Mic,
  MicOff,
  LogOut,
  Bell,
  ChevronDown,
  Settings,
  Clock,
  Activity
} from "lucide-react";
import SymptomAnalyzer from "./chatbots/SymptomAnalyzer";
import LifestyleAssistant from "./chatbots/LifestyleAssistant";
import PersonaAI from "./chatbots/PersonaAI";
import ProfileSettings from "./ProfileSettings";
import CommonDashboard from "./dashboards/CommonDashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import GoalsPage from "./pages/GoalsPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import OverviewPage from "./pages/OverviewPage";
import InsightsPage from "./pages/InsightsPage";
import Sidebar from "./Sidebar";
import { useToast } from "@/hooks/use-toast";
import SettingsPage from "./pages/SettingsPage";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { toast } = useToast();

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? getText("Voice Disabled", "आवाज़ बंद") : getText("Voice Enabled", "आवाज़ चालू"),
      description: isVoiceEnabled ? getText("Voice assistant turned off", "आवाज़ सहायक बंद कर दिया गया") : getText("Voice assistant is now active", "आवाज़ सहायक अब सक्रिय है"),
    });
  };

  const handleLanguageToggle = () => {
    const languages = ["English", "Hindi"];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    setCurrentLanguage(nextLanguage);
    toast({
      title: currentLanguage === "English" ? "Language Changed" : "भाषा बदली गई",
      description: currentLanguage === "English" ? `Interface language set to ${nextLanguage}` : `इंटरफेस भाषा ${nextLanguage === "English" ? "अंग्रेजी" : "हिंदी"} में सेट की गई`,
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getText = (englishText, hindiText) => {
    return currentLanguage === "English" ? englishText : hindiText;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage user={user} setActiveTab={setActiveTab} currentLanguage={currentLanguage} getText={getText} />;
      case "symptom":
        return <SymptomAnalyzer user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />;
      case "lifestyle":
        return <LifestyleAssistant user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />;
      case "persona":
        return <PersonaAI user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />;
      case "insights":
        return <InsightsPage user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "analytics":
        return <AnalyticsPage user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "goals":
        return <GoalsPage user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "reports":
        return <ReportsPage user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "dashboard":
        return <CommonDashboard user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "settings":
        return <SettingsPage user={user} currentLanguage={currentLanguage} getText={getText} />;
      case "notifications":
        return <NotificationsPage onBack={() => setActiveTab("overview")} currentLanguage={currentLanguage} getText={getText} />;
      default:
        return <OverviewPage user={user} setActiveTab={setActiveTab} currentLanguage={currentLanguage} getText={getText} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        currentLanguage={currentLanguage}
        getText={getText}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    HealthVitals-AI
                  </h1>
                  <p className="text-sm text-gray-600">
                    {getText(`Welcome back, ${user?.name}`, `वापसी पर स्वागत है, ${user?.name}`)}
                  </p>
                </div>
              </div>
              
              {/* Global Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVoice}
                  className={`${isVoiceEnabled ? 'bg-green-50 border-green-200' : 'border-gray-200'}`}
                >
                  {isVoiceEnabled ? <Mic className="w-4 h-4 text-green-600" /> : <MicOff className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLanguageToggle}>
                  <Globe className="w-4 h-4 mr-1" />
                  {currentLanguage === "English" ? "EN" : "हिं"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveTab("notifications")}
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white text-xs">3</Badge>
                </Button>
                
                {/* Fixed Profile Menu */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                        {getInitials(user?.name || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {getInitials(user?.name || "U")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{user?.name || "User"}</div>
                            <div className="text-sm text-gray-500">{user?.email || "user@healthvitals.com"}</div>
                            <div className="text-xs text-gray-400">{getText("Healthcare Professional", "स्वास्थ्य सेवा पेशेवर")}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => {setActiveTab("settings"); setShowProfileMenu(false);}}>
                          <Settings className="w-4 h-4 mr-2" />
                          {getText("Settings & Preferences", "सेटिंग्स और प्राथमिकताएं")}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Clock className="w-4 h-4 mr-2" />
                          {getText("Privacy Controls", "गोपनीयता नियंत्रण")}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Mic className="w-4 h-4 mr-2" />
                          {getText("Voice Settings", "आवाज़ सेटिंग्स")}
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Activity className="w-4 h-4 mr-2" />
                          {getText("Help & Support", "सहायता और समर्थन")}
                        </Button>
                        <div className="border-t mt-2 pt-2">
                          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600" onClick={onLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            {getText("Sign Out", "साइन आउट")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
