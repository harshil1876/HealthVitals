import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Brain, Target, TrendingUp, CheckCircle, Activity, Bed, Droplet, Utensils, BarChart3, Clock, RefreshCw, AlertTriangle, Lightbulb, MessageCircle, Eye, MoreHorizontal } from "lucide-react";
import { BarChart, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Bar } from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Example data for summary cards
  const summary = [
    { icon: <Heart className="w-6 h-6 text-blue-500" />, label: "Overall Wellness", value: "88%", change: "+12%", target: "90%" },
    { icon: <Activity className="w-6 h-6 text-green-500" />, label: "Physical Health", value: "85%", change: "+8%", target: "90%" },
    { icon: <Brain className="w-6 h-6 text-purple-500" />, label: "Mental Health", value: "90%", change: "+15%", target: "85%" },
    { icon: <Target className="w-6 h-6 text-orange-500" />, label: "Goal Achievement", value: "92%", change: "+20%", target: "80%" },
  ];

  // Example data for unified progress trends
  const trends = [
    { label: "Avg Wellness", value: "78%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Avg Sleep", value: "7.8h", color: "text-green-600", bg: "bg-green-50" },
    { label: "Avg Exercise", value: "38min", color: "text-purple-700", bg: "bg-purple-50" },
    { label: "Avg Nutrition", value: "85%", color: "text-orange-700", bg: "bg-orange-50" },
    { label: "Avg Hydration", value: "7.6L", color: "text-blue-800", bg: "bg-blue-100" },
    { label: "Avg Heart Rate", value: "74 BPM", color: "text-red-700", bg: "bg-red-50" },
  ];

  // Example data for activities and goals
  const activities = [
    { label: "Morning Meditation", time: "7:00 AM", duration: "15 min", points: 25, done: true },
    { label: "Exercise Session", time: "8:30 AM", duration: "45 min", points: 50, done: true },
    { label: "Health Check-in", time: "2:00 PM", duration: "10 min", points: 20, done: false },
    { label: "Evening Walk", time: "6:30 PM", duration: "30 min", points: 35, done: false },
  ];
  const weeklyGoals = [
    { label: "Exercise Sessions", value: 5, target: 5, color: "bg-green-500" },
    { label: "Meditation Minutes", value: 140, target: 150, color: "bg-blue-400" },
    { label: "Sleep Hours", value: 54, target: 56, color: "bg-blue-600" },
    { label: "Water Intake", value: 48, target: 56, color: "bg-blue-200" },
  ];

  // Data for Weekly Activity and Most Discussed Topics
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
    { name: 'Blood Pressure', value: 25, color: '#3b82f6' },
    { name: 'Medication', value: 20, color: '#10b981' },
    { name: 'Sleep', value: 18, color: '#8b5cf6' },
    { name: 'Exercise', value: 15, color: '#f59e0b' },
    { name: 'Nutrition', value: 12, color: '#ef4444' },
    { name: 'Stress', value: 10, color: '#8b5cf6' }
  ];
  // Health Insights data (updated for new UI)
  const healthInsights = [
    {
      title: 'Blood Pressure Trend',
      icon: <TrendingUp className="w-6 h-6 text-green-600" />, // left icon
      color: 'bg-green-100',
      border: 'border-green-200',
      text: 'Your blood pressure has been consistently improving over the past 2 weeks. Keep up the good work!',
      confidence: '92%',
      confidenceColor: 'text-green-700',
      recommendation: 'Continue with your current medication schedule and daily walks.',
      recIcon: <Lightbulb className="w-4 h-4 text-blue-500 mr-1" />,
      recBg: 'bg-green-50',
    },
    {
      title: 'Sleep Pattern Analysis',
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />, // left icon
      color: 'bg-yellow-100',
      border: 'border-yellow-200',
      text: 'Your sleep quality has decreased by 15% this week. Consider adjusting your bedtime routine.',
      confidence: '87%',
      confidenceColor: 'text-yellow-700',
      recommendation: 'Try reducing screen time 1 hour before bed and maintain consistent sleep schedule.',
      recIcon: <Lightbulb className="w-4 h-4 text-blue-500 mr-1" />,
      recBg: 'bg-yellow-50',
    },
    {
      title: 'Hydration Insight',
      icon: <Droplet className="w-6 h-6 text-blue-600" />, // left icon
      color: 'bg-blue-100',
      border: 'border-blue-200',
      text: 'You are meeting 75% of your daily water intake goal. Slight improvement needed.',
      confidence: '78%',
      confidenceColor: 'text-blue-700',
      recommendation: 'Set hourly reminders to drink water throughout the day.',
      recIcon: <Lightbulb className="w-4 h-4 text-blue-500 mr-1" />,
      recBg: 'bg-blue-50',
    },
  ];

  // Recent Conversations data (updated for new UI)
  const recentConversations = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">Health Dashboard</h1>
          <p className="text-lg text-gray-500 font-medium">Your comprehensive wellness overview</p>
        </div>
        {/* Time Range Toggle */}
        <div className="flex justify-end gap-3 mb-4">
          {['week', 'month', 'quarter'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-5 py-2 rounded-lg border text-base font-semibold shadow-sm transition-all duration-150 ${timeRange === range ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50'}`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {summary.map((s, i) => (
            <Card key={i} className="relative hover:shadow-2xl hover:scale-[1.025] transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">{s.icon}<span className="font-semibold text-2xl">{s.value}</span></div>
                  <span className="text-sm font-semibold text-green-600">{s.change}</span>
                </div>
                <div className="text-gray-800 font-semibold text-lg mb-1">{s.label}</div>
                <div className="text-xs text-gray-400">Target: {s.target}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Unified Progress Trends */}
        <Card className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-semibold"><BarChart3 className="w-6 h-6 text-blue-600" /> Unified Progress Trends</CardTitle>
            <CardDescription>Comprehensive view of all your wellness metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trends.map((t, i) => (
              <div key={i} className={`flex items-center justify-between rounded-xl px-7 py-4 mb-2 ${t.bg} shadow-sm hover:scale-[1.01] transition-transform cursor-pointer`}>
                <span className={`font-semibold text-xl ${t.color}`}>{t.value}</span>
                <span className="text-base font-semibold text-gray-700">{t.label}</span>
                <div className="flex-1 mx-6">
                  <Progress value={parseInt(t.value)} className="h-2 rounded-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Weekly Activity & Most Discussed Topics */}
        <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <CardTitle>Weekly Activity</CardTitle>
                    </div>
                    <select className="text-sm border rounded px-2 py-1" title="Select time range for weekly activity">
                      <option>This Week</option>
                      <option>Last Week</option>
                      <option>This Month</option>
                    </select>
                  </CardHeader>
                  <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <RechartsTooltip />
                    <Bar dataKey="steps" fill="#3b82f6" name="Steps" />
                    <Bar dataKey="exercise" fill="#10b981" name="Exercise (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">9,386</div>
                        <div className="text-xs text-gray-500">Avg Steps</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">7.9 glasses</div>
                        <div className="text-xs text-gray-500">Avg Water</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">7.9 hours</div>
                        <div className="text-xs text-gray-500">Avg Sleep</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">46 min</div>
                        <div className="text-xs text-gray-500">Avg Exercise</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <CardTitle>Most Discussed Topics</CardTitle>
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
                      <RechartsTooltip />
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
                      <span className="text-xs text-gray-400">{topic.value}% of conversations</span>
                    </div>
                  ))}
                </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                      <div>
                        <div className="text-2xl font-semibold text-gray-900">47</div>
                        <div className="text-xs text-gray-500">Total Conversations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-gray-900">8.5</div>
                        <div className="text-xs text-gray-500">Avg Duration (min)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-gray-900">96%</div>
                        <div className="text-xs text-gray-500">Resolution Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
        {/* Activities & Weekly Goals */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Activities */}
          <Card>
                <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" /> Today's Activities</CardTitle>
                </CardHeader>
            <CardContent className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${a.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${a.done ? 'bg-green-200' : 'bg-gray-200'}`}>{a.done ? <CheckCircle className="w-4 h-4 text-green-600" /> : <span className="w-3 h-3 bg-white rounded-full border border-gray-400 block" />}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{a.label}</div>
                      <div className="text-xs text-gray-500">{a.time} &nbsp; {a.duration} &nbsp; {a.points} pts</div>
                    </div>
                      </div>
                  {!a.done && <button className="px-3 py-1 rounded bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 hover:bg-blue-100">Start</button>}
                    </div>
              ))}
            </CardContent>
          </Card>
          {/* Weekly Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-green-600" /> Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((g, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">{g.label}</span>
                    <span className="font-semibold text-gray-900">{g.value}/{g.target} <span className="text-xs font-normal">{Math.round((g.value/g.target)*100)}%</span></span>
                  </div>
                  <Progress value={Math.round((g.value/g.target)*100)} className={`h-2 ${g.color}`} />
                </div>
              ))}
                </CardContent>
              </Card>
        </div>
        {/* Health Insights (redesigned) */}
        <Card className="mt-8">
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-2xl font-semibold text-gray-900">Health Insights</span>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </button>
          </div>
          <div className="p-6 space-y-6">
            {healthInsights.map((insight, i) => (
              <div key={i} className={`rounded-xl p-5 mb-2 flex flex-col gap-3 ${insight.color} ${insight.border}`}
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)' }}>
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>{insight.icon}</div>
                <div>
                      <div className="font-semibold text-lg text-gray-900">{insight.title}</div>
                      <div className="text-gray-700 text-base mt-1">{insight.text}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold ml-4 whitespace-nowrap">
                    <span className={insight.confidenceColor}>{insight.confidence} confidence</span>
                  </div>
                </div>
                <div className={`rounded-lg px-4 py-3 mt-2 flex items-center ${insight.recBg}`}
                  style={{ minHeight: '48px' }}>
                  {insight.recIcon}
                  <span className="font-medium text-blue-900 mr-2">AI Recommendation</span>
                  <span className="text-gray-700">{insight.recommendation}</span>
                </div>
              </div>
            ))}
                    </div>
                </Card>
        {/* Recent Conversations (redesigned) */}
        <Card className="mt-8">
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span className="text-2xl font-semibold text-gray-900">Recent Conversations</span>
                    </div>
            <button className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
              <MoreHorizontal className="w-4 h-4 mr-1" /> View All
            </button>
                    </div>
          <div className="p-6 space-y-6">
            {recentConversations.map((conv, i) => (
              <div key={i} className="rounded-xl p-5 mb-2 bg-white border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-base text-gray-900">{conv.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-700">{conv.time}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">Duration: {conv.duration}</span>
                    <span className="text-gray-400">•</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${conv.sentiment.color}`}>
                      <span className={`w-2 h-2 rounded-full ${conv.sentiment.dot}`}></span> {conv.sentiment.label}
                    </span>
              </div>
                  <div className="text-gray-700 text-sm mb-2">{conv.description}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {conv.tags.map((tag, j) => (
                      <span key={j} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{tag}</span>
                    ))}
                          </div>
                        </div>
                <div className="flex flex-col items-end gap-2 min-w-[100px]">
                  <div className="flex items-center gap-1 text-blue-600 font-semibold">
                    <TrendingUp className="w-4 h-4" /> {conv.confidence}
                          </div>
                  <button className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
                    <Eye className="w-4 h-4" /> View
                  </button>
                          </div>
                        </div>
            ))}
                        </div>
              </Card>
      </div>
    </div>
  );
};

export default Dashboard;
