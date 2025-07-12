import { Card } from "@/components/ui/card";
import { MessageCircle, TrendingUp, Eye, MoreHorizontal } from "lucide-react";

const RecentConversations = ({ dashboardRecentConversations }) => (
  <Card className="mt-8">
    <div className="flex items-center justify-between px-6 pt-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        <span className="text-2xl font-semibold text-gray-900">Recent Conversations</span>
      </div>
      <button className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
        <MoreHorizontal className="w-4 h-4 mr-1" /> View All
      </button>
    </div>
    <div className="p-6 space-y-6">
      {dashboardRecentConversations.map((conv, i) => (
        <div key={i} className="rounded-xl p-5 mb-2 bg-white border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-base text-gray-900">{conv.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-700">{conv.time}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">Duration: {conv.duration}</span>
              <span className="text-gray-400">•</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${conv.sentiment.color}`}>
                <span className={`w-2 h-2 rounded-full ${conv.sentiment.dot}`}></span> {conv.sentiment.label}
              </span>
            </div>
            <div className="text-gray-700 text-sm mb-2">{conv.description}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {conv.tags.map((tag, j) => (
                <span key={j} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[100px]">
            <div className="flex items-center gap-1 text-blue-600 font-semibold">
              <TrendingUp className="w-4 h-4" /> {conv.confidence}
            </div>
            <button className="flex items-center gap-1 px-3 py-1 border rounded bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
              <Eye className="w-4 h-4" /> View
            </button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default RecentConversations; 