import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Award, Calendar, Target } from "lucide-react";

const ReportSummaryCard = ({ user }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl mx-6 mb-10 hover:scale-[1.01] transition-transform">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl mb-2 font-semibold">Weekly Wellness Report</CardTitle>
            <CardDescription className="text-blue-100">
              {new Date().toLocaleDateString()} - Comprehensive wellness insights for {user?.name}
            </CardDescription>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-semibold mb-1">85%</div>
            <div className="text-blue-100 text-base">Overall Wellness</div>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">+12% improvement</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold mb-1">5/5</div>
            <div className="text-blue-100 text-sm">Goals Achieved</div>
            <div className="flex items-center justify-center mt-1">
              <Award className="w-3 h-3 mr-1" />
              <span className="text-xs">Perfect week!</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold mb-1">7</div>
            <div className="text-blue-100 text-sm">Active Days</div>
            <div className="flex items-center justify-center mt-1">
              <Calendar className="w-3 h-3 mr-1" />
              <span className="text-xs">Daily engagement</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold mb-1">15</div>
            <div className="text-blue-100 text-sm">Day Streak</div>
            <div className="flex items-center justify-center mt-1">
              <Target className="w-3 h-3 mr-1" />
              <span className="text-xs">Personal best!</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummaryCard; 