import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Brain, 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  Users,
  Zap,
  ShieldCheck,
  Star,
  Lightbulb,
  Plus,
  Eye,
  Mic,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Timer,
  Apple,
  Dumbbell,
  Brain as BrainIcon,
  Sparkles,
  CheckCircle,
  MessageCircle,
  MoreHorizontal
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import QuickAccessCards from "./components/QuickAccessCards";
import QuickActionsCard from "./components/QuickActionsCard";
import AIHealthTips from "./components/AIHealthTips";
import TodaysActivities from "./components/TodaysActivities";
import WeeklyGoals from "./components/WeeklyGoals";
import RecentConversations from "./components/RecentConversations";
import RecentInsightsCard from "./components/RecentInsightsCard";

const OverviewPage = ({ user, setActiveTab, currentLanguage = "English", getText = (en, hi) => en }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Remove summaryCards, healthMetrics, weeklyActivity, topicsData, recentInsights, activeGoals, upcomingReminders, healthInsights, and any card or section that uses them.
  // Only keep cards/sections for AI Health Tips, Quick Actions, and Recent Conversations if they are software-only.

  const quickActions = [
    { title: getText("Start Voice Chat", "वॉयस चैट शुरू करें"), description: getText("Begin a new health conversation", "नई स्वास्थ्य बातचीत शुरू करें"), icon: Mic, color: "bg-blue-100", action: () => setActiveTab("symptom") },
    { title: getText("Log Vitals", "वाइटल लॉग करें"), description: getText("Record your health metrics", "अपने स्वास्थ्य मेट्रिक्स रिकॉर्ड करें"), icon: TrendingUp, color: "bg-green-100", action: () => setActiveTab("dashboard") },
    { title: getText("View Reports", "रिपोर्ट देखें"), description: getText("Access your health reports", "अपनी स्वास्थ्य रिपोर्ट एक्सेस करें"), icon: FileText, color: "bg-purple-100", action: () => setActiveTab("reports") },
    { title: getText("Check Goals", "लक्ष्य जांचें"), description: getText("Review your wellness goals", "अपने कल्याण लक्ष्यों की समीक्षा करें"), icon: Target, color: "bg-orange-100", action: () => setActiveTab("goals") },
    { title: getText("Settings", "सेटिंग्स"), description: getText("Manage your preferences", "अपनी प्राथमिकताएं प्रबंधित करें"), icon: Settings, color: "bg-gray-100", action: () => setActiveTab("settings") }
  ];

  const recentConversations = [
    {
      date: "2024-01-15",
      time: "10:30 AM",
      duration: getText("12 min", "12 मिनट"),
      sentiment: "positive",
      confidence: "85%",
      description: getText("Discussed recent blood pressure readings and medication adjustments.", "हाल की रक्तचाप रीडिंग और दवा समायोजन पर चर्चा की।"),
      topics: [getText("Blood Pressure", "रक्तचाप"), getText("Medication", "दवा"), getText("Exercise", "व्यायाम")]
    },
    {
      date: "2024-01-14",
      time: "3:45 PM",
      duration: getText("8 min", "8 मिनट"),
      sentiment: "neutral",
      confidence: "78%",
      description: getText("Talked about sleep quality issues and stress management techniques.", "नींद की गुणवत्ता के मुद्दों और तनाव प्रबंधन तकनीकों के बारे में बात की।"),
      topics: [getText("Sleep", "नींद"), getText("Stress", "तनाव"), getText("Nutrition", "पोषण")]
    },
    {
      date: "2024-01-13",
      time: "9:15 AM",
      duration: getText("15 min", "15 मिनट"),
      sentiment: "concerned",
      confidence: "72%",
      description: getText("Follow-up on previous symptoms and medication effectiveness.", "पिछले लक्षणों और दवा की प्रभावशीलता पर फॉलो-अप।"),
      topics: [getText("Symptoms", "लक्षण"), getText("Follow-up", "फॉलो-अप"), getText("Medication", "दवा")]
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // AI Health Tips data
  const aiHealthTips = [
    {
      icon: <Apple className="w-6 h-6 text-blue-400" />,
      category: 'Nutrition',
      tip: 'Based on your recent conversations, consider adding more leafy greens to your diet for better iron absorption.'
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-blue-400" />,
      category: 'Exercise',
      tip: 'Your step count is excellent! Try adding 10 minutes of strength training twice a week.'
    },
    {
      icon: <BrainIcon className="w-6 h-6 text-blue-400" />,
      category: 'Mental Health',
      tip: 'Your stress levels seem elevated. Consider trying 5-minute breathing exercises daily.'
    }
  ];

  // Add Dashboard's activities and recent conversations after AI Health Tips

  // Dashboard activities data
  const activities = [
    { label: "Morning Meditation", time: "7:00 AM", duration: "15 min", points: 25, done: true },
    { label: "Exercise Session", time: "8:30 AM", duration: "45 min", points: 50, done: true },
    { label: "Health Check-in", time: "2:00 PM", duration: "10 min", points: 20, done: false },
    { label: "Evening Walk", time: "6:30 PM", duration: "30 min", points: 35, done: false },
  ];

  // Dashboard recent conversations data (use this for the merged section)
  const dashboardRecentConversations = [
    {
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "12 min",
      sentiment: { label: "positive", color: "text-green-600", dot: "bg-green-400" },
      confidence: "85%",
      description: "Discussed recent blood pressure readings and medication adjustments.",
      tags: ["Blood Pressure", "Medication", "Exercise"],
    },
    {
      date: "2024-01-14",
      time: "3:45 PM",
      duration: "8 min",
      sentiment: { label: "neutral", color: "text-yellow-600", dot: "bg-yellow-400" },
      confidence: "78%",
      description: "Talked about sleep quality issues and stress management techniques.",
      tags: ["Sleep", "Stress", "Nutrition"],
    },
    {
      date: "2024-01-13",
      time: "9:15 AM",
      duration: "15 min",
      sentiment: { label: "concerned", color: "text-red-600", dot: "bg-red-400" },
      confidence: "72%",
      description: "Follow-up on previous symptoms and medication effectiveness.",
      tags: ["Symptoms", "Follow-up", "Medication"],
    },
    {
      date: "2024-01-12",
      time: "6:20 PM",
      duration: "10 min",
      sentiment: { label: "positive", color: "text-green-600", dot: "bg-green-400" },
      confidence: "88%",
      description: "Reviewed weekly exercise goals and discussed progress.",
      tags: ["Exercise", "Goals", "Progress"],
    },
  ];

  // Add weekly goals data (software/user-logged/AI-driven only)
  const weeklyGoals = [
    { label: "Exercise Sessions", value: 5, target: 5, color: "bg-green-500" },
    { label: "Meditation Minutes", value: 140, target: 150, color: "bg-blue-400" },
    // Add more user-logged/AI-driven goals as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">Overview</h1>
          <p className="text-lg text-gray-500 font-medium">Your daily health summary and quick actions</p>
        </div>
        {/* Quick Access Cards */}
        <QuickAccessCards setActiveTab={setActiveTab} getText={getText} />
        {/* Recent Insights & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RecentInsightsCard getText={getText} />
          <QuickActionsCard quickActions={quickActions} />
        </div>
        {/* AI Health Tips */}
        <AIHealthTips aiHealthTips={aiHealthTips} />
        {/* Dashboard: Today's Activities */}
        <TodaysActivities activities={activities} />
        {/* Dashboard: Weekly Goals */}
        <WeeklyGoals weeklyGoals={weeklyGoals} />
        {/* Dashboard: Recent Conversations */}
        <RecentConversations dashboardRecentConversations={dashboardRecentConversations} />
      </div>
    </div>
  );
};

export default OverviewPage;
