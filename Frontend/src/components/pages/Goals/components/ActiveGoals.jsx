import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Edit, Trash2, Clock } from "lucide-react";

const ActiveGoals = ({ activeGoals, deleteGoal }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-blue-600" />
          <span>Active Goals</span>
        </CardTitle>
        <CardDescription>Your current wellness objectives and progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeGoals.map((goal) => {
          const IconComponent = goal.icon;
          return (
            <Card key={goal.id} className={`border-l-4 border-l-${goal.color}-500 shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${goal.color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${goal.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{goal.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Target: {goal.target}</span>
                        <span>Current: {goal.current}</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`bg-${goal.color}-100 text-${goal.color}-800`}>
                      {goal.streak} day streak
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{goal.current} / {goal.target}</span>
                    <span>{goal.target - goal.current} remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {activeGoals.length === 0 && (
          <div className="text-center py-8">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Goals</h3>
            <p className="text-gray-600">Start by adding your first wellness goal!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveGoals; 