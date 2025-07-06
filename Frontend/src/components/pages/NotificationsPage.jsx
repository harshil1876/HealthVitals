
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Overview</span>
              </Button>
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-sm text-gray-600">Stay updated with your health insights</p>
                </div>
                {unreadCount > 0 && (
                  <Badge className="bg-blue-600 text-white">{unreadCount} new</Badge>
                )}
                {highPriorityCount > 0 && (
                  <Badge className="bg-red-500 text-white">{highPriorityCount} urgent</Badge>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark all as read</span>
                </Button>
              )}
              {notifications.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear all</span>
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </Button>
              <Button 
                variant={filter === 'unread' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button 
                variant={filter === 'high' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('high')}
              >
                High Priority ({notifications.filter(n => n.priority === 'high').length})
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Bell className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">
              {filter === 'all' ? 'No notifications' : 
               filter === 'unread' ? 'No unread notifications' : 
               'No high priority notifications'}
            </h3>
            <p className="text-sm text-center">
              {filter === 'all' ? "You're all caught up! Check back later for updates." :
               filter === 'unread' ? "All notifications have been read." :
               "No urgent notifications at the moment."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  } ${notification.priority === 'high' ? 'border-l-4 border-l-red-500' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${notification.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 text-${notification.color}-600`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold text-lg ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            )}
                            <Badge 
                              variant={notification.priority === 'high' ? 'destructive' : 
                                      notification.priority === 'medium' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {notification.priority}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-gray-400 hover:text-gray-600 p-1"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className={`text-base mb-3 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{notification.time}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs capitalize text-${notification.color}-600 border-${notification.color}-200`}
                          >
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {notifications.length} total notifications
            </p>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Notification Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
