// src/components/CommunicationDetailsModal.jsx
import React from 'react';

const CommunicationDetailsModal = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Communication Details</h2>
        <div>
          {/* Display your communication details here */}
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetailsModal;
