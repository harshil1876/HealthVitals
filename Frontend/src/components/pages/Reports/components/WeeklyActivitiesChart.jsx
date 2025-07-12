import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyActivitiesChart = ({ weeklyActivities }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg mx-6 mb-10">
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
            <BarChart data={weeklyActivities}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="activity" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="percentage" fill="#3b82f6" name="Percentage" />
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
  );
};

export default WeeklyActivitiesChart; 