import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActionsCard = ({ quickActions }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <Zap className="w-5 h-5 text-blue-600" />
        <CardTitle>Quick Actions</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500 mt-1">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default QuickActionsCard; 