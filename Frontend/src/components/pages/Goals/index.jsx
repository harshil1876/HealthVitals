
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

// Import the new component files
import GoalsOverview from "./components/GoalsOverview";
import AddGoalModal from "./components/AddGoalModal";
import ActiveGoals from "./components/ActiveGoals";
import CompletedGoals from "./components/CompletedGoals";

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
      <GoalsOverview 
        activeGoals={activeGoals}
        completedGoals={completedGoals}
        averageProgress={averageProgress}
        goals={goals}
      />

      {/* Add Goal Modal */}
      <AddGoalModal 
        showAddGoal={showAddGoal}
        newGoal={newGoal}
        setNewGoal={setNewGoal}
        handleAddGoal={handleAddGoal}
        setShowAddGoal={setShowAddGoal}
      />

      {/* Active Goals */}
      <div className="px-6 mb-8">
        <ActiveGoals activeGoals={activeGoals} deleteGoal={deleteGoal} />
      </div>

      {/* Completed Goals */}
      <div className="px-6">
        <CompletedGoals completedGoals={completedGoals} deleteGoal={deleteGoal} />
      </div>
    </div>
  );
};

export default GoalsPage;
