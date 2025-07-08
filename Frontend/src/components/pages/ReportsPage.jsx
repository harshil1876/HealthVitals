import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Share2, 
  Calendar, 
  TrendingUp,
  Brain,
  Heart,
  Target,
  Activity,
  Eye,
  Clock,
  Award,
  AlertCircle,
  Target as FocusTarget
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const ReportsPage = ({ user, currentLanguage = "English", getText = (en, hi) => en }) => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Sample report data
  const weeklyData = [
    { day: 'Mon', wellness: 75, mood: 8, energy: 7, sleep: 7.5, exercise: 1, meditation: 15, hydration: 8 },
    { day: 'Tue', wellness: 82, mood: 9, energy: 8, sleep: 8.0, exercise: 1, meditation: 20, hydration: 10 },
    { day: 'Wed', wellness: 70, mood: 6, energy: 6, sleep: 6.5, exercise: 0, meditation: 10, hydration: 6 },
    { day: 'Thu', wellness: 88, mood: 9, energy: 9, sleep: 8.5, exercise: 1, meditation: 25, hydration: 12 },
    { day: 'Fri', wellness: 85, mood: 8, energy: 8, sleep: 8.0, exercise: 1, meditation: 20, hydration: 9 },
    { day: 'Sat', wellness: 92, mood: 10, energy: 9, sleep: 9.0, exercise: 1, meditation: 30, hydration: 14 },
    { day: 'Sun', wellness: 90, mood: 9, energy: 8, sleep: 8.5, exercise: 0, meditation: 25, hydration: 8 }
  ];

  const emotionalPatterns = [
    { emotion: getText('Joy', 'खुशी'), value: 85, fullMark: 100 },
    { emotion: getText('Calm', 'शांति'), value: 75, fullMark: 100 },
    { emotion: getText('Energy', 'ऊर्जा'), value: 80, fullMark: 100 },
    { emotion: getText('Focus', 'एकाग्रता'), value: 70, fullMark: 100 },
    { emotion: getText('Confidence', 'आत्मविश्वास'), value: 78, fullMark: 100 },
    { emotion: getText('Stress', 'तनाव'), value: 25, fullMark: 100 }
  ];

  const emotionalTrendsData = [
    { date: '2024-01-01', joy: 78, calm: 70, energy: 75, focus: 72, confidence: 75, stress: 35 },
    { date: '2024-01-02', joy: 80, calm: 72, energy: 77, focus: 73, confidence: 76, stress: 32 },
    { date: '2024-01-03', joy: 75, calm: 68, energy: 70, focus: 70, confidence: 73, stress: 40 },
    { date: '2024-01-04', joy: 85, calm: 80, energy: 85, focus: 78, confidence: 82, stress: 25 },
    { date: '2024-01-05', joy: 83, calm: 76, energy: 80, focus: 75, confidence: 79, stress: 28 },
    { date: '2024-01-06', joy: 88, calm: 82, energy: 87, focus: 80, confidence: 85, stress: 20 },
    { date: '2024-01-07', joy: 85, calm: 78, energy: 82, focus: 75, confidence: 80, stress: 25 }
  ];

  const weeklyActivities = [
    { activity: 'Exercise Sessions', completed: 5, planned: 5, percentage: 100, trend: '+1 from last week' },
    { activity: 'Meditation Minutes', completed: 140, planned: 140, percentage: 100, trend: '+20 mins from last week' },
    { activity: 'Sleep Hours', completed: 54, planned: 56, percentage: 96, trend: '+2 hours from last week' },
    { activity: 'Water Glasses', completed: 48, planned: 56, percentage: 86, trend: '-3 from last week' },
    { activity: 'Healthy Meals', completed: 18, planned: 21, percentage: 86, trend: '+2 from last week' }
  ];

  const aiInsights = [
    {
      category: "Sleep Pattern Optimization",
      insight: "Your sleep quality improved by 15% this week. Best sleep was on Saturday (9 hours). Consistent bedtime routine shows positive correlation with sleep quality.",
      recommendation: "Try to maintain consistent bedtime routine for optimal results. Consider reducing screen time 1 hour before bed to further improve sleep quality.",
      priority: "high",
      confidence: 95,
      impact: "High"
    },
    {
      category: "Exercise Consistency Excellence",
      insight: "Perfect exercise streak! You completed all planned workout sessions. Your exercise-mood correlation is at 0.87, indicating strong positive impact.",
      recommendation: "Consider adding variety with different exercise types (strength training, yoga) to prevent plateau and enhance overall fitness.",
      priority: "medium",
      confidence: 88,
      impact: "Medium"
    },
    {
      category: "Stress Management Alert",
      insight: "Stress levels were highest on Wednesday (5/10). Strong correlation with poor sleep the night before. Stress affects your energy levels by 23%.",
      recommendation: "Focus on stress reduction techniques before challenging days. Consider meditation or breathing exercises during high-stress periods.",
      priority: "high",
      confidence: 92,
      impact: "High"
    },
    {
      category: "Hydration Improvement Needed",
      insight: "Hydration consistency needs improvement. Weekend intake was 25% lower than weekdays. This correlates with decreased energy levels.",
      recommendation: "Set weekend hydration reminders to maintain consistency. Aim for 2-3 glasses of water upon waking to kickstart hydration habit.",
      priority: "medium",
      confidence: 85,
      impact: "Medium"
    }
  ];

  const goalAlignment = [
    { goal: 'Exercise Goals', percentage: 100, status: 'Perfect week!', color: 'green', icon: Activity },
    { goal: 'Sleep Goals', percentage: 96, status: 'Almost there!', color: 'blue', icon: Clock },
    { goal: 'Meditation', percentage: 100, status: 'Excellent focus!', color: 'purple', icon: Brain },
    { goal: 'Nutrition', percentage: 86, status: 'Room for improvement', color: 'orange', icon: Heart }
  ];

  const weeklyAchievements = [
    'Perfect exercise attendance (5/5 sessions)',
    'Maintained 12-day meditation streak',
    'Improved sleep quality by 15%',
    'Wellness score increased to 85%',
    'Achieved new personal energy record (9.2/10)',
    'Completed stress management course'
  ];

  const areasForFocus = [
    'Weekend hydration consistency',
    'Wednesday stress management',
    'Meal planning consistency',
    'Evening routine optimization',
    'Social wellness activities'
  ];

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: `Your ${selectedPeriod} wellness report has been downloaded successfully.`,
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Report Shared",
      description: "Your wellness report link has been copied to clipboard.",
    });
  };

  const getPeriodTitle = () => {
    switch(selectedPeriod) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'quarter': return 'This Quarter';
      default: return 'This Week';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText("Weekly Wellness Report", "साप्ताहिक कल्याण रिपोर्ट")}
          </h1>
          <p className="text-gray-600">
            {getText("Your comprehensive wellness insights and analytics", "आपकी व्यापक कल्याण अंतर्दृष्टि और विश्लेषण")}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList className="bg-white border">
              <TabsTrigger value="week">{getText("This Week", "इस सप्ताह")}</TabsTrigger>
              <TabsTrigger value="month">{getText("This Month", "इस महीने")}</TabsTrigger>
              <TabsTrigger value="quarter">{getText("3 Months", "3 महीने")}</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={handleShareReport} className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>{getText("Share", "साझा करें")}</span>
          </Button>
          <Button onClick={handleDownloadReport} className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>{getText("Download PDF", "PDF डाउनलोड करें")}</span>
          </Button>
        </div>
      </div>

      {/* Report Summary Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Weekly Wellness Report</CardTitle>
              <CardDescription className="text-blue-100">
                {new Date().toLocaleDateString()} - Comprehensive wellness insights for {user?.name}
              </CardDescription>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-blue-100 text-sm">Overall Wellness</div>
              <div className="flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="text-xs">+12% improvement</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">5/5</div>
              <div className="text-blue-100 text-sm">Goals Achieved</div>
              <div className="flex items-center justify-center mt-1">
                <Award className="w-3 h-3 mr-1" />
                <span className="text-xs">Perfect week!</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">7</div>
              <div className="text-blue-100 text-sm">Active Days</div>
              <div className="flex items-center justify-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                <span className="text-xs">Daily engagement</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">15</div>
              <div className="text-blue-100 text-sm">Day Streak</div>
              <div className="flex items-center justify-center mt-1">
                <Target className="w-3 h-3 mr-1" />
                <span className="text-xs">Personal best!</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What Did You Do This Week */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-green-600" />
            <span>What Did You Do This Week?</span>
          </CardTitle>
          <CardDescription>Detailed breakdown of your weekly wellness activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="wellness" fill="#3b82f6" name="Wellness Score" />
                <Bar dataKey="exercise" fill="#10b981" name="Exercise Sessions" />
                <Bar dataKey="meditation" fill="#8b5cf6" name="Meditation (mins)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {weeklyActivities.map((activity, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{activity.activity}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {activity.completed}/{activity.planned}
                    </span>
                    <Badge variant={activity.percentage >= 90 ? "default" : activity.percentage >= 70 ? "secondary" : "destructive"}>
                      {activity.percentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${activity.percentage >= 90 ? 'bg-green-500' : activity.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.trend}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>AI Insights & Recommendations</span>
            </CardTitle>
            <CardDescription>Advanced AI analysis of your wellness patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${insight.priority === 'high' ? 'border-l-red-500 bg-red-50' : 'border-l-yellow-500 bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{insight.category}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={insight.priority === 'high' ? "destructive" : "secondary"}>
                      {insight.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
                <div className="flex items-start space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700 font-medium">{insight.recommendation}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Impact: {insight.impact}</span>
                  <span>AI Confidence: {insight.confidence}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-600" />
              <span>{getText("Emotional Patterns", "भावनात्मक पैटर्न")}</span>
            </CardTitle>
            <CardDescription>
              {getText("Your emotional wellness throughout the week", "सप्ताह भर आपका भावनात्मक कल्याण")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={emotionalPatterns}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="emotion" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name={getText("Emotional State", "भावनात्मक अवस्था")}
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {emotionalPatterns.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">{item.emotion}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.value}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emotional Trends Analysis */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span>{getText("Emotional Trends", "भावनात्मक रुझान")}</span>
          </CardTitle>
          <CardDescription>
            {getText("Daily emotional patterns over the week", "सप्ताह भर दैनिक भावनात्मक पैटर्न")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionalTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line type="monotone" dataKey="joy" stroke="#10b981" strokeWidth={2} name={getText("Joy", "खुशी")} />
                <Line type="monotone" dataKey="calm" stroke="#3b82f6" strokeWidth={2} name={getText("Calm", "शांति")} />
                <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} name={getText("Energy", "ऊर्जा")} />
                <Line type="monotone" dataKey="confidence" stroke="#8b5cf6" strokeWidth={2} name={getText("Confidence", "आत्मविश्वास")} />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name={getText("Stress", "तनाव")} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-900">+12%</div>
              <div className="text-xs text-green-700">{getText("Positive Emotions", "सकारात्मक भावनाएं")}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-900">-15%</div>
              <div className="text-xs text-blue-700">{getText("Stress Levels", "तनाव का स्तर")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Alignment */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-green-600" />
            <span>Goal Alignment</span>
          </CardTitle>
          <CardDescription>How well your activities aligned with your wellness goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {goalAlignment.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <div key={index} className={`text-center p-4 bg-${goal.color}-50 rounded-lg border border-${goal.color}-200 hover:shadow-lg transition-shadow`}>
                  <div className={`w-12 h-12 bg-${goal.color}-200 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className={`w-6 h-6 text-${goal.color}-600`} />
                  </div>
                  <div className={`text-2xl font-bold text-${goal.color}-900 mb-1`}>{goal.percentage}%</div>
                  <div className={`text-sm text-${goal.color}-700 mb-1`}>{goal.goal}</div>
                  <div className={`text-xs text-${goal.color}-600`}>{goal.status}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary (at the end) */}
      <div className="mt-10 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 via-white to-green-50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Weekly Summary</h2>
        <p className="text-gray-500 mb-6">Your wellness journey this week</p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-lg text-gray-800">Key Achievements</span>
            </div>
            <ul className="space-y-2">
              {weeklyAchievements.map((item, i) => (
                <li key={i} className="text-base text-blue-900 font-medium flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Areas for Focus */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FocusTarget className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-lg text-gray-800">Areas for Focus</span>
            </div>
            <ul className="space-y-2">
              {areasForFocus.map((item, i) => (
                <li key={i} className="text-base text-green-900 font-medium flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
