import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";

const TodaysActivities = ({ activities }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" /> Today's Activities</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {activities.map((a, i) => (
        <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${a.done ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${a.done ? 'bg-green-200' : 'bg-gray-200'}`}>{a.done ? <CheckCircle className="w-4 h-4 text-green-600" /> : <span className="w-3 h-3 bg-white rounded-full border border-gray-400 block" />}</span>
            <div>
              <div className="font-semibold text-gray-900">{a.label}</div>
              <div className="text-xs text-gray-500">{a.time} &nbsp; {a.duration} &nbsp; {a.points} pts</div>
            </div>
          </div>
          {!a.done && <button className="px-3 py-1 rounded bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 hover:bg-blue-100">Start</button>}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default TodaysActivities; 