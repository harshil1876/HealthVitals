import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock } from "lucide-react";

const TopicsTab = ({ topicAnalysis }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendColor = (trend) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-green-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">Conversation Topics Analysis</CardTitle>
        <CardDescription className="text-gray-600">Detailed breakdown of your health conversations by topic and insights</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {topicAnalysis.map((topic, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.topic}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getPriorityColor(topic.priority)}>
                        {topic.priority} Priority
                      </Badge>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className={getTrendColor(topic.trend)}>{topic.trend}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900">{topic.conversations}</div>
                    <div className="text-sm text-gray-600">conversations</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Duration:</span>
                    <span className="font-medium">{topic.avgDuration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Discussed:</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-gray-400" />
                      <span className="text-gray-600">{topic.lastDiscussed}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Insights:</h4>
                  <ul className="space-y-1">
                    {topic.insights.map((insight, insightIndex) => (
                      <li key={insightIndex} className="text-sm text-gray-600 flex items-start">
                        <div 
                          className="w-2 h-2 rounded-full mt-2 mr-2 flex-shrink-0" 
                          style={{ backgroundColor: topic.color }}
                        ></div>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicsTab; 