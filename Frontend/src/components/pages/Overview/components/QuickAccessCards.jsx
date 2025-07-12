import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickAccessCards = ({ setActiveTab, getText }) => (
  <div className="grid md:grid-cols-3 gap-6 mb-8">
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("symptom")}> 
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Symptoscan-Pro</h3>
            <p className="text-gray-600">{getText("Symptom Analysis", "लक्षण विश्लेषण")}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          {getText("Get AI-powered health insights and symptom analysis with personalized recommendations.", "व्यक्तिगत सिफारिशों के साथ AI-संचालित स्वास्थ्य अंतर्दृष्टि और लक्षण विश्लेषण प्राप्त करें।")}
        </p>
        <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
          {getText("Start Analysis", "विश्लेषण शुरू करें")}
        </Button>
      </CardContent>
    </Card>
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("lifestyle")}> 
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{getText("Lifestyle Coach", "जीवनशैली कोच")}</h3>
            <p className="text-gray-600">{getText("Wellness Guidance", "कल्याण मार्गदर्शन")}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          {getText("Receive personalized lifestyle coaching and wellness tips tailored to your needs.", "अपनी आवश्यकताओं के अनुरूप व्यक्तिगत जीवनशैली कोचिंग और कल्याण सुझाव प्राप्त करें।")}
        </p>
        <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
          {getText("Get Coaching", "कोचिंग प्राप्त करें")}
        </Button>
      </CardContent>
    </Card>
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setActiveTab("persona")}> 
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">PersonaAI</h3>
            <p className="text-gray-600">{getText("Assessment Engine", "मूल्यांकन इंजन")}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          {getText("Take intelligent assessments and receive personalized feedback on your wellness journey.", "बुद्धिमान मूल्यांकन लें और अपनी कल्याण यात्रा पर व्यक्तिगत प्रतिक्रिया प्राप्त करें।")}
        </p>
        <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
          {getText("Start Assessment", "मूल्यांकन शुरू करें")}
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default QuickAccessCards; 