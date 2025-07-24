import React, { useState } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import NotificationBadge from './components/NotificationBadge';
import NotificationList from './components/NotificationList';
import useNotifications from './hooks/useNotifications';

// Example dashboard page
function Dashboard() {
  const [input, setInput] = useState('');
  const { addNotification } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleSend = e => {
    e.preventDefault();
    if (input.trim()) {
      addNotification(input.trim());
      setInput('');
    }
  };

  // For demo: badge toggles the list popup
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <div style={{ position: 'relative' }}>
          <NotificationBadge onClick={() => setOpen(o => !o)} isOpen={open} />
          {open && (
            <div
              style={{
                position: 'absolute',
                top: 34,
                right: 0,
                zIndex: 100,
              }}
            >
              <NotificationList />
            </div>
          )}
        </div>
      </div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSend} style={{ marginTop: 30 }}>
        <label>Add Notification:&nbsp;</label>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Notification message"
          style={{ padding: '6px 12px', fontSize: 16 }}
        />
        <button type="submit" style={{ marginLeft: 8, fontSize: 16 }}>Send</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <Dashboard />
    </NotificationProvider>
  );
}
