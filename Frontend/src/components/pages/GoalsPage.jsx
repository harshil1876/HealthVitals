
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Target, 
  Award, 
  Clock, 
  Edit, 
  Trash2,
  TrendingUp,
  Calendar,
  Activity,
  Heart,
  Brain,
  Droplets
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GoalsPage = ({ user }) => {
  const { toast } = useToast();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    category: 'health',
    deadline: ''
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Exercise 5 times per week",
      description: "Maintain consistent physical activity to improve overall health",
      target: 5,
      current: 3,
      deadline: "2024-12-31",
      progress: 60,
      category: "fitness",
      icon: Activity,
      color: "blue",
      streak: 7
    },
    {
      id: 2,
      title: "Get 8 hours of sleep daily",
      description: "Improve sleep quality and maintain consistent sleep schedule",
      target: 8,
      current: 7.2,
      deadline: "2024-12-31",
      progress: 90,
      category: "sleep",
      icon: Clock,
      color: "purple",
      streak: 12
    },
    {
      id: 3,
      title: "Meditate for 20 minutes daily",
      description: "Practice mindfulness and reduce stress through meditation",
      target: 20,
      current: 15,
      deadline: "2024-12-31",
      progress: 75,
      category: "mental",
      icon: Brain,
      color: "green",
      streak: 5
    },
    {
      id: 4,
      title: "Drink 8 glasses of water daily",
      description: "Stay properly hydrated throughout the day",
      target: 8,
      current: 6.5,
      deadline: "2024-12-31",
      progress: 81,
      category: "nutrition",
      icon: Droplets,
      color: "cyan",
      streak: 9
    }
  ]);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      toast({
        title: "Missing Information",
        description: "Please fill in the goal title and target.",
        variant: "destructive"
      });
      return;
    }

    const goal = {
      id: Date.now(),
      ...newGoal,
      target: parseFloat(newGoal.target),
      current: 0,
      progress: 0,
      icon: Activity,
      color: "blue",
      streak: 0
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', target: '', category: 'health', deadline: '' });
    setShowAddGoal(false);
    
    toast({
      title: "Goal Added",
      description: "Your new goal has been created successfully!",
    });
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal Deleted",
      description: "The goal has been removed from your list.",
    });
  };

  const completedGoals = goals.filter(goal => goal.progress >= 100);
  const activeGoals = goals.filter(goal => goal.progress < 100);
  const averageProgress = goals.length > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">Goals & Objectives</h1>
          <p className="text-lg text-gray-500 font-medium">Track and achieve your wellness objectives</p>
        </div>
        <Button 
          onClick={() => setShowAddGoal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg rounded-lg px-6 py-3 text-base font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Goal
        </Button>
      </div>
      {/* Goals Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-10 px-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-2xl hover:scale-[1.025] transition-transform">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-semibold text-blue-900 mb-2">{activeGoals.length}</p>
            <p className="text-blue-700 font-semibold">Active Goals</p>
            <p className="text-xs text-blue-600 mt-1">Currently working on</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-2xl hover:scale-[1.025] transition-transform">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-semibold text-green-900 mb-2">{completedGoals.length}</p>
            <p className="text-green-700 font-semibold">Completed</p>
            <p className="text-xs text-green-600 mt-1">Successfully achieved</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-2xl hover:scale-[1.025] transition-transform">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-semibold text-purple-900 mb-2">{averageProgress}%</p>
            <p className="text-purple-700 font-semibold">Avg Progress</p>
            <p className="text-xs text-purple-600 mt-1">Across all goals</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg hover:shadow-2xl hover:scale-[1.025] transition-transform">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-3xl font-semibold text-orange-900 mb-2">
              {Math.max(...goals.map(g => g.streak), 0)}
            </p>
            <p className="text-orange-700 font-semibold">Best Streak</p>
            <p className="text-xs text-orange-600 mt-1">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <Card className="bg-white shadow-2xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle>Add New Goal</CardTitle>
            <CardDescription className="text-blue-100">Create a new wellness objective to track</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Goal Title</label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="e.g., Exercise 3 times per week"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Describe your goal in detail..."
                className="w-full"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target Value</label>
                <Input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="e.g., 5"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Deadline</label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal} className="bg-blue-600 hover:bg-blue-700">
                Add Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
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
                        <p className="text-gray-600">{goal.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {goal.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(goal.deadline).toLocaleDateString()}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center">
                            🔥 {goal.streak} day streak
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteGoal(goal.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Target:</span> {goal.target} {goal.category === 'fitness' ? 'sessions/week' : goal.category === 'sleep' ? 'hours' : goal.category === 'nutrition' ? 'glasses' : 'minutes'}
                    </div>
                    <div>
                      <span className="font-medium">Current:</span> {goal.current} {goal.category === 'fitness' ? 'sessions' : goal.category === 'sleep' ? 'hours' : goal.category === 'nutrition' ? 'glasses' : 'minutes'}
                    </div>
                    <div>
                      <span className="font-medium">Remaining:</span> {Math.max(0, goal.target - goal.current)} {goal.category === 'fitness' ? 'sessions' : goal.category === 'sleep' ? 'hours' : goal.category === 'nutrition' ? 'glasses' : 'minutes'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{goal.progress}%</span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className={`h-3 ${goal.progress >= 80 ? 'progress-green' : goal.progress >= 50 ? 'progress-yellow' : 'progress-red'}`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {activeGoals.length === 0 && (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Goals</h3>
              <p className="text-gray-600 mb-4">Start your wellness journey by adding your first goal!</p>
              <Button onClick={() => setShowAddGoal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Goal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsPage;
