import React from 'react';
import '../styles/CommunicationDetailsModal.css'; // Import the CSS for styling

const CommunicationDetailModal = ({ company, onClose }) => {
  if (!company) return null; // If no company is selected, return null (nothing to render)

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="modal-card">
          <h3 className="modal-header">Company Details</h3>
          <div className="modal-body">
            <p><strong>Company Name:</strong> {company.name}</p>
            <p><strong>Last Contacted:</strong> {company.lastContacted}</p>
            <p><strong>Next Contact:</strong> {company.nextContact}</p>
            <p><strong>Frequency:</strong> {company.frequency}</p>
            <p><strong>Status:</strong> {company.status || "Pending"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetailModal;
