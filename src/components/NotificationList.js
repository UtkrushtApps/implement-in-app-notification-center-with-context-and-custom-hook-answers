import React, { useCallback, useMemo } from 'react';
import useNotifications from '../hooks/useNotifications';

export default function NotificationList() {
  const { notifications, markAsRead, dismiss } = useNotifications();

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [notifications]
  );

  if (sortedNotifications.length === 0) {
    return (
      <div style={styles.empty}>No notifications 🎉</div>
    );
  }
  return (
    <ul style={styles.list}>
      {sortedNotifications.map(n => (
        <li key={n.id} style={styles.item}>
          <div>
            <div style={{ fontWeight: n.status === 'unread' ? 'bold' : 'normal' }}>{n.message}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{
              new Date(n.createdAt).toLocaleString()
            }</div>
          </div>
          <div style={styles.actions}>
            {n.status === 'unread' && (
              <button onClick={() => markAsRead(n.id)} style={styles.button}>Mark as read</button>
            )}
            <button onClick={() => dismiss(n.id)} style={styles.button}>Dismiss</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    width: 320,
    maxHeight: 400,
    overflowY: 'auto',
    listStyle: 'none',
    background: '#fff',
    padding: 0,
    margin: 0,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.13)',
    borderRadius: 6,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #f0f0f0',
    padding: 12,
    gap: 10,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  button: {
    padding: '3px 9px',
    margin: 0,
    border: '1px solid #c8c8c8',
    borderRadius: 3,
    background: '#fafafa',
    cursor: 'pointer',
    fontSize: '0.88rem',
  },
  empty: {
    width: 320,
    padding: 24,
    textAlign: 'center',
    color: '#888',
    background: '#fff',
    borderRadius: 6,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.13)',
  },
};
