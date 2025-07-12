import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

const WeeklyGoals = ({ weeklyGoals }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-green-600" /> Weekly Goals</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {weeklyGoals.map((g, i) => (
        <div key={i} className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-800">{g.label}</span>
            <span className="font-semibold text-gray-900">{g.value}/{g.target} <span className="text-xs font-normal">{Math.round((g.value/g.target)*100)}%</span></span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${g.color}`} style={{ width: `${Math.round((g.value/g.target)*100)}%` }}></div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default WeeklyGoals; 