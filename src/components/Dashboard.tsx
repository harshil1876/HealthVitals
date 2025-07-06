import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  MessageCircle, 
  Settings, 
  BarChart3, 
  Calendar,
  Globe,
  Mic,
  MicOff,
  LogOut,
  User,
  Clock,
  TrendingUp,
  Shield,
  Target,
  Award,
  Activity,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import SymptomAnalyzer from "./chatbots/SymptomAnalyzer";
import LifestyleAssistant from "./chatbots/LifestyleAssistant";
import PersonaAI from "./chatbots/PersonaAI";
import ProfileSettings from "./ProfileSettings";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const { toast } = useToast();

  // Sample goals data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Exercise 5 times per week",
      description: "Maintain consistent physical activity",
      target: 5,
      current: 3,
      deadline: "31/12/2024",
      progress: 60,
      category: "health"
    },
    {
      id: 2,
      title: "Get 8 hours of sleep",
      description: "Improve sleep quality and duration",
      target: 8,
      current: 7.2,
      deadline: "31/12/2024",
      progress: 90,
      category: "health"
    },
    {
      id: 3,
      title: "Drink 8 glasses of water daily",
      description: "Stay properly hydrated",
      target: 8,
      current: 6.5,
      deadline: "31/12/2024",
      progress: 81,
      category: "health"
    }
  ]);

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? "Voice Disabled" : "Voice Enabled",
      description: isVoiceEnabled ? "Voice assistant turned off" : "Voice assistant is now active",
    });
  };

  const handleLanguageToggle = () => {
    const languages = ["English", "Spanish", "French", "German", "Chinese"];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    setCurrentLanguage(nextLanguage);
    toast({
      title: "Language Changed",
      description: `Interface language set to ${nextLanguage}`,
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const addGoal = () => {
    toast({
      title: "Add New Goal",
      description: "Goal creation feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
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
                {currentLanguage.slice(0, 3)}
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                  {getInitials(user?.name || "U")}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/60 backdrop-blur-sm border border-blue-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="symptom" className="data-[state=active]:bg-white">HealthVitals-AI</TabsTrigger>
            <TabsTrigger value="lifestyle" className="data-[state=active]:bg-white">Lifestyle</TabsTrigger>
            <TabsTrigger value="persona" className="data-[state=active]:bg-white">PersonaAI</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Analytics</TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-white">Goals</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700">Symptom Checks</p>
                        <p className="text-2xl font-bold text-red-900">12</p>
                      </div>
                      <Brain className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Wellness Score</p>
                        <p className="text-2xl font-bold text-green-900">85%</p>
                      </div>
                      <Heart className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">AI Sessions</p>
                        <p className="text-2xl font-bold text-purple-900">28</p>
                      </div>
                      <MessageCircle className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Days Active</p>
                        <p className="text-2xl font-bold text-blue-900">15</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Modalities Quick Access */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-red-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HealthVitals-AI</CardTitle>
                        <CardDescription>Intelligent Symptom Analyzer</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get AI-powered symptom analysis, disease predictions, and personalized health recommendations.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("symptom")}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      Start Symptom Check
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Lifestyle Assistant</CardTitle>
                        <CardDescription>Personal Wellness Coach</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Receive personalized wellness coaching, stress management, and lifestyle optimization tips.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("lifestyle")}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    >
                      Chat with Coach
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-purple-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">PersonaAI</CardTitle>
                        <CardDescription>Adaptive Assessment Engine</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Take intelligent assessments, receive feedback, and track your personal development journey.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("persona")}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                    >
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-900">Symptom Analysis Completed</p>
                          <p className="text-sm text-gray-600">Headache and fatigue assessment</p>
                        </div>
                      </div>
                      <Badge variant="secondary">2 hours ago</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900">Wellness Check-in</p>
                          <p className="text-sm text-gray-600">Daily mood and energy tracking</p>
                        </div>
                      </div>
                      <Badge variant="secondary">1 day ago</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-gray-900">PersonaAI Assessment</p>
                          <p className="text-sm text-gray-600">Stress management evaluation</p>
                        </div>
                      </div>
                      <Badge variant="secondary">3 days ago</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chatbot Tabs */}
          <TabsContent value="symptom">
            <SymptomAnalyzer user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="lifestyle">
            <LifestyleAssistant user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />
          </TabsContent>

          <TabsContent value="persona">
            <PersonaAI user={user} isVoiceEnabled={isVoiceEnabled} currentLanguage={currentLanguage} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard user={user} />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Goals</h2>
                  <p className="text-gray-600">Track and achieve your wellness objectives</p>
                </div>
                <Button onClick={addGoal} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </div>

              {/* Goals Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-900">3</p>
                    <p className="text-sm text-blue-700">Active Goals</p>
                    <p className="text-xs text-blue-600 mt-1">Currently working on</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-900">0</p>
                    <p className="text-sm text-green-700">Completed</p>
                    <p className="text-xs text-green-600 mt-1">Successfully achieved</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-900">77%</p>
                    <p className="text-sm text-purple-700">Average Progress</p>
                    <p className="text-xs text-purple-600 mt-1">Across all goals</p>
                  </CardContent>
                </Card>
              </div>

              {/* Active Goals */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Active Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal) => (
                    <Card key={goal.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs">
                              {goal.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              📅
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Target:</span> {goal.target} {goal.title.includes("Exercise") ? "sessions" : goal.title.includes("sleep") ? "hours" : "glasses"}
                          </div>
                          <div>
                            <span className="font-medium">Current:</span> {goal.current} {goal.title.includes("Exercise") ? "sessions" : goal.title.includes("sleep") ? "hours" : "glasses"}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {goal.deadline}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                          </div>
                          <Progress 
                            value={goal.progress} 
                            className={`h-2 ${goal.progress >= 80 ? 'bg-green-100' : goal.progress >= 50 ? 'bg-yellow-100' : 'bg-red-100'}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <ProfileSettings user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
