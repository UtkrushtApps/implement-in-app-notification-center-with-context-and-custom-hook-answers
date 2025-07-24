import React, { createContext, useReducer, useContext, useMemo, useCallback } from 'react';

const NotificationContext = createContext();

let notificationId = 0;

const initialState = {
  notifications: [] // { id, message, status: 'unread' | 'read' | 'dismissed', createdAt }
};

function notificationReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const { message } = action.payload;
      const newNotification = {
        id: ++notificationId,
        message,
        status: 'unread',
        createdAt: new Date()
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
      };
    }
    case 'MARK_AS_READ': {
      const { id } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === id && n.status === 'unread' ? { ...n, status: 'read' } : n
        ),
      };
    }
    case 'DISMISS_NOTIFICATION': {
      const { id } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, status: 'dismissed' } : n
        ),
      };
    }
    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Only expose non-dismissed notifications to consumers.
  const value = useMemo(
    () => ({
      notifications: state.notifications.filter(n => n.status !== 'dismissed'),
      dispatch,
    }),
    [state.notifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within a NotificationProvider');
  return ctx;
}
