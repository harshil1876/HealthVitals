import { Award, Target as FocusTarget } from "lucide-react";

const WeeklySummaryCard = ({ weeklyAchievements, areasForFocus }) => {
  return (
    <div className="mt-10 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 via-white to-green-50 p-8 mx-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Weekly Summary</h2>
      <p className="text-gray-500 mb-6">Your wellness journey this week</p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Key Achievements */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-lg text-gray-800">Key Achievements</span>
          </div>
          <ul className="space-y-2">
            {weeklyAchievements.map((item, i) => (
              <li key={i} className="text-base text-blue-900 font-medium flex items-center">
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Areas for Focus */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FocusTarget className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-lg text-gray-800">Areas for Focus</span>
          </div>
          <ul className="space-y-2">
            {areasForFocus.map((item, i) => (
              <li key={i} className="text-base text-green-900 font-medium flex items-center">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryCard; 