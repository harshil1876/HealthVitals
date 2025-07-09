import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Heart, 
  BarChart3, 
  TrendingUp, 
  Users
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const AnalyticsPage = ({ user, currentLanguage = "English", getText = (en, hi) => en }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Enhanced emotional trends data
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

  // Enhanced wellness trends data
  const wellnessTrendsData = [
    { 
      month: getText('Jan', 'जन'), 
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
      month: getText('Feb', 'फ़र'), 
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
      month: getText('Mar', 'मार'), 
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
      month: getText('Apr', 'अप्र'), 
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
      month: getText('May', 'मई'), 
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
      month: getText('Jun', 'जून'), 
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

  const healthMetrics = [
    { name: getText('Blood Pressure', 'रक्तचाप'), current: 118, optimal: 120, unit: 'mmHg', trend: 'down', color: '#10b981' },
    { name: getText('Heart Rate', 'हृदय गति'), current: 72, optimal: 75, unit: 'BPM', trend: 'stable', color: '#3b82f6' },
    { name: getText('Weight', 'वजन'), current: 68.5, optimal: 70, unit: 'kg', trend: 'down', color: '#8b5cf6' },
    { name: getText('BMI', 'बीएमआई'), current: 22.4, optimal: 23, unit: '', trend: 'stable', color: '#f59e0b' },
    { name: getText('Sleep Quality', 'नींद की गुणवत्ता'), current: 85, optimal: 90, unit: '%', trend: 'up', color: '#06b6d4' },
    { name: getText('Stress Level', 'तनाव स्तर'), current: 3.2, optimal: 2.5, unit: '/10', trend: 'down', color: '#ef4444' }
  ];

  const activityData = [
    { day: getText('Mon', 'सोम'), steps: 8200, calories: 2100, activeMinutes: 45, waterIntake: 2.1 },
    { day: getText('Tue', 'मंग'), steps: 9500, calories: 2250, activeMinutes: 60, waterIntake: 2.5 },
    { day: getText('Wed', 'बुध'), steps: 7800, calories: 1950, activeMinutes: 30, waterIntake: 1.8 },
    { day: getText('Thu', 'गुरु'), steps: 10200, calories: 2400, activeMinutes: 75, waterIntake: 2.8 },
    { day: getText('Fri', 'शुक्र'), steps: 9800, calories: 2300, activeMinutes: 55, waterIntake: 2.6 },
    { day: getText('Sat', 'शनि'), steps: 12000, calories: 2600, activeMinutes: 90, waterIntake: 3.2 },
    { day: getText('Sun', 'रवि'), steps: 8500, calories: 2000, activeMinutes: 40, waterIntake: 2.2 }
  ];

  const comparisonData = [
    { metric: getText('Physical Health', 'शारीरिक स्वास्थ्य'), you: 85, average: 72, optimal: 90 },
    { metric: getText('Mental Wellness', 'मानसिक कल्याण'), you: 88, average: 75, optimal: 90 },
    { metric: getText('Sleep Quality', 'नींद की गुणवत्ता'), you: 82, average: 68, optimal: 85 },
    { metric: getText('Nutrition Score', 'पोषण स्कोर'), you: 78, average: 65, optimal: 85 },
    { metric: getText('Activity Level', 'गतिविधि स्तर'), you: 92, average: 70, optimal: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 text-base">Comprehensive view of your wellness journey and insights</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            View History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-sm transition">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Export Report
          </button>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      {/* Wellness Trend & Progress Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>{getText("Wellness Trend & Progress Visualization", "कल्याण रुझान और प्रगति विज़ुअलाइज़ेशन")}</span>
          </CardTitle>
          <CardDescription>
            {getText("Comprehensive view of your wellness journey over time", "समय के साथ आपकी कल्याण यात्रा का व्यापक दृश्य")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wellnessTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="physical" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name={getText("Physical", "शारीरिक")} />
                <Area type="monotone" dataKey="mental" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name={getText("Mental", "मानसिक")} />
                <Area type="monotone" dataKey="emotional" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name={getText("Emotional", "भावनात्मक")} />
                <Area type="monotone" dataKey="social" stackId="4" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name={getText("Social", "सामाजिक")} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-900">88%</div>
              <div className="text-sm text-green-700">{getText("Physical Health", "शारीरिक स्वास्थ्य")}</div>
              <div className="text-xs text-green-600">↗ +12% {getText("vs last month", "बनाम पिछला महीना")}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">92%</div>
              <div className="text-sm text-blue-700">{getText("Mental Health", "मानसिक स्वास्थ्य")}</div>
              <div className="text-xs text-blue-600">↗ +8% {getText("vs last month", "बनाम पिछला महीना")}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">85%</div>
              <div className="text-sm text-purple-700">{getText("Emotional Health", "भावनात्मक स्वास्थ्य")}</div>
              <div className="text-xs text-purple-600">↗ +15% {getText("vs last month", "बनाम पिछला महीना")}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div className="text-2xl font-bold text-orange-900">82%</div>
              <div className="text-sm text-orange-700">{getText("Social Health", "सामाजिक स्वास्थ्य")}</div>
              <div className="text-xs text-orange-600">↗ +10% {getText("vs last month", "बनाम पिछला महीना")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emotional Trends Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-600" />
            <span>{getText("Emotional Trends Over Time", "समय के साथ भावनात्मक रुझान")}</span>
          </CardTitle>
          <CardDescription>
            {getText("Track your emotional wellbeing patterns and identify trends", "अपने भावनात्मक कल्याण पैटर्न को ट्रैक करें और रुझानों की पहचान करें")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionalTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#6b7280" domain={[0, 10]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="happiness" stroke="#10b981" strokeWidth={3} name={getText("Happiness", "खुशी")} />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name={getText("Stress", "तनाव")} />
                <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" strokeWidth={2} name={getText("Anxiety", "चिंता")} />
                <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name={getText("Energy", "ऊर्जा")} />
                <Line type="monotone" dataKey="confidence" stroke="#8b5cf6" strokeWidth={2} name={getText("Confidence", "आत्मविश्वास")} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-green-900">{getText("Happiness Trend", "खुशी की प्रवृत्ति")}</h4>
                <Badge className="bg-green-100 text-green-800">↗ +18%</Badge>
              </div>
              <p className="text-sm text-green-700">
                {getText("Your happiness levels have increased significantly over the past week.", "आपकी खुशी का स्तर पिछले सप्ताह में काफी बढ़ा है।")}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">{getText("Energy Levels", "ऊर्जा स्तर")}</h4>
                <Badge className="bg-blue-100 text-blue-800">↗ +22%</Badge>
              </div>
              <p className="text-sm text-blue-700">
                {getText("Your energy levels are consistently improving with better sleep patterns.", "बेहतर नींद पैटर्न के साथ आपकी ऊर्जा का स्तर लगातार सुधार रहा है।")}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-red-900">{getText("Stress Reduction", "तनाव में कमी")}</h4>
                <Badge className="bg-red-100 text-red-800">↓ -35%</Badge>
              </div>
              <p className="text-sm text-red-700">
                {getText("Stress levels have decreased notably due to regular meditation practice.", "नियमित ध्यान अभ्यास के कारण तनाव का स्तर काफी कम हो गया है।")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Health Metrics & Weekly Activity Summary */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>{getText("Key Health Metrics", "मुख्य स्वास्थ्य मेट्रिक्स")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: metric.color }}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-sm text-gray-500">
                      {getText("Optimal", "इष्टतम")}: {metric.optimal}{metric.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {metric.current}{metric.unit}
                  </div>
                  <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                    {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↓' : '→'} {metric.trend}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>{getText("Weekly Activity Summary", "साप्ताहिक गतिविधि सारांश")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" name={getText("Steps", "कदम")} />
                  <Bar dataKey="activeMinutes" fill="#10b981" name={getText("Active Minutes", "सक्रिय मिनट")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>{getText("Performance Comparison", "प्रदर्शन तुलना")}</span>
          </CardTitle>
          <CardDescription>
            {getText("How you compare to average users and optimal targets", "आप औसत उपयोगकर्ताओं और इष्टतम लक्ष्यों की तुलना में कैसे हैं")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">{item.metric}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-blue-600">{getText("You", "आप")}: {item.you}%</span>
                    <span className="text-gray-500">{getText("Average", "औसत")}: {item.average}%</span>
                    <span className="text-green-600">{getText("Optimal", "इष्टतम")}: {item.optimal}%</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 bg-blue-500 rounded-full relative"
                      style={{ width: `${item.you}%` }}
                    >
                      <div className="absolute right-0 top-0 h-full w-1 bg-blue-700 rounded-r-full"></div>
                    </div>
                  </div>
                  <div 
                    className="absolute top-0 h-3 w-0.5 bg-gray-400"
                    style={{ left: `${item.average}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 h-3 w-0.5 bg-green-500"
                    style={{ left: `${item.optimal}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
