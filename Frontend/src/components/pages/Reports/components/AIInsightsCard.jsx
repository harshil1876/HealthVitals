import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target } from "lucide-react";

const AIInsightsCard = ({ aiInsights }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <span>AI Insights & Recommendations</span>
        </CardTitle>
        <CardDescription>Advanced AI analysis of your wellness patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiInsights.map((insight, index) => (
          <div key={index} className={`p-4 rounded-lg border-l-4 ${insight.priority === 'high' ? 'border-l-red-500 bg-red-50' : 'border-l-yellow-500 bg-yellow-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{insight.category}</h4>
              <div className="flex items-center space-x-2">
                <Badge variant={insight.priority === 'high' ? "destructive" : "secondary"}>
                  {insight.priority}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
            <div className="flex items-start space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 font-medium">{insight.recommendation}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Impact: {insight.impact}</span>
              <span>AI Confidence: {insight.confidence}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard; 