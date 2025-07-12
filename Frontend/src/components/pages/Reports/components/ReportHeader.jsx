import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportHeader = ({ 
  selectedPeriod, 
  setSelectedPeriod, 
  getText = (en, hi) => en 
}) => {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: `Your ${selectedPeriod} wellness report has been downloaded successfully.`,
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Report Shared",
      description: "Your wellness report link has been copied to clipboard.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-6">
      <div>
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-1">
          {getText("Weekly Wellness Report", "साप्ताहिक कल्याण रिपोर्ट")}
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          {getText("Your comprehensive wellness insights and analytics", "आपकी व्यापक कल्याण अंतर्दृष्टि और विश्लेषण")}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
          <TabsList className="bg-white border rounded-lg shadow-sm">
            <TabsTrigger value="week">{getText("This Week", "इस सप्ताह")}</TabsTrigger>
            <TabsTrigger value="month">{getText("This Month", "इस महीने")}</TabsTrigger>
            <TabsTrigger value="quarter">{getText("3 Months", "3 महीने")}</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" onClick={handleShareReport} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition">
          <Share2 className="w-4 h-4" />
          <span>{getText("Share", "साझा करें")}</span>
        </Button>
        <Button onClick={handleDownloadReport} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 rounded-lg text-white text-sm font-medium shadow-sm transition">
          <Download className="w-4 h-4" />
          <span>{getText("Download PDF", "PDF डाउनलोड करें")}</span>
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader; 