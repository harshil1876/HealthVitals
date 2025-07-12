import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const AIHealthTips = ({ aiHealthTips }) => (
  <Card className="mt-6">
    <div className="flex items-center gap-2 px-6 pt-6">
      <Sparkles className="w-6 h-6 text-blue-400" />
      <span className="text-2xl font-semibold text-gray-900">AI Health Tips</span>
    </div>
    <div className="p-6 pt-4 grid md:grid-cols-3 gap-4">
      {aiHealthTips.map((tip, i) => (
        <div key={i} className="rounded-lg bg-blue-50/40 border border-blue-100 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            {tip.icon}
            <span className="font-semibold text-blue-600 text-base">{tip.category}</span>
          </div>
          <div className="text-gray-700 text-sm">{tip.tip}</div>
        </div>
      ))}
    </div>
  </Card>
);

export default AIHealthTips; 