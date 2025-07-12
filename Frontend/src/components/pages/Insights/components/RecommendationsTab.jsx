import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const RecommendationsTab = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-orange-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">AI-Powered Recommendations</CardTitle>
        <CardDescription className="text-gray-600">Personalized suggestions based on your health conversations and patterns</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          {recommendations.map((recommendation, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200 border-l-4 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getTypeIcon(recommendation.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
                        <Badge className={`ml-2 ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority} Priority
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Based on {recommendation.basedOn}</span>
                      <span>•</span>
                      <span>{recommendation.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {recommendation.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action === "Take Action" ? "default" : "outline"}
                        size="sm"
                        className={action === "Take Action" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab; 