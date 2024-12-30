import React from 'react';

const UserDashboard = ({ companies }) => {
  const getCommunicationStatus = (nextCommunicationDate) => {
    const today = new Date();
    const nextDate = new Date(nextCommunicationDate);

    if (nextDate < today) {
      return 'overdue'; // Red for overdue
    } else if (nextDate.toDateString() === today.toDateString()) {
      return 'due'; // Yellow for due today
    }
    return 'upcoming'; // Green for upcoming
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="dashboard-grid">
        {companies.map((company) => (
          <div key={company.name} className="company-card">
            <h3>{company.name}</h3>
            <p>Last Communication: {company.lastCommunication}</p>
            <p>Next Communication: {company.nextCommunication}</p>
            <p
              className={`status ${getCommunicationStatus(company.nextCommunication)}`}
            >
              Status: {getCommunicationStatus(company.nextCommunication)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
