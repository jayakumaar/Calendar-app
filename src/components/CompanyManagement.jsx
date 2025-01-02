import React, { useState } from 'react';
import '../styles/CompanyManagement.css';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([
    { name: 'ENTNT', location: 'Abu Dhabi', communicationPeriod: 'Every 7 days' },
    { name: 'Stripe', location: 'California, US', communicationPeriod: 'Every 2 days' },
    { name: 'Accenture', location: 'Bangalore, India', communicationPeriod: 'Every 12 days' },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', location: '', communicationPeriod: '' });
  const [error, setError] = useState({ name: '', location: '', communicationPeriod: '' });

  const handleAddCompany = () => {
    setShowPopup(true);
  };

  const handleSaveCompany = () => {
    let isValid = true;
    const newError = { name: '', location: '', communicationPeriod: '' };

    // Validate each field
    if (!newCompany.name) {
      newError.name = 'Please enter the company name';
      isValid = false;
    }
    if (!newCompany.location) {
      newError.location = 'Please enter the company location';
      isValid = false;
    }
    if (!newCompany.communicationPeriod) {
      newError.communicationPeriod = 'Please enter the communication period';
      isValid = false;
    }

    if (isValid) {
      setCompanies([...companies, newCompany]);
      setNewCompany({ name: '', location: '', communicationPeriod: '' });
      setShowPopup(false);
    } else {
      setError(newError); // Display error messages
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setNewCompany({ name: '', location: '', communicationPeriod: '' });
    setError({ name: '', location: '', communicationPeriod: '' }); // Reset error messages on cancel
  };

  return (
    <div className="company-management">
      <div className="header">
        <h1>Company Management</h1>
        <button className="add-company" onClick={handleAddCompany}>
          + Add Company
        </button>
      </div>

      <table className="company-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Communication Period</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td>{company.communicationPeriod}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Company</h2>
            <label>Company Name</label>
            <input
              type="text"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            />
            {error.name && <div className="error">{error.name}</div>} {/* Display error */}

            <label>Location</label>
            <input
              type="text"
              value={newCompany.location}
              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
            />
            {error.location && <div className="error">{error.location}</div>} {/* Display error */}

            <label>Communication Periodicity (days)</label>
            <input
              type="number"
              value={newCompany.communicationPeriod}
              onChange={(e) => setNewCompany({ ...newCompany, communicationPeriod: e.target.value })}
            />
            {error.communicationPeriod && <div className="error">{error.communicationPeriod}</div>} {/* Display error */}

            <div className="popup-buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSaveCompany}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
