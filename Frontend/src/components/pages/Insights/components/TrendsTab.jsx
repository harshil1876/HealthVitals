import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const TrendsTab = ({ conversationData, weeklyActivityData }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">Health Insights & Analytics</CardTitle>
        <CardDescription className="text-gray-600">AI-powered analysis of your health conversations and personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
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
};

export default TrendsTab; 