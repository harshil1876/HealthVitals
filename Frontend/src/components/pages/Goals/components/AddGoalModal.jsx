import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddGoalModal = ({ showAddGoal, newGoal, setNewGoal, handleAddGoal, setShowAddGoal }) => {
  if (!showAddGoal) return null;

  return (
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
  );
};

export default AddGoalModal; 