// src/components/Notification.js
import React from "react";

const Notification = ({ notifications, onClose }) => {
  return (
    <div className="notification-container">
      <button className="close-btn" onClick={onClose}>X</button>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No pending or overdue communications.</p>
      ) : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              <strong>{notif.company}</strong>: {notif.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
