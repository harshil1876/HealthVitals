import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmotionalTrendsChart = ({ emotionalTrendsData, getText = (en, hi) => en }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg mx-6 mb-10">
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
            <div className="text-lg font-semibold text-green-900">+12%</div>
            <div className="text-xs text-green-700">{getText("Positive Emotions", "सकारात्मक भावनाएं")}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-900">-15%</div>
            <div className="text-xs text-blue-700">{getText("Stress Levels", "तनाव का स्तर")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalTrendsChart; 