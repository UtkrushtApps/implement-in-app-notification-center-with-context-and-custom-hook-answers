import React, { useState, memo } from 'react';
import useNotifications from '../hooks/useNotifications';

const NotificationBadge = memo(function NotificationBadge({ onClick, isOpen }) {
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
      <button aria-label="Show notifications" onClick={onClick} style={{ fontSize: 24 }}>
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              minWidth: 18,
              minHeight: 18,
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 12,
              padding: '2px 5px',
            }}
            aria-label={`${unreadCount} unread notifications`}
          >
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
});

export default NotificationBadge;
