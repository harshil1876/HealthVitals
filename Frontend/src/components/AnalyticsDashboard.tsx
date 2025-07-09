
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  Brain, 
  Activity, 
  Moon, 
  Droplets,
  Target,
  Calendar,
  Download,
  RefreshCw,
  Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsDashboard = ({ user }) => {
  // Sample data for charts
  const conversationData = [
    { date: 'Jan 1', conversations: 4, duration: 16 },
    { date: 'Jan 8', conversations: 6, duration: 22 },
    { date: 'Jan 15', conversations: 4, duration: 18 },
    { date: 'Jan 22', conversations: 7, duration: 28 },
    { date: 'Jan 29', conversations: 6, duration: 25 },
    { date: 'Feb 5', conversations: 8, duration: 32 },
    { date: 'Feb 12', conversations: 5, duration: 20 }
  ];

  const weeklyActivityData = [
    { week: 'Jan 1', conversations: 3, duration: 14 },
    { week: 'Jan 8', conversations: 5, duration: 21 },
    { week: 'Jan 15', conversations: 3, duration: 18 },
    { week: 'Jan 22', conversations: 7, duration: 29 },
    { week: 'Jan 29', conversations: 6, duration: 24 },
    { week: 'Feb 5', conversations: 8, duration: 32 },
    { week: 'Feb 12', conversations: 4, duration: 19 }
  ];

  const healthMetrics = [
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      change: "+2%",
      trend: "up",
      status: "Normal",
      range: "60-100 bpm",
      lastUpdated: "2 hours ago",
      icon: Heart,
      color: "red"
    },
    {
      title: "Blood Pressure",
      value: "118/76",
      unit: "mmHg",
      change: "-3%",
      trend: "down",
      status: "Optimal",
      range: "90-120/60-80 mmHg",
      lastUpdated: "1 day ago",
      icon: Activity,
      color: "green"
    },
    {
      title: "Sleep Quality",
      value: "8.2",
      unit: "/10",
      change: "+12%",
      trend: "up",
      status: "Excellent",
      range: "7-9 hours",
      lastUpdated: "This morning",
      icon: Moon,
      color: "purple"
    },
    {
      title: "Stress Level",
      value: "3.1",
      unit: "/10",
      change: "-18%",
      trend: "down",
      status: "Low",
      range: "2-4 optimal",
      lastUpdated: "6 hours ago",
      icon: Brain,
      color: "orange"
    }
  ];

  const activityTracking = [
    {
      title: "Steps",
      current: 7542,
      target: 10000,
      percentage: 75,
      icon: Target,
      color: "blue"
    },
    {
      title: "Heart Rate",
      current: 72,
      target: 85,
      percentage: 85,
      icon: Heart,
      color: "green"
    },
    {
      title: "Sleep",
      current: 7.5,
      target: 8,
      percentage: 94,
      icon: Moon,
      color: "purple"
    },
    {
      title: "Water",
      current: 6,
      target: 8,
      percentage: 75,
      icon: Droplets,
      color: "orange"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Health Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive view of your health data and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View History</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Health Score</p>
                <p className="text-3xl font-semibold text-blue-900">86%</p>
                <p className="text-sm text-blue-600">+5% from last week</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Conversations</p>
                <p className="text-3xl font-semibold text-green-900">47</p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Improvement</p>
                <p className="text-3xl font-semibold text-purple-900">92%</p>
                <p className="text-sm text-purple-600">Goals on track</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Streak</p>
                <p className="text-3xl font-semibold text-orange-900">12</p>
                <p className="text-sm text-orange-600">Days active</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics Overview */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Health Metrics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const isPositive = metric.trend === "up";
              const trendColor = metric.color === "red" ? (isPositive ? "text-red-600" : "text-green-600") :
                               metric.color === "green" ? (isPositive ? "text-green-600" : "text-red-600") :
                               isPositive ? "text-green-600" : "text-red-600";
              
              return (
                <Card key={index} className={`border-${metric.color}-100`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 text-${metric.color}-600`} />
                      </div>
                      <div className={`flex items-center space-x-1 ${trendColor}`}>
                        {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="text-xs font-medium">{metric.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                      </p>
                      <p className="text-xs text-gray-500">{metric.range}</p>
                      <p className="text-xs text-gray-400 mt-1">Last updated: {metric.lastUpdated}</p>
                      <div className="mt-2 space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity Tracking */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Activity Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityTracking.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <Card key={index} className={`bg-${activity.color}-50 border-${activity.color}-200`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 text-${activity.color}-600`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium text-${activity.color}-700`}>{activity.title}</p>
                        <p className="text-xs text-gray-600">
                          {activity.current} / {activity.target} {activity.title === "Steps" ? "steps" : activity.title === "Sleep" ? "hours" : activity.title === "Water" ? "glasses" : "bpm"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className={`font-medium text-${activity.color}-700`}>{activity.percentage}%</span>
                      </div>
                      <Progress value={activity.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conversation Patterns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Conversation Patterns</CardTitle>
            <CardDescription>Weekly conversation frequency and duration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Conversations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Duration (min)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Conversation volume by week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversations" fill="#3b82f6" />
                <Bar dataKey="duration" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Conversations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Duration (min)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Score Trend & Summary Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Health Score Trend</CardTitle>
            <CardDescription>Overall Health Score</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-semibold text-green-600 mb-2">8.4</div>
              <p className="text-lg text-gray-600 mb-1">Overall Health Score</p>
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+0.8 this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Summary Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-blue-600">127</p>
                <p className="text-sm text-gray-600">Total Conversations</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-green-600">42h</p>
                <p className="text-sm text-gray-600">Total Talk Time</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-purple-600">15</p>
                <p className="text-sm text-gray-600">Health Topics</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-orange-600">98%</p>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
