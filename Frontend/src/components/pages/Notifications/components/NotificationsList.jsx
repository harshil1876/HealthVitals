import NotificationCard from "./NotificationCard";

const NotificationsList = ({ filteredNotifications, markAsRead, deleteNotification }) => {
  return (
    <div className="space-y-6">
      {filteredNotifications.length === 0 ? (
        <div className="text-center text-gray-400 text-lg py-12">No notifications found.</div>
      ) : (
        filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
          />
        ))
      )}
    </div>
  );
};

export default NotificationsList; 