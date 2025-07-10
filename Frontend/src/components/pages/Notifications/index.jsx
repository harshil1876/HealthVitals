
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  ArrowLeft, 
  Target, 
  Heart, 
  Brain, 
  Clock, 
  Award,
  TrendingUp,
  Calendar,
  Settings,
  Check,
  Trash2,
  X,
  Filter
} from "lucide-react";

const NotificationsPage = ({ onBack }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'goal',
      icon: Target,
      color: 'blue',
      title: 'Goal Achievement',
      message: 'Congratulations! You completed your daily exercise goal.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'health',
      icon: Heart,
      color: 'red',
      title: 'Health Reminder',
      message: 'Time for your evening meditation session.',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'insight',
      icon: Brain,
      color: 'purple',
      title: 'AI Insight',
      message: 'Your sleep pattern has improved by 20% this week!',
      time: '1 hour ago',
      read: false,
      priority: 'low'
    },
    {
      id: 4,
      type: 'reminder',
      icon: Clock,
      color: 'orange',
      title: 'Wellness Check',
      message: 'How are you feeling today? Take a quick mood assessment.',
      time: '2 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'achievement',
      icon: Award,
      color: 'green',
      title: 'New Achievement',
      message: 'You earned the "Consistency Champion" badge!',
      time: '3 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 6,
      type: 'trend',
      icon: TrendingUp,
      color: 'cyan',
      title: 'Wellness Trend',
      message: 'Your overall wellness score is trending upward this month.',
      time: '5 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 7,
      type: 'appointment',
      icon: Calendar,
      color: 'indigo',
      title: 'Upcoming Session',
      message: 'Your wellness coaching session is scheduled for tomorrow at 3 PM.',
      time: '1 day ago',
      read: true,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'high') return notif.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;
  const highPriorityCount = notifications.filter(notif => notif.priority === 'high' && !notif.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-10">
      {/* Header */}
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
      <div className="max-w-4xl mx-auto p-6">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
                className="rounded-lg px-4 py-2 text-base font-semibold"
              >All</Button>
              <Button 
                variant={filter === 'unread' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('unread')}
                className="rounded-lg px-4 py-2 text-base font-semibold"
              >Unread</Button>
              <Button 
                variant={filter === 'high' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('high')}
                className="rounded-lg px-4 py-2 text-base font-semibold"
              >Urgent</Button>
            </div>
          </div>
        </div>
        {/* Notification Cards */}
        <div className="space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center text-gray-400 text-lg py-12">No notifications found.</div>
          ) : (
            filteredNotifications.map((notif) => {
              const IconComponent = notif.icon;
              return (
                <Card key={notif.id} className={`flex items-center gap-4 p-6 shadow-lg rounded-2xl border-l-8 ${notif.read ? 'border-gray-200 bg-white/80' : 'border-blue-400 bg-blue-50/80'} hover:shadow-2xl hover:scale-[1.01] transition-transform duration-200`}> 
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 shadow`}>
                    <IconComponent className={`w-7 h-7 text-${notif.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{notif.title}</h3>
                      {notif.priority === 'high' && <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Urgent</Badge>}
                    </div>
                    <p className="text-gray-700 text-base mb-1">{notif.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{notif.time}</span>
                      {!notif.read && <span className="text-blue-600 font-semibold">• Unread</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!notif.read && (
                      <Button size="icon" variant="ghost" onClick={() => markAsRead(notif.id)} title="Mark as read">
                        <Check className="w-5 h-5 text-green-600" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => deleteNotification(notif.id)} title="Delete">
                      <X className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
