import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Heart, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const AnalyticsTab = ({ wellnessTrendsData, emotionalTrendsData, comparisonData }) => {
  return (
    <div className="space-y-6">
      {/* Page Heading and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Analytics Dashboard</h1>
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
        </div>
      </div>

      {/* Wellness Trend & Progress Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>Wellness Trend & Progress Visualization</span>
          </CardTitle>
          <CardDescription>
            Comprehensive view of your wellness journey over time
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
                <Area type="monotone" dataKey="physical" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Physical" />
                <Area type="monotone" dataKey="mental" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Mental" />
                <Area type="monotone" dataKey="emotional" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Emotional" />
                <Area type="monotone" dataKey="social" stackId="4" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Social" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-2xl font-semibold text-green-900">88%</div>
              <div className="text-sm text-green-700">Physical Health</div>
              <div className="text-xs text-green-600">↗ +12% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-semibold text-blue-900">92%</div>
              <div className="text-sm text-blue-700">Mental Health</div>
              <div className="text-xs text-blue-600">↗ +8% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-semibold text-purple-900">85%</div>
              <div className="text-sm text-purple-700">Emotional Health</div>
              <div className="text-xs text-purple-600">↗ +15% vs last month</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div className="text-2xl font-semibold text-orange-900">82%</div>
              <div className="text-sm text-orange-700">Social Health</div>
              <div className="text-xs text-orange-600">↗ +10% vs last month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emotional Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-600" />
            <span>Emotional Trends</span>
          </CardTitle>
          <CardDescription>Track your emotional well-being over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionalTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="happiness" stroke="#10b981" strokeWidth={2} name="Happiness" />
                <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" strokeWidth={2} name="Anxiety" />
                <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="confidence" stroke="#8b5cf6" strokeWidth={2} name="Confidence" />
                <Line type="monotone" dataKey="motivation" stroke="#06b6d4" strokeWidth={2} name="Motivation" />
                <Line type="monotone" dataKey="relaxation" stroke="#84cc16" strokeWidth={2} name="Relaxation" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Performance Comparison</span>
          </CardTitle>
          <CardDescription>How you compare to average and optimal levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.metric}</div>
                  <div className="text-sm text-gray-600">Your score: {item.you}%</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Average</div>
                    <div className="font-medium text-gray-900">{item.average}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Optimal</div>
                    <div className="font-medium text-green-600">{item.optimal}%</div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(item.you / item.optimal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab; 