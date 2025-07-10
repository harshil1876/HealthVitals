import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Heart, 
  Brain, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  AlertCircle,
  Clock,
  Zap,
  Users,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const CommonDashboard = ({ user, currentLanguage = "English", getText = (en, hi) => en }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Unified Progress Trends Data with more comprehensive data
  const unifiedProgressData = [
    { 
      date: '2024-01-01', 
      wellness: 72, 
      physical: 68, 
      mental: 75, 
      emotional: 70, 
      sleep: 7.2, 
      exercise: 25, 
      nutrition: 78,
      hydration: 6.5,
      stress: 4.2,
      heartRate: 78,
      bloodPressure: 125,
      mood: 7.2
    },
    { 
      date: '2024-01-02', 
      wellness: 75, 
      physical: 72, 
      mental: 78, 
      emotional: 73, 
      sleep: 7.5, 
      exercise: 30, 
      nutrition: 82,
      hydration: 7.2,
      stress: 3.8,
      heartRate: 75,
      bloodPressure: 122,
      mood: 7.8
    },
    { 
      date: '2024-01-03', 
      wellness: 68, 
      physical: 65, 
      mental: 70, 
      emotional: 68, 
      sleep: 6.8, 
      exercise: 20, 
      nutrition: 75,
      hydration: 5.8,
      stress: 5.1,
      heartRate: 82,
      bloodPressure: 128,
      mood: 6.5
    },
    { 
      date: '2024-01-04', 
      wellness: 82, 
      physical: 80, 
      mental: 85, 
      emotional: 80, 
      sleep: 8.1, 
      exercise: 45, 
      nutrition: 88,
      hydration: 8.5,
      stress: 2.9,
      heartRate: 70,
      bloodPressure: 118,
      mood: 8.5
    },
    { 
      date: '2024-01-05', 
      wellness: 78, 
      physical: 76, 
      mental: 80, 
      emotional: 77, 
      sleep: 7.8, 
      exercise: 35, 
      nutrition: 85,
      hydration: 7.8,
      stress: 3.5,
      heartRate: 73,
      bloodPressure: 120,
      mood: 8.0
    },
    { 
      date: '2024-01-06', 
      wellness: 85, 
      physical: 88, 
      mental: 82, 
      emotional: 85, 
      sleep: 8.5, 
      exercise: 60, 
      nutrition: 90,
      hydration: 9.2,
      stress: 2.1,
      heartRate: 68,
      bloodPressure: 115,
      mood: 9.0
    },
    { 
      date: '2024-01-07', 
      wellness: 88, 
      physical: 85, 
      mental: 90, 
      emotional: 88, 
      sleep: 8.2, 
      exercise: 40, 
      nutrition: 92,
      hydration: 8.8,
      stress: 2.5,
      heartRate: 71,
      bloodPressure: 117,
      mood: 8.8
    }
  ];

  const progressMetrics = [
    {
      title: getText("Overall Wellness", "समग्र स्वास्थ्य"),
      current: 88,
      target: 90,
      change: "+12%",
      trend: "up",
      color: "blue",
      icon: Heart
    },
    {
      title: getText("Physical Health", "शारीरिक स्वास्थ्य"),
      current: 85,
      target: 90,
      change: "+8%",
      trend: "up",
      color: "green",
      icon: Activity
    },
    {
      title: getText("Mental Health", "मानसिक स्वास्थ्य"),
      current: 90,
      target: 85,
      change: "+15%",
      trend: "up",
      color: "purple",
      icon: Brain
    },
    {
      title: getText("Goal Achievement", "लक्ष्य प्राप्ति"),
      current: 92,
      target: 80,
      change: "+20%",
      trend: "up",
      color: "orange",
      icon: Target
    }
  ];

  const dailyActivities = [
    { 
      activity: getText("Morning Meditation", "प्रातःकालीन ध्यान"), 
      completed: true, 
      time: "7:00 AM",
      duration: "15 min",
      points: 25
    },
    { 
      activity: getText("Exercise Session", "व्यायाम सत्र"), 
      completed: true, 
      time: "8:30 AM",
      duration: "45 min",
      points: 50
    },
    { 
      activity: getText("Health Check-in", "स्वास्थ्य जांच"), 
      completed: false, 
      time: "2:00 PM",
      duration: "10 min",
      points: 20
    },
    { 
      activity: getText("Evening Walk", "शाम की सैर"), 
      completed: false, 
      time: "6:30 PM",
      duration: "30 min",
      points: 35
    }
  ];

  const weeklyGoals = [
    {
      title: getText("Exercise Sessions", "व्यायाम सत्र"),
      completed: 5,
      target: 5,
      percentage: 100,
      color: "green"
    },
    {
      title: getText("Meditation Minutes", "ध्यान मिनट"),
      completed: 140,
      target: 150,
      percentage: 93,
      color: "purple"
    },
    {
      title: getText("Sleep Hours", "नींद के घंटे"),
      completed: 54,
      target: 56,
      percentage: 96,
      color: "blue"
    },
    {
      title: getText("Water Intake", "पानी का सेवन"),
      completed: 48,
      target: 56,
      percentage: 86,
      color: "cyan"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {getText("Health Dashboard", "स्वास्थ्य डैशबोर्ड")}
          </h1>
          <p className="text-gray-600">
            {getText("Your comprehensive wellness overview", "आपका व्यापक कल्याण अवलोकन")}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList className="bg-white border">
              <TabsTrigger value="week">{getText("Week", "सप्ताह")}</TabsTrigger>
              <TabsTrigger value="month">{getText("Month", "महीना")}</TabsTrigger>
              <TabsTrigger value="quarter">{getText("Quarter", "तिमाही")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {progressMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                  <Badge variant="secondary" className="text-green-600">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">{metric.current}%</h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${metric.color}-500`}
                      style={{ width: `${(metric.current / metric.target) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getText(`Target: ${metric.target}%`, `लक्ष्य: ${metric.target}%`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unified Progress Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>{getText("Unified Progress Trends", "एकीकृत प्रगति रुझान")}</span>
          </CardTitle>
          <CardDescription>
            {getText("Comprehensive view of all your wellness metrics over time", "समय के साथ आपके सभी कल्याण मेट्रिक्स का व्यापक दृश्य")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={unifiedProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="wellness" stroke="#3b82f6" strokeWidth={3} name={getText("Wellness", "कल्याण")} />
                <Line type="monotone" dataKey="physical" stroke="#10b981" strokeWidth={2} name={getText("Physical", "शारीरिक")} />
                <Line type="monotone" dataKey="mental" stroke="#8b5cf6" strokeWidth={2} name={getText("Mental", "मानसिक")} />
                <Line type="monotone" dataKey="emotional" stroke="#f59e0b" strokeWidth={2} name={getText("Emotional", "भावनात्मक")} />
                <Line type="monotone" dataKey="mood" stroke="#ef4444" strokeWidth={2} name={getText("Mood", "मूड")} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-semibold text-blue-900">78%</div>
              <div className="text-sm text-blue-700">{getText("Avg Wellness", "औसत कल्याण")}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-semibold text-green-900">7.8h</div>
              <div className="text-sm text-green-700">{getText("Avg Sleep", "औसत नींद")}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-semibold text-purple-900">38min</div>
              <div className="text-sm text-purple-700">{getText("Avg Exercise", "औसत व्यायाम")}</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-semibold text-orange-900">85%</div>
              <div className="text-sm text-orange-700">{getText("Avg Nutrition", "औसत पोषण")}</div>
            </div>
            <div className="text-center p-3 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-semibold text-cyan-900">7.6L</div>
              <div className="text-sm text-cyan-700">{getText("Avg Hydration", "औसत जलयोजन")}</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-semibold text-red-900">74 BPM</div>
              <div className="text-sm text-red-700">{getText("Avg Heart Rate", "औसत हृदय गति")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Activities & Weekly Goals */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{getText("Today's Activities", "आज की गतिविधियां")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dailyActivities.map((activity, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${activity.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {activity.completed ? '✓' : '○'}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.activity}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{activity.time}</span>
                    <span>{activity.duration}</span>
                    <span>{activity.points} {getText("pts", "अंक")}</span>
                  </div>
                </div>
                {!activity.completed && (
                  <Button size="sm" variant="outline">
                    {getText("Start", "शुरू करें")}
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>{getText("Weekly Goals", "साप्ताहिक लक्ष्य")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {goal.completed}/{goal.target}
                    </span>
                    <Badge variant={goal.percentage >= 90 ? "default" : goal.percentage >= 70 ? "secondary" : "outline"}>
                      {goal.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${goal.color === 'green' ? 'bg-green-500' : goal.color === 'purple' ? 'bg-purple-500' : goal.color === 'blue' ? 'bg-blue-500' : 'bg-cyan-500'}`}
                    style={{ width: `${goal.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>{getText("Health Insights", "स्वास्थ्य अंतर्दृष्टि")}</span>
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

export default CommonDashboard;
