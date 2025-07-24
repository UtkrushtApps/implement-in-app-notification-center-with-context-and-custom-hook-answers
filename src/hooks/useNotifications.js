import { useCallback } from 'react';
import { useNotificationContext } from '../context/NotificationContext';

// Custom hook to interact with notifications
type NotificationType = {
  id: number,
  message: string,
  status: 'unread' | 'read',
  createdAt: Date,
};

export default function useNotifications() {
  const {
    notifications,
    dispatch,
  } = useNotificationContext();
  // Only notifications not dismissed are exposed

  const addNotification = useCallback(
    (message) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message } });
    },
    [dispatch]
  );

  const markAsRead = useCallback(
    (id) => {
      dispatch({ type: 'MARK_AS_READ', payload: { id } });
    },
    [dispatch]
  );

  const dismiss = useCallback(
    (id) => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: { id } });
    },
    [dispatch]
  );

  // Only expose non-dismissed notifications

  return {
    notifications,
    addNotification,
    markAsRead,
    dismiss,
  };
}
