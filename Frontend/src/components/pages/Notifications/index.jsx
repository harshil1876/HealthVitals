
import { useState } from "react";
import { 
  Target, 
  Heart, 
  Brain, 
  Clock, 
  Award,
  TrendingUp,
  Calendar
} from "lucide-react";

// Import the new components
import NotificationsHeader from "./components/NotificationsHeader";
import FilterTabs from "./components/FilterTabs";
import NotificationsList from "./components/NotificationsList";

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
      <NotificationsHeader 
        onBack={onBack}
        unreadCount={unreadCount}
        highPriorityCount={highPriorityCount}
        notifications={notifications}
        markAllAsRead={markAllAsRead}
        clearAllNotifications={clearAllNotifications}
      />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Filter Tabs */}
        <FilterTabs filter={filter} setFilter={setFilter} />
        
        {/* Notification Cards */}
        <NotificationsList 
          filteredNotifications={filteredNotifications}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      </div>
    </div>
  );
};

export default NotificationsPage;
