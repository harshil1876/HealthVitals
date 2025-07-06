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
  Timer
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const OverviewPage = ({ user, setActiveTab, currentLanguage = "English", getText = (en, hi) => en }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Summary cards data
  const summaryCards = [
    {
      title: getText("Today's Summary", "आज का सारांश"),
      value: "8 activities",
      subtitle: getText("+2 from yesterday", "+2 कल से"),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: getText("Next Reminder", "अगली अनुस्मारक"),
      value: "2:30 PM",
      subtitle: getText("Medication time", "दवा का समय"),
      icon: Timer,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: getText("Health Score", "स्वास्थ्य स्कोर"),
      value: "86%",
      subtitle: getText("Excellent", "उत्कृष्ट"),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: getText("Current Streak", "वर्तमान स्ट्रीक"),
      value: getText("12 days", "12 दिन"),
      subtitle: getText("Keep it up!", "जारी रखें!"),
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const healthMetrics = [
    { day: 'Mon', wellness: 75, mood: 8, energy: 7, bloodPressure: 120, heartRate: 72 },
    { day: 'Tue', wellness: 82, mood: 9, energy: 8, bloodPressure: 118, heartRate: 70 },
    { day: 'Wed', wellness: 70, mood: 6, energy: 6, bloodPressure: 125, heartRate: 75 },
    { day: 'Thu', wellness: 88, mood: 9, energy: 9, bloodPressure: 115, heartRate: 68 },
    { day: 'Fri', wellness: 85, mood: 8, energy: 8, bloodPressure: 120, heartRate: 72 },
    { day: 'Sat', wellness: 92, mood: 10, energy: 9, bloodPressure: 112, heartRate: 65 },
    { day: 'Sun', wellness: 90, mood: 9, energy: 8, bloodPressure: 118, heartRate: 70 }
  ];

  const healthCategories = [
    { name: getText('Physical', 'शारीरिक'), value: 85, color: '#3b82f6' },
    { name: getText('Mental', 'मानसिक'), value: 78, color: '#10b981' },
    { name: getText('Emotional', 'भावनात्मक'), value: 82, color: '#8b5cf6' },
    { name: getText('Social', 'सामाजिक'), value: 72, color: '#f59e0b' }
  ];

  const weeklyActivity = [
    { day: 'Mon', steps: 8200, exercise: 30 },
    { day: 'Tue', steps: 9100, exercise: 45 },
    { day: 'Wed', steps: 7500, exercise: 20 },
    { day: 'Thu', steps: 10500, exercise: 60 },
    { day: 'Fri', steps: 9500, exercise: 40 },
    { day: 'Sat', steps: 12000, exercise: 90 },
    { day: 'Sun', steps: 8800, exercise: 35 }
  ];

  const topicsData = [
    { name: getText('Blood Pressure', 'रक्तचाप'), value: 25, color: '#3b82f6' },
    { name: getText('Medication', 'दवा'), value: 20, color: '#10b981' },
    { name: getText('Sleep', 'नींद'), value: 18, color: '#8b5cf6' },
    { name: getText('Exercise', 'व्यायाम'), value: 15, color: '#f59e0b' },
    { name: getText('Nutrition', 'पोषण'), value: 12, color: '#ef4444' },
    { name: getText('Stress', 'तनाव'), value: 10, color: '#8b5cf6' }
  ];

  const recentInsights = [
    {
      title: getText("Blood Pressure Improvement", "रक्तचाप में सुधार"),
      description: getText("Your blood pressure readings have shown consistent improvement over the past week.", "आपके रक्तचाप की रीडिंग में पिछले सप्ताह निरंतर सुधार दिखा है।"),
      time: getText("2 hours ago", "2 घंटे पहले"),
      priority: "HIGH",
      category: "health",
      icon: Heart,
      color: "bg-red-50 border-red-200"
    },
    {
      title: getText("Sleep Pattern Analysis", "नींद पैटर्न विश्लेषण"),
      description: getText("Your sleep quality has improved by 15% this week. Consider maintaining your current routine.", "आपकी नींद की गुणवत्ता इस सप्ताह 15% सुधार हुई है। अपनी वर्तमान दिनचर्या बनाए रखने पर विचार करें।"),
      time: getText("1 day ago", "1 दिन पहले"),
      priority: "MEDIUM",
      category: "wellness",
      icon: Clock,
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: getText("Medication Reminder", "दवा अनुस्मारक"),
      description: getText("Time to refill your monthly medication prescription.", "आपकी मासिक दवा की पर्ची को फिर से भरने का समय है।"),
      time: getText("3 days ago", "3 दिन पहले"),
      priority: "HIGH",
      category: "medication",
      icon: Activity,
      color: "bg-red-50 border-red-200"
    }
  ];

  const quickActions = [
    { title: getText("Start Voice Chat", "वॉयस चैट शुरू करें"), description: getText("Begin a new health conversation", "नई स्वास्थ्य बातचीत शुरू करें"), icon: Mic, color: "bg-blue-100", action: () => setActiveTab("symptom") },
    { title: getText("Log Vitals", "वाइटल लॉग करें"), description: getText("Record your health metrics", "अपने स्वास्थ्य मेट्रिक्स रिकॉर्ड करें"), icon: TrendingUp, color: "bg-green-100", action: () => setActiveTab("dashboard") },
    { title: getText("View Reports", "रिपोर्ट देखें"), description: getText("Access your health reports", "अपनी स्वास्थ्य रिपोर्ट एक्सेस करें"), icon: FileText, color: "bg-purple-100", action: () => setActiveTab("reports") },
    { title: getText("Check Goals", "लक्ष्य जांचें"), description: getText("Review your wellness goals", "अपने कल्याण लक्ष्यों की समीक्षा करें"), icon: Target, color: "bg-orange-100", action: () => setActiveTab("goals") },
    { title: getText("Settings", "सेटिंग्स"), description: getText("Manage your preferences", "अपनी प्राथमिकताएं प्रबंधित करें"), icon: Settings, color: "bg-gray-100", action: () => setActiveTab("settings") }
  ];

  const activeGoals = [
    { title: getText("Daily Steps", "दैनिक कदम"), current: 7500, target: 10000, percentage: 75, color: "blue", icon: Activity },
    { title: getText("Water Intake", "पानी का सेवन"), current: 6, target: 8, percentage: 75, color: "green", icon: Activity },
    { title: getText("Sleep Hours", "नींद के घंटे"), current: 7.5, target: 8, percentage: 94, color: "purple", icon: Clock },
    { title: getText("Meditation", "ध्यान"), current: 10, target: 15, percentage: 67, color: "orange", icon: Brain }
  ];

  const upcomingReminders = [
    { title: getText("Evening Medication", "शाम की दवा"), time: "2:30 PM", icon: Activity, color: "text-blue-600" },
    { title: getText("Water Reminder", "पानी की याद दिलाना"), time: "3:00 PM", icon: Activity, color: "text-green-600" },
    { title: getText("Bedtime Routine", "सोने की दिनचर्या"), time: "9:00 PM", icon: Clock, color: "text-purple-600" }
  ];

  const healthInsights = [
    {
      title: getText("Blood Pressure Trend", "रक्तचाप की प्रवृत्ति"),
      description: getText("Your blood pressure has been consistently improving over the past 2 weeks. Keep up the good work!", "आपका रक्तचाप पिछले 2 सप्ताह से लगातार सुधार रहा है। अच्छा काम जारी रखें!"),
      confidence: getText("92% confidence", "92% विश्वास"),
      recommendation: getText("Continue with your current medication schedule and daily walks.", "अपनी वर्तमान दवा अनुसूची और दैनिक सैर जारी रखें।"),
      color: "bg-green-50 border-green-200",
      icon: TrendingUp
    },
    {
      title: getText("Sleep Pattern Analysis", "नींद पैटर्न विश्लेषण"),
      description: getText("Your sleep quality has decreased by 15% this week. Consider adjusting your bedtime routine.", "आपकी नींद की गुणवत्ता इस सप्ताह 15% कम हुई है। अपनी सोने की दिनचर्या को समायोजित करने पर विचार करें।"),
      confidence: getText("87% confidence", "87% विश्वास"),
      recommendation: getText("Try reducing screen time 1 hour before bed and maintain consistent sleep schedule.", "सोने से 1 घंटे पहले स्क्रीन टाइम कम करने की कोशिश करें और निरंतर नींद अनुसूची बनाए रखें।"),
      color: "bg-yellow-50 border-yellow-200",
      icon: Clock
    },
    {
      title: getText("Hydration Insight", "हाइड्रेशन अंतर्दृष्टि"),
      description: getText("You are meeting 75% of your daily water intake goal. Slight improvement needed.", "आप अपने दैनिक पानी सेवन लक्ष्य का 75% पूरा कर रहे हैं। थोड़ा सुधार की आवश्यकता है।"),
      confidence: getText("78% confidence", "78% विश्वास"),
      recommendation: getText("Set hourly reminders to drink water throughout the day.", "दिन भर पानी पीने के लिए घंटे भर की रिमाइंडर सेट करें।"),
      color: "bg-blue-50 border-blue-200",
      icon: Activity
    }
  ];

  const aiHealthTips = [
    {
      category: getText("Nutrition", "पोषण"),
      tip: getText("Based on your recent conversations, consider adding more leafy greens to your diet for better iron absorption.", "आपकी हाल की बातचीत के आधार पर, बेहतर आयरन अवशोषण के लिए अपने आहार में अधिक हरी पत्तेदार सब्जियां शामिल करने पर विचार करें।"),
      icon: Heart
    },
    {
      category: getText("Exercise", "व्यायाम"),
      tip: getText("Your step count is excellent! Try adding 10 minutes of strength training twice a week.", "आपका कदम गिनती उत्कृष्ट है! सप्ताह में दो बार 10 मिनट की शक्ति प्रशिक्षण जोड़ने की कोशिश करें।"),
      icon: Activity
    },
    {
      category: getText("Mental Health", "मानसिक स्वास्थ्य"),
      tip: getText("Your stress levels seem elevated. Consider trying 5-minute breathing exercises daily.", "आपका तनाव का स्तर ऊंचा लगता है। दैनिक 5 मिनट की सांस लेने के व्यायाम करने पर विचार करें।"),
      icon: Brain
    }
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

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText(`Good morning, ${user?.name}! 👋`, `सुप्रभात, ${user?.name}! 👋`)}
          </h1>
          <p className="text-gray-600">
            {getText("Here's your health overview for today", "यहाँ आज के लिए आपका स्वास्थ्य अवलोकन है")}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${card.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-green-600">{card.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Assistants Quick Access */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("symptom")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">HealthVitals-AI</h3>
                <p className="text-gray-600">{getText("Symptom Analysis", "लक्षण विश्लेषण")}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              {getText("Get AI-powered health insights and symptom analysis with personalized recommendations.", "व्यक्तिगत सिफारिशों के साथ AI-संचालित स्वास्थ्य अंतर्दृष्टि और लक्षण विश्लेषण प्राप्त करें।")}
            </p>
            <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
              {getText("Start Analysis", "विश्लेषण शुरू करें")}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("lifestyle")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{getText("Lifestyle Coach", "जीवनशैली कोच")}</h3>
                <p className="text-gray-600">{getText("Wellness Guidance", "कल्याण मार्गदर्शन")}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              {getText("Receive personalized lifestyle coaching and wellness tips tailored to your needs.", "अपनी आवश्यकताओं के अनुरूप व्यक्तिगत जीवनशैली कोचिंग और कल्याण सुझाव प्राप्त करें।")}
            </p>
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
              {getText("Get Coaching", "कोचिंग प्राप्त करें")}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("persona")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">PersonaAI</h3>
                <p className="text-gray-600">{getText("Assessment Engine", "मूल्यांकन इंजन")}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              {getText("Take intelligent assessments and receive personalized feedback on your wellness journey.", "बुद्धिमान मूल्यांकन लें और अपनी कल्याण यात्रा पर व्यक्तिगत प्रतिक्रिया प्राप्त करें।")}
            </p>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
              {getText("Start Assessment", "मूल्यांकन शुरू करें")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <CardTitle>{getText("Recent Insights", "हाल की अंतर्दृष्टि")}</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              {getText("View All", "सभी देखें")}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border ${insight.color}`}>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{insight.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={insight.priority === 'HIGH' ? 'destructive' : 'secondary'} className="text-xs">
                          {insight.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <CardTitle>{getText("Quick Actions", "त्वरित क्रियाएं")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
                    onClick={action.action}
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals & Upcoming Reminders */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <CardTitle>{getText("Active Goals", "सक्रिय लक्ष्य")}</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              {getText("Add Goal", "लक्ष्य जोड़ें")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {activeGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">{goal.title}</h4>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm text-gray-600 mb-1">
                        {goal.current} / {goal.target} {goal.title.includes('Steps') ? getText('steps', 'कदम') : goal.title.includes('Water') ? getText('glasses', 'गिलास') : goal.title.includes('Sleep') ? getText('hours', 'घंटे') : getText('minutes', 'मिनट')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">{goal.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${goal.color === 'blue' ? 'bg-blue-500' : goal.color === 'green' ? 'bg-green-500' : goal.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'}`}
                        style={{ width: `${goal.percentage}%` }}
                      ></div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      {getText("Log Progress", "प्रगति लॉग करें")}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <CardTitle>{getText("Upcoming Reminders", "आगामी अनुस्मारक")}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReminders.map((reminder, index) => {
              const IconComponent = reminder.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <IconComponent className={`w-4 h-4 ${reminder.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                    <p className="text-sm text-gray-500">{reminder.time}</p>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">{getText("Daily Motivation", "दैनिक प्रेरणा")}</span>
              </div>
              <p className="text-sm text-blue-700 italic">
                {getText('"The groundwork for all happiness is good health."', '"सभी खुशी की नींव अच्छा स्वास्थ्य है।"')}
              </p>
              <p className="text-xs text-blue-600 mt-1">- Leigh Hunt</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity & Most Discussed Topics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-blue-600" />
              <CardTitle>{getText("Weekly Activity", "साप्ताहिक गतिविधि")}</CardTitle>
            </div>
            <select className="text-sm border rounded px-2 py-1">
              <option>{getText("This Week", "इस सप्ताह")}</option>
              <option>{getText("Last Week", "पिछला सप्ताह")}</option>
              <option>{getText("This Month", "इस महीने")}</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" name={getText("Steps", "कदम")} />
                  <Bar dataKey="exercise" fill="#10b981" name={getText("Exercise (min)", "व्यायाम (मिनट)")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">9,386</div>
                <div className="text-xs text-gray-500">{getText("Avg Steps", "औसत कदम")}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">7.9 glasses</div>
                <div className="text-xs text-gray-500">{getText("Avg Water", "औसत पानी")}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">7.9 hours</div>
                <div className="text-xs text-gray-500">{getText("Avg Sleep", "औसत नींद")}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">46 min</div>
                <div className="text-xs text-gray-500">{getText("Avg Exercise", "औसत व्यायाम")}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle>{getText("Most Discussed Topics", "सबसे अधिक चर्चित विषय")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topicsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ value }) => `${value}%`}
                    >
                      {topicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {topicsData.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: topic.color }}
                      ></div>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className="h-1 rounded-full" 
                          style={{ 
                            width: `${topic.value * 4}%`, 
                            backgroundColor: topic.color 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{topic.value}%</span>
                    </div>
                    <span className="text-xs text-gray-400">{topic.value}% {getText("of conversations", "बातचीत का")}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">47</div>
                <div className="text-xs text-gray-500">{getText("Total Conversations", "कुल बातचीत")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8.5</div>
                <div className="text-xs text-gray-500">{getText("Avg Duration (min)", "औसत अवधि (मिनट)")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">96%</div>
                <div className="text-xs text-gray-500">{getText("Resolution Rate", "समाधान दर")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>{getText("Health Insights", "स्वास्थ्य अंतर्दृष्टि")}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  {getText("Excellent Progress", "उत्कृष्ट प्रगति")}
                </h4>
              </div>
              <p className="text-sm text-green-700">
                {getText(
                  "Your wellness score has improved by 15% this week. Keep up the great work!",
                  "आपका कल्याण स्कोर इस सप्ताह 15% सुधार हुआ है। अच्छा काम जारी रखें!"
                )}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">
                  {getText("Heart Health", "हृदय स्वास्थ्य")}
                </h4>
              </div>
              <p className="text-sm text-blue-700">
                {getText(
                  "Your cardiovascular metrics are showing positive trends with regular exercise.",
                  "नियमित व्यायाम से आपके हृदय संबंधी मेट्रिक्स में सकारात्मक रुझान दिख रहे हैं।"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
