import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import the new components
import ReportHeader from "./components/ReportHeader";
import ReportSummaryCard from "./components/ReportSummaryCard";
import WeeklyActivitiesChart from "./components/WeeklyActivitiesChart";
import AIInsightsCard from "./components/AIInsightsCard";
import EmotionalPatternsCard from "./components/EmotionalPatternsCard";
import EmotionalTrendsChart from "./components/EmotionalTrendsChart";
import GoalAlignmentCard from "./components/GoalAlignmentCard";
import WeeklySummaryCard from "./components/WeeklySummaryCard";

const ReportsPage = ({ user, currentLanguage = "English", getText = (en, hi) => en }) => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Sample report data
  // Remove weeklyData, hydration, sleep, exercise, and any card or chart that uses them.
  // Only keep AI-driven, user-logged, or software-only features.

  const emotionalPatterns = [
    { emotion: getText('Joy', 'खुशी'), value: 85, fullMark: 100 },
    { emotion: getText('Calm', 'शांति'), value: 75, fullMark: 100 },
    { emotion: getText('Energy', 'ऊर्जा'), value: 80, fullMark: 100 },
    { emotion: getText('Focus', 'एकाग्रता'), value: 70, fullMark: 100 },
    { emotion: getText('Confidence', 'आत्मविश्वास'), value: 78, fullMark: 100 },
    { emotion: getText('Stress', 'तनाव'), value: 25, fullMark: 100 }
  ];

  const emotionalTrendsData = [
    { date: '2024-01-01', joy: 78, calm: 70, energy: 75, focus: 72, confidence: 75, stress: 35 },
    { date: '2024-01-02', joy: 80, calm: 72, energy: 77, focus: 73, confidence: 76, stress: 32 },
    { date: '2024-01-03', joy: 75, calm: 68, energy: 70, focus: 70, confidence: 73, stress: 40 },
    { date: '2024-01-04', joy: 85, calm: 80, energy: 85, focus: 78, confidence: 82, stress: 25 },
    { date: '2024-01-05', joy: 83, calm: 76, energy: 80, focus: 75, confidence: 79, stress: 28 },
    { date: '2024-01-06', joy: 88, calm: 82, energy: 87, focus: 80, confidence: 85, stress: 20 },
    { date: '2024-01-07', joy: 85, calm: 78, energy: 82, focus: 75, confidence: 80, stress: 25 }
  ];

  const weeklyActivities = [
    { activity: 'Exercise Sessions', completed: 5, planned: 5, percentage: 100, trend: '+1 from last week' },
    { activity: 'Meditation Minutes', completed: 140, planned: 140, percentage: 100, trend: '+20 mins from last week' },
    { activity: 'Sleep Hours', completed: 54, planned: 56, percentage: 96, trend: '+2 hours from last week' },
    { activity: 'Water Glasses', completed: 48, planned: 56, percentage: 86, trend: '-3 from last week' },
    { activity: 'Healthy Meals', completed: 18, planned: 21, percentage: 86, trend: '+2 from last week' }
  ];

  const aiInsights = [
    {
      category: "Sleep Pattern Optimization",
      insight: "Your sleep quality improved by 15% this week. Best sleep was on Saturday (9 hours). Consistent bedtime routine shows positive correlation with sleep quality.",
      recommendation: "Try to maintain consistent bedtime routine for optimal results. Consider reducing screen time 1 hour before bed to further improve sleep quality.",
      priority: "high",
      confidence: 95,
      impact: "High"
    },
    {
      category: "Exercise Consistency Excellence",
      insight: "Perfect exercise streak! You completed all planned workout sessions. Your exercise-mood correlation is at 0.87, indicating strong positive impact.",
      recommendation: "Consider adding variety with different exercise types (strength training, yoga) to prevent plateau and enhance overall fitness.",
      priority: "medium",
      confidence: 88,
      impact: "Medium"
    },
    {
      category: "Stress Management Alert",
      insight: "Stress levels were highest on Wednesday (5/10). Strong correlation with poor sleep the night before. Stress affects your energy levels by 23%.",
      recommendation: "Focus on stress reduction techniques before challenging days. Consider meditation or breathing exercises during high-stress periods.",
      priority: "high",
      confidence: 92,
      impact: "High"
    },
    {
      category: "Hydration Improvement Needed",
      insight: "Hydration consistency needs improvement. Weekend intake was 25% lower than weekdays. This correlates with decreased energy levels.",
      recommendation: "Set weekend hydration reminders to maintain consistency. Aim for 2-3 glasses of water upon waking to kickstart hydration habit.",
      priority: "medium",
      confidence: 85,
      impact: "Medium"
    }
  ];

  const goalAlignment = [
    { goal: 'Exercise Goals', percentage: 100, status: 'Perfect week!', color: 'green', icon: { name: 'Activity' } },
    { goal: 'Sleep Goals', percentage: 96, status: 'Almost there!', color: 'blue', icon: { name: 'Clock' } },
    { goal: 'Meditation', percentage: 100, status: 'Excellent focus!', color: 'purple', icon: { name: 'Brain' } },
    { goal: 'Nutrition', percentage: 86, status: 'Room for improvement', color: 'orange', icon: { name: 'Heart' } }
  ];

  const weeklyAchievements = [
    'Perfect exercise attendance (5/5 sessions)',
    'Maintained 12-day meditation streak',
    'Improved sleep quality by 15%',
    'Wellness score increased to 85%',
    'Achieved new personal energy record (9.2/10)',
    'Completed stress management course'
  ];

  const areasForFocus = [
    'Weekend hydration consistency',
    'Wednesday stress management',
    'Meal planning consistency',
    'Evening routine optimization',
    'Social wellness activities'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
      {/* Header */}
      <ReportHeader 
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        getText={getText}
      />

      {/* Report Summary Card */}
      <ReportSummaryCard user={user} />

      {/* What Did You Do This Week */}
      <WeeklyActivitiesChart weeklyActivities={weeklyActivities} />

      {/* AI Insights & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6 mx-6 mb-10">
        <AIInsightsCard aiInsights={aiInsights} />
        <EmotionalPatternsCard 
          emotionalPatterns={emotionalPatterns}
          getText={getText}
        />
      </div>

      {/* Emotional Trends Analysis */}
      <EmotionalTrendsChart 
        emotionalTrendsData={emotionalTrendsData}
        getText={getText}
      />

      {/* Goal Alignment */}
      <GoalAlignmentCard goalAlignment={goalAlignment} />

      {/* Weekly Summary */}
      <WeeklySummaryCard 
        weeklyAchievements={weeklyAchievements}
        areasForFocus={areasForFocus}
      />
    </div>
  );
};

export default ReportsPage;
