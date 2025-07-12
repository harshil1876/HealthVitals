import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Edit, Trash2, CheckCircle } from "lucide-react";

const CompletedGoals = ({ completedGoals, deleteGoal }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-green-600" />
          <span>Completed Goals</span>
        </CardTitle>
        <CardDescription>Your successfully achieved wellness objectives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {completedGoals.map((goal) => {
          const IconComponent = goal.icon;
          return (
            <Card key={goal.id} className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow bg-green-50/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{goal.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Target: {goal.target}</span>
                        <span>Achieved: {goal.current}</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
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
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="flex items-center text-green-800 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Goal achieved! Great job on maintaining consistency.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {completedGoals.length === 0 && (
          <div className="text-center py-8">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Goals</h3>
            <p className="text-gray-600">Complete your first goal to see it here!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletedGoals; 