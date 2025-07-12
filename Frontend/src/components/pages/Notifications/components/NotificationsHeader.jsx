import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowLeft, Check, Trash2, Settings } from "lucide-react";

const NotificationsHeader = ({ 
  onBack, 
  unreadCount, 
  highPriorityCount, 
  notifications, 
  markAllAsRead, 
  clearAllNotifications 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40 shadow-md rounded-b-2xl mb-8">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2 text-base font-semibold">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Overview</span>
            </Button>
            <div className="flex items-center gap-3">
              <Bell className="w-7 h-7 text-blue-600" />
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Notifications</h1>
                <p className="text-base text-gray-500 font-medium">Stay updated with your health insights</p>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">{unreadCount} new</Badge>
              )}
              {highPriorityCount > 0 && (
                <Badge className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">{highPriorityCount} urgent</Badge>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition"
              >
                <Check className="w-5 h-5" />
                <span>Mark all as read</span>
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllNotifications}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear all</span>
              </Button>
            )}
            <Button variant="outline" size="sm" className="rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsHeader; 