import React, { useState } from 'react';
import CompanyManagement from '../components/CompanyManagement';
import CommunicationMethods from '../components/CommunicationMethodManagement';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('companyManagement'); // Track active section

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      
      {/* Toggle Buttons */}
      <div className="button-container">
        <button onClick={() => setActiveSection('companyManagement')}>Company Management</button>
        <button onClick={() => setActiveSection('communicationMethods')}>Communication Methods</button>
      </div>

      {/* Content Section - Dynamic Rendering based on activeSection */}
      <div className={`content-container ${activeSection === 'companyManagement' || activeSection === 'communicationMethods' ? 'active' : ''}`}>
        {activeSection === 'companyManagement' && <CompanyManagement />}
        {activeSection === 'communicationMethods' && <CommunicationMethods />}
      </div>
    </div>
  );
};

export default AdminPage;
