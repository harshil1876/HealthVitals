import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const NotificationCard = ({ notification, markAsRead, deleteNotification }) => {
  const IconComponent = notification.icon;
  
  return (
    <Card className={`flex items-center gap-4 p-6 shadow-lg rounded-2xl border-l-8 ${notification.read ? 'border-gray-200 bg-white/80' : 'border-blue-400 bg-blue-50/80'} hover:shadow-2xl hover:scale-[1.01] transition-transform duration-200`}> 
      <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 shadow`}>
        <IconComponent className={`w-7 h-7 text-${notification.color}-600`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
          {notification.priority === 'high' && <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Urgent</Badge>}
        </div>
        <p className="text-gray-700 text-base mb-1">{notification.message}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{notification.time}</span>
          {!notification.read && <span className="text-blue-600 font-semibold">• Unread</span>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {!notification.read && (
          <Button size="icon" variant="ghost" onClick={() => markAsRead(notification.id)} title="Mark as read">
            <Check className="w-5 h-5 text-green-600" />
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={() => deleteNotification(notification.id)} title="Delete">
          <X className="w-5 h-5 text-red-500" />
        </Button>
      </div>
    </Card>
  );
};

export default NotificationCard; 