import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const EmotionalPatternsCard = ({ emotionalPatterns, getText = (en, hi) => en }) => {
  return (
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
  );
};

export default EmotionalPatternsCard; 