import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus } from "lucide-react";

const RecentInsightsCard = ({ getText }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <CardTitle>{getText("Recent Insights", "हाल की अंतर्दृष्टि")}</CardTitle>
      </div>
      <Button variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-1" />
        {getText("View All", "सभी देखें")}
      </Button>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Recent insights content can be added here in the future */}
    </CardContent>
  </Card>
);

export default RecentInsightsCard; 