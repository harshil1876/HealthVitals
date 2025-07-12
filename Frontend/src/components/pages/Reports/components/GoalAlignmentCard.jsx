import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Activity, Clock, Brain, Heart } from "lucide-react";

const GoalAlignmentCard = ({ goalAlignment }) => {
  const getIconComponent = (iconName) => {
    const iconMap = {
      Activity,
      Clock,
      Brain,
      Heart
    };
    return iconMap[iconName] || Target;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg mx-6 mb-10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-green-600" />
          <span>Goal Alignment</span>
        </CardTitle>
        <CardDescription>How well your activities aligned with your wellness goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {goalAlignment.map((goal, index) => {
            const IconComponent = getIconComponent(goal.icon.name);
            return (
              <div key={index} className={`text-center p-4 bg-${goal.color}-50 rounded-lg border border-${goal.color}-200 hover:shadow-lg transition-shadow`}>
                <div className={`w-12 h-12 bg-${goal.color}-200 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className={`w-6 h-6 text-${goal.color}-600`} />
                </div>
                <div className={`text-2xl font-semibold text-${goal.color}-900 mb-1`}>{goal.percentage}%</div>
                <div className={`text-sm text-${goal.color}-700 mb-1`}>{goal.goal}</div>
                <div className={`text-xs text-${goal.color}-600`}>{goal.status}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalAlignmentCard; 