
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Lightbulb, 
  Activity, 
  MessageSquare,
  Heart,
  Brain,
  Clock,
  BarChart3,
  Eye,
  Calendar,
  Download,
  Share,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const InsightsPage = ({ user }) => {
  const [activeInsight, setActiveInsight] = useState("trends");

  // Dummy data for charts
  const conversationData = [
    { date: 'Jan 1', conversations: 3, duration: 16 },
    { date: 'Jan 8', conversations: 4, duration: 22 },
    { date: 'Jan 15', conversations: 3, duration: 18 },
    { date: 'Jan 22', conversations: 6, duration: 28 },
    { date: 'Jan 29', conversations: 5, duration: 25 },
    { date: 'Feb 5', conversations: 7, duration: 31 },
    { date: 'Feb 12', conversations: 4, duration: 19 }
  ];

  const weeklyActivityData = [
    { week: 'Jan 1', conversations: 3, duration: 16 },
    { week: 'Jan 8', conversations: 4, duration: 22 },
    { week: 'Jan 15', conversations: 5, duration: 18 },
    { week: 'Jan 22', conversations: 7, duration: 28 },
    { week: 'Jan 29', conversations: 6, duration: 25 },
    { week: 'Feb 5', conversations: 8, duration: 31 },
    { week: 'Feb 12', conversations: 4, duration: 19 }
  ];

  const healthMetrics = [
    { metric: "Heart Rate", value: 72, unit: "bpm", change: "+2%", status: "normal", color: "#ef4444" },
    { metric: "Blood Pressure", value: "118/76", unit: "mmHg", change: "-3%", status: "good", color: "#10b981" },
    { metric: "Sleep Quality", value: 8.2, unit: "/10", change: "+12%", status: "excellent", color: "#8b5cf6" },
    { metric: "Stress Level", value: 3.1, unit: "/10", change: "-18%", status: "low", color: "#f59e0b" }
  ];

  const recentMeasurements = [
    { date: 'Feb 12, 2024', heartRate: '74 bpm', bloodPressure: '120/78', source: 'Voice conversation' },
    { date: 'Feb 10, 2024', heartRate: '71 bpm', bloodPressure: '118/76', source: 'Voice conversation' },
    { date: 'Feb 8, 2024', heartRate: '73 bpm', bloodPressure: '122/80', source: 'Manual entry' },
    { date: 'Feb 5, 2024', heartRate: '70 bpm', bloodPressure: '116/74', source: 'Voice conversation' }
  ];

  const topicAnalysis = [
    { 
      topic: "Sleep & Rest", 
      conversations: 15, 
      avgDuration: "8 min", 
      priority: "High",
      trend: "+23%",
      color: "#8b5cf6",
      insights: ["Sleep quality improving consistently", "Bedtime routine becoming more regular"],
      lastDiscussed: "2 hours ago"
    },
    { 
      topic: "Medication Management", 
      conversations: 8, 
      avgDuration: "12 min", 
      priority: "Medium",
      trend: "+5%",
      color: "#3b82f6",
      insights: ["Good understanding of medication effects", "Occasional adherence challenges"],
      lastDiscussed: "1 day ago"
    },
    { 
      topic: "Physical Activity", 
      conversations: 10, 
      avgDuration: "6 min", 
      priority: "Medium",
      trend: "+15%",
      color: "#10b981",
      insights: ["Exercise routine becoming consistent", "Enjoying morning walks"],
      lastDiscussed: "3 days ago"
    },
    { 
      topic: "Nutrition & Diet", 
      conversations: 5, 
      avgDuration: "4 min", 
      priority: "Low",
      trend: "-10%",
      color: "#f59e0b",
      insights: ["Healthy eating habits established", "Portion control improved"],
      lastDiscussed: "1 week ago"
    },
    { 
      topic: "Stress & Mental Health", 
      conversations: 12, 
      avgDuration: "10 min", 
      priority: "Medium",
      trend: "+18%",
      color: "#06b6d4",
      insights: ["Stress management techniques effective", "Work-life balance improving"],
      lastDiscussed: "6 hours ago"
    },
    { 
      topic: "Vital Signs Monitoring", 
      conversations: 18, 
      avgDuration: "5 min", 
      priority: "High",
      trend: "+3%",
      color: "#6366f1",
      insights: ["Regular monitoring established", "Values within healthy ranges"],
      lastDiscussed: "4 hours ago"
    }
  ];

  const recommendations = [
    {
      title: "Consider Sleep Schedule Adjustment",
      priority: "Medium",
      description: "Your conversations indicate irregular sleep patterns affecting energy levels.",
      basedOn: "7 conversations",
      timeAgo: "4 days ago",
      type: "warning",
      actions: ["Take Action", "More"]
    },
    {
      title: "Medication Adherence Reminder",
      priority: "High",
      description: "Potential gaps in medication routine detected from conversation patterns.",
      basedOn: "5 conversations",
      timeAgo: "1 day ago",
      type: "error",
      actions: ["Take Action", "More"]
    },
    {
      title: "Positive Stress Management Progress",
      priority: "Low",
      description: "Your stress management techniques are showing excellent results.",
      basedOn: "12 conversations",
      timeAgo: "3 days ago",
      type: "success",
      actions: ["More"]
    }
  ];

  const insightTabs = [
    { id: "trends", label: "Trends", icon: TrendingUp, description: "Health patterns over time" },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb, description: "AI-powered suggestions" },
    { id: "vitalsigns", label: "Vital Signs", icon: Activity, description: "Health metrics tracking" },
    { id: "topics", label: "Topics", icon: MessageSquare, description: "Conversation analysis" }
  ];

  const renderTrends = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">Health Insights & Analytics</CardTitle>
        <CardDescription className="text-gray-600">AI-powered analysis of your health conversations and personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Health Metrics Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Health Metrics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${metric.color}20` }}>
                      <Heart className="w-5 h-5" style={{ color: metric.color }} />
                    </div>
                    <Badge variant={metric.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                  <p className="text-xs text-gray-600 mb-1">{metric.status === 'normal' ? 'Average BPM' : metric.status === 'good' ? 'Systolic/Diastolic' : metric.status === 'excellent' ? 'Average Score' : 'Daily Average'}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-semibold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-600">{metric.unit}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal range: {metric.metric === 'Heart Rate' ? '60-100 bpm' : 
                                   metric.metric === 'Blood Pressure' ? '90-120/60-80 mmHg' :
                                   metric.metric === 'Sleep Quality' ? 'This morning' : '6 hours ago'}
                  </p>
                  <div className="mt-2 space-y-1">
                    {metric.metric === 'Heart Rate' && (
                      <>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Consistent with healthy range
                        </div>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          No irregular patterns detected
                        </div>
                      </>
                    )}
                    {metric.metric === 'Blood Pressure' && (
                      <>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Improvement noted
                        </div>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Within optimal range
                        </div>
                      </>
                    )}
                    {metric.metric === 'Sleep Quality' && (
                      <>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Sleep duration improved
                        </div>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Consistent bedtime routine
                        </div>
                      </>
                    )}
                    {metric.metric === 'Stress Level' && (
                      <>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Stress management techniques working
                        </div>
                        <div className="flex items-center text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Meditation sessions helpful
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conversation Patterns */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Conversation Patterns</h3>
          <p className="text-sm text-gray-600 mb-4">Weekly conversation frequency and duration trends</p>
          <Card className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="conversations" stroke="#3b82f6" strokeWidth={2} name="Conversations" />
                  <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2} name="Duration (min)" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Conversations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Duration (min)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity and Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
              <CardDescription>Conversation volume by week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversations" fill="#3b82f6" />
                  <Bar dataKey="duration" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle className="text-lg">Health Score Trend</CardTitle>
              <CardDescription>Overall Health Score</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="text-6xl font-semibold text-green-600 mb-2">8.4</div>
              <div className="text-lg text-gray-600 mb-1">Overall Health Score</div>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.8 this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">127</div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">42h</div>
            <div className="text-sm text-gray-600">Total Talk Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Health Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRecommendations = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-orange-500">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">AI-Powered Recommendations</h2>
            <p className="text-gray-600">Personalized health suggestions based on your conversation patterns</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700">3 new insights</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className={`bg-white/80 backdrop-blur-sm border-l-4 ${
              rec.type === 'error' ? 'border-l-red-500' : 
              rec.type === 'warning' ? 'border-l-orange-500' : 
              'border-l-green-500'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      rec.type === 'error' ? 'bg-red-100' : 
                      rec.type === 'warning' ? 'bg-orange-100' : 
                      'bg-green-100'
                    }`}>
                      {rec.type === 'error' ? (
                        <AlertTriangle className={`w-5 h-5 text-red-600`} />
                      ) : rec.type === 'warning' ? (
                        <Clock className={`w-5 h-5 text-orange-600`} />
                      ) : (
                        <CheckCircle className={`w-5 h-5 text-green-600`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <Badge variant={rec.priority === 'High' ? 'destructive' : rec.priority === 'Medium' ? 'secondary' : 'outline'} className="text-xs">
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span>Based on {rec.basedOn}</span>
                        <span>{rec.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {rec.actions.map((action, idx) => (
                      <Button key={idx} variant={idx === 0 ? "default" : "outline"} size="sm">
                        {action}
                      </Button>
                    ))}
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-base font-semibold shadow-sm transition">
              <Calendar className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Schedule Follow-up</div>
                <div className="text-xs text-gray-600">Book next session</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-base font-semibold shadow-sm transition">
              <Eye className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Review Conversations</div>
                <div className="text-xs text-gray-600">View chat history</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-base font-semibold shadow-sm transition">
              <Share className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Share with Doctor</div>
                <div className="text-xs text-gray-600">Export insights</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">127</div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">42h</div>
            <div className="text-sm text-gray-600">Total Talk Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Health Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVitalSigns = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-green-500">
      <CardHeader className="pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Vital Signs Tracking</h2>
          <p className="text-gray-600">Monitor your health metrics extracted from voice conversations</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${metric.color}20` }}>
                    {metric.metric === 'Heart Rate' ? <Heart className="w-6 h-6 text-red-500" /> :
                     metric.metric === 'Blood Pressure' ? <Activity className="w-6 h-6 text-green-500" /> :
                     metric.metric === 'Sleep Quality' ? <Brain className="w-6 h-6 text-purple-500" /> :
                     <AlertTriangle className="w-6 h-6 text-orange-500" />}
                  </div>
                  <Badge variant={metric.change.startsWith('+') ? 'default' : metric.change.startsWith('-') && metric.change.includes('%') ? 'secondary' : 'outline'}>
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{metric.metric}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {metric.metric === 'Heart Rate' ? 'Average BPM' :
                   metric.metric === 'Blood Pressure' ? 'Systolic/Diastolic' :
                   metric.metric === 'Sleep Quality' ? 'Average Score' : 'Daily Average'}
                </p>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-semibold text-gray-900">{metric.value}</span>
                  <span className="text-lg text-gray-600">{metric.unit}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Normal range: {metric.metric === 'Heart Rate' ? '60-100 bpm' :
                                 metric.metric === 'Blood Pressure' ? '90-120/60-80 mmHg' :
                                 metric.metric === 'Sleep Quality' ? '7-9 points' : '1-5 points'}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Last updated: {metric.metric === 'Heart Rate' ? '2 hours ago' :
                                 metric.metric === 'Blood Pressure' ? '1 day ago' :
                                 metric.metric === 'Sleep Quality' ? 'This morning' : '6 hours ago'}
                </p>
                <div className="space-y-1">
                  {metric.metric === 'Heart Rate' && (
                    <>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Consistent with healthy range
                      </div>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        No irregular patterns detected
                      </div>
                    </>
                  )}
                  {metric.metric === 'Blood Pressure' && (
                    <>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Improvement noted
                      </div>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Within optimal range
                      </div>
                    </>
                  )}
                  {metric.metric === 'Sleep Quality' && (
                    <>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sleep duration improved
                      </div>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Consistent bedtime routine
                      </div>
                    </>
                  )}
                  {metric.metric === 'Stress Level' && (
                    <>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Stress management techniques working
                      </div>
                      <div className="flex items-center text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Meditation sessions helpful
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Measurements Table */}
        <Card className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle>Recent Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Heart Rate</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Blood Pressure</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMeasurements.map((measurement, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 text-sm text-gray-900">{measurement.date}</td>
                      <td className="py-3 text-sm text-gray-700">{measurement.heartRate}</td>
                      <td className="py-3 text-sm text-gray-700">{measurement.bloodPressure}</td>
                      <td className="py-3 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {measurement.source}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">127</div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">42h</div>
            <div className="text-sm text-gray-600">Total Talk Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Health Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTopics = () => (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-purple-500">
      <CardHeader className="pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Conversation Topic Analysis</h2>
          <p className="text-gray-600">Detailed breakdown of health topics discussed in your conversations</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicAnalysis.map((topic, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${topic.color}20` }}>
                    {topic.topic === "Sleep & Rest" ? <Brain className="w-5 h-5" style={{ color: topic.color }} /> :
                     topic.topic === "Medication Management" ? <Heart className="w-5 h-5" style={{ color: topic.color }} /> :
                     topic.topic === "Physical Activity" ? <Activity className="w-5 h-5" style={{ color: topic.color }} /> :
                     topic.topic === "Nutrition & Diet" ? <Clock className="w-5 h-5" style={{ color: topic.color }} /> :
                     topic.topic === "Stress & Mental Health" ? <Brain className="w-5 h-5" style={{ color: topic.color }} /> :
                     <Activity className="w-5 h-5" style={{ color: topic.color }} />}
                  </div>
                  <Badge variant={topic.priority === 'High' ? 'destructive' : topic.priority === 'Medium' ? 'secondary' : 'outline'} className="text-xs">
                    {topic.priority}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{topic.topic}</h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversations</span>
                    <span className="font-medium">{topic.conversations}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Duration</span>
                    <span className="font-medium">{topic.avgDuration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Discussed</span>
                    <span className="font-medium">{topic.lastDiscussed}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Key Insights</h4>
                  <ul className="space-y-1">
                    {topic.insights.map((insight, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-xs capitalize text-${topic.color.replace('#', '')}`}>
                    {topic.topic.toLowerCase().replace(' & ', '-')}
                  </Badge>
                  <div className={`flex items-center text-xs font-medium ${topic.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {topic.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topic Summary */}
        <Card className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle>Topic Insights Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-semibold text-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Active Topics</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-green-600 mb-2">68</div>
                <div className="text-sm text-gray-600">Total Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-purple-600 mb-2">8.5</div>
                <div className="text-sm text-gray-600">Avg Minutes/Topic</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">127</div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">42h</div>
            <div className="text-sm text-gray-600">Total Talk Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Health Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
      <div className="container mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">Health Insights</h1>
            <p className="text-lg text-gray-500 font-medium">AI-powered analysis of your health conversations and personalized recommendations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-base font-semibold shadow-sm transition">
              <Eye className="w-5 h-5 mr-2" />
              View History
            </Button>
            <Button size="sm" className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold shadow-sm transition">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        {/* Quick Access Cards for 4 Tabs */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {insightTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveInsight(tab.id)}
              className={`group w-full h-full bg-white/80 border rounded-2xl shadow-md p-6 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none ${activeInsight === tab.id ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}
              type="button"
            >
              <tab.icon className={`w-8 h-8 mb-2 ${activeInsight === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
              <span className="text-lg font-semibold mb-1 text-gray-900">{tab.label}</span>
              <span className="text-sm text-gray-500 text-center">{tab.description}</span>
            </button>
          ))}
        </div>
        {/* Tabs and Content */}
        <Tabs value={activeInsight} onValueChange={setActiveInsight} className="space-y-8">
          <TabsContent value="trends">{renderTrends()}</TabsContent>
          <TabsContent value="recommendations">{renderRecommendations()}</TabsContent>
          <TabsContent value="vitalsigns">{renderVitalSigns()}</TabsContent>
          <TabsContent value="topics">{renderTopics()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InsightsPage;
