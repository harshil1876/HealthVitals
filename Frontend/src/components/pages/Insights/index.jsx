
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

// Import the new component files
import TrendsTab from "./components/TrendsTab";
import RecommendationsTab from "./components/RecommendationsTab";
import TopicsTab from "./components/TopicsTab";
import AnalyticsTab from "./components/AnalyticsTab";

const InsightsPage = ({ user }) => {
  const [activeInsight, setActiveInsight] = useState("trends");
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Analytics data from Analytics page
  const emotionalTrendsData = [
    { 
      date: '2024-01-01', 
      happiness: 7.2, 
      stress: 4.1, 
      anxiety: 3.2, 
      energy: 6.8, 
      confidence: 7.5,
      motivation: 6.9,
      relaxation: 7.1
    },
    { 
      date: '2024-01-02', 
      happiness: 8.1, 
      stress: 3.5, 
      anxiety: 2.8, 
      energy: 7.5, 
      confidence: 8.2,
      motivation: 7.8,
      relaxation: 7.9
    },
    { 
      date: '2024-01-03', 
      happiness: 6.5, 
      stress: 5.2, 
      anxiety: 4.1, 
      energy: 5.9, 
      confidence: 6.8,
      motivation: 6.2,
      relaxation: 6.4
    },
    { 
      date: '2024-01-04', 
      happiness: 8.8, 
      stress: 2.8, 
      anxiety: 2.1, 
      energy: 8.2, 
      confidence: 9.1,
      motivation: 8.5,
      relaxation: 8.7
    },
    { 
      date: '2024-01-05', 
      happiness: 7.9, 
      stress: 3.2, 
      anxiety: 2.5, 
      energy: 7.8, 
      confidence: 8.0,
      motivation: 7.6,
      relaxation: 8.1
    },
    { 
      date: '2024-01-06', 
      happiness: 8.5, 
      stress: 2.5, 
      anxiety: 1.9, 
      energy: 8.8, 
      confidence: 8.9,
      motivation: 8.8,
      relaxation: 9.2
    },
    { 
      date: '2024-01-07', 
      happiness: 8.9, 
      stress: 2.2, 
      anxiety: 1.7, 
      energy: 9.1, 
      confidence: 9.2,
      motivation: 9.0,
      relaxation: 9.0
    }
  ];

  const wellnessTrendsData = [
    { 
      month: 'Jan', 
      physical: 75, 
      mental: 78, 
      emotional: 72, 
      social: 68,
      overall: 73.2,
      sleep: 7.2,
      exercise: 65,
      nutrition: 78
    },
    { 
      month: 'Feb', 
      physical: 78, 
      mental: 82, 
      emotional: 75, 
      social: 72,
      overall: 76.8,
      sleep: 7.5,
      exercise: 72,
      nutrition: 82
    },
    { 
      month: 'Mar', 
      physical: 82, 
      mental: 85, 
      emotional: 78, 
      social: 75,
      overall: 80.0,
      sleep: 7.8,
      exercise: 78,
      nutrition: 85
    },
    { 
      month: 'Apr', 
      physical: 85, 
      mental: 88, 
      emotional: 82, 
      social: 78,
      overall: 83.2,
      sleep: 8.0,
      exercise: 82,
      nutrition: 88
    },
    { 
      month: 'May', 
      physical: 88, 
      mental: 90, 
      emotional: 85, 
      social: 82,
      overall: 86.2,
      sleep: 8.2,
      exercise: 85,
      nutrition: 90
    },
    { 
      month: 'Jun', 
      physical: 90, 
      mental: 92, 
      emotional: 88, 
      social: 85,
      overall: 88.8,
      sleep: 8.5,
      exercise: 88,
      nutrition: 92
    }
  ];

  const comparisonData = [
    { metric: 'Physical Health', you: 85, average: 72, optimal: 90 },
    { metric: 'Mental Wellness', you: 88, average: 75, optimal: 90 },
    { metric: 'Sleep Quality', you: 82, average: 68, optimal: 85 },
    { metric: 'Nutrition Score', you: 78, average: 65, optimal: 85 },
    { metric: 'Activity Level', you: 92, average: 70, optimal: 85 }
  ];

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
    { id: "topics", label: "Topics", icon: MessageSquare, description: "Conversation analysis" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "Detailed analytics dashboard" }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Health Insights</h1>
          <p className="text-gray-600">AI-powered analysis of your health conversations and patterns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share Insights</span>
          </Button>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightTabs.map((tab) => (
          <Card key={tab.id} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => setActiveInsight(tab.id)}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <tab.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tab.label}</h3>
                  <p className="text-sm text-gray-600">{tab.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeInsight} onValueChange={setActiveInsight}>
        <TabsList className="grid grid-cols-4 gap-2 mb-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="trends">
          <TrendsTab conversationData={conversationData} weeklyActivityData={weeklyActivityData} />
        </TabsContent>
        <TabsContent value="recommendations">
          <RecommendationsTab recommendations={recommendations} />
        </TabsContent>
        <TabsContent value="topics">
          <TopicsTab topicAnalysis={topicAnalysis} />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab 
            wellnessTrendsData={wellnessTrendsData} 
            emotionalTrendsData={emotionalTrendsData} 
            comparisonData={comparisonData} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
