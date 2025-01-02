import React from "react";
import "../styles/Notification.css";

const Notification = ({ notifications, onClose }) => {
  return (
    <div className="notification-container">
      <h3>Overdue Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <strong style={{ color: 'blue' }}>{notification.name}</strong>
            <p>Reason: {notification.reason}</p>
            <p>Last Contacted: {notification.lastContacted}</p>
            <p style={{ color: 'red' }}>Next Contact: {notification.nextContact}</p>
          </li>
        ))}
      </ul>
      <button className="btn-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Notification;
