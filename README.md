1. **Set up the Context with Reducer:**
   - In `src/context/NotificationContext.js`, create a context.
   - Implement a reducer with actions for ADD_NOTIFICATION, MARK_AS_READ, and DISMISS_NOTIFICATION.
   - The state should be an array of notifications, each with id, message, status (unread/read/dismissed), and createdAt.
   - The provider should filter out dismissed notifications before exposing them to children.

2. **Create the Custom Hook:**
   - In `src/hooks/useNotifications.js`, use the context.
   - Return the notifications (from context) and expose `addNotification`, `markAsRead`, and `dismiss` as callbacks that dispatch the relevant reducer actions.
   - Only non-dismissed notifications are exposed.

3. **Implement the NotificationBadge Component:**
   - In `src/components/NotificationBadge.js`, use the custom hook to get the notifications.
   - Compute the unread count (notifications with status 'unread').
   - Show a bell icon (🔔), overlaying a badge with the unread count if > 0.
   - Memoize the component using `React.memo` for efficiency.

4. **Implement the NotificationList Component:**
   - In `src/components/NotificationList.js`, use the custom hook to get notifications and the actions.
   - Sort notifications by most recent first.
   - For each notification, show its message, date, and controls for Mark as Read (if unread) and Dismiss.
   - If there are no notifications, show a friendly message ("No notifications 🎉").
   - Memoize and optimize as needed, but allow all updates to propagate.

5. **Wire into the App:**
   - In `src/App.js`, wrap your main app content in the `NotificationProvider`.
   - Render the `NotificationBadge` and `NotificationList`. For demo purposes, add a way to add notifications.
   - Toggling the badge icon shows/hides the notification list, which is a dropdown/popup.

6. **Test for Global Reactivity:**
   - Add notifications from anywhere in the app.
   - Badge count and notification list should update immediately and stay in sync.
   - Marking as read or dismissing updates all consumers globally, instantly, with no remounts.

7. **Ensure Good UX:**
   - Use inline styles for simple demo (customize as needed).
   - Prevent dismissed notifications from appearing anywhere.
   - Keep components small, focused, and optimized.