import { Card, CardContent } from "@/components/ui/card";
import { Target, Award, TrendingUp, Calendar } from "lucide-react";

const GoalsOverview = ({ activeGoals, completedGoals, averageProgress, goals }) => {
  return (
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
  );
};

export default GoalsOverview; 