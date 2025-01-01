import React, { useState, useEffect, useCallback } from "react";
import mockCompanies from "../services/mockData";
import { parseISO } from "date-fns";
import "../styles/UserPage.css";
import CalendarView from "../components/CalendarView"; // Import the CalendarView component
import Notification from "../components/Notification"; // Import Notification component
import CommunicationChart from "../components/CommunicationChart"; // Import the new chart component
import CommunicationDetailModal from "../components/CommunicationDetailModal"; // Import the Modal component

const UserPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null);
  const [overdueCompanies, setOverdueCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // State to handle selected company for the modal
  const [showNotification, setShowNotification] = useState(false); // Show overdue notification

  // Function to handle marking a company as completed
  const markAsCompleted = (id) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id
        ? { ...company, status: "Completed" } // Update the status to "Completed"
        : company
    );
    setCompanies(updatedCompanies);
  };

  // Memoized function to check overdue notifications
  const checkOverdueNotifications = useCallback(() => {
    const today = new Date();
    const overdueCompaniesList = companies.filter(
      (company) =>
        parseISO(company.nextContact) < today && company.status !== "Completed"
    );

    setOverdueCompanies(overdueCompaniesList); // Set the list of overdue companies
    setShowNotification(overdueCompaniesList.length > 0); // Show notification if there are overdue companies
  }, [companies]);

  // Re-check for overdue notifications when companies or statuses change
  useEffect(() => {
    checkOverdueNotifications();
  }, [checkOverdueNotifications]);

  // Get the selected company for the modal
  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  return (
    <div className="user-container fade-in">
      <h2>User Module</h2>

      {/* Overdue Notification */}
      {showNotification && (
        <Notification
          notifications={overdueCompanies}
          onClose={() => setShowNotification(false)} // Close notification on close
        />
      )}

      <h3>Upcoming Communications</h3>

      <ul className="communication-list">
        {companies.map((company) => {
          const nextContactDate = parseISO(company.nextContact);
          const today = new Date();
          const isOverdue = nextContactDate < today && company.status !== "Completed";
          const isPending = nextContactDate >= today && company.status !== "Completed";

          return (
            <li
              key={company.id}
              className="communication-item"
              onMouseEnter={() => setHoveredCompanyId(company.id)}
              onMouseLeave={() => setHoveredCompanyId(null)}
            >
              <strong
                onClick={() => setSelectedCompanyId(company.id)} // Open modal on click of company name
                style={{ cursor: "pointer", color: "blue" }}
              >
                {company.name}
              </strong>
              <br />
              Last Contacted: {company.lastContacted}
              <br />
              Next Contact: {company.nextContact}
              <br />
              Frequency: {company.frequency}
              <br />
              Status:{" "}
              <span
                className="status"
                style={{
                  color: company.status === "Completed" ? "green" : "red",
                }}
              >
                {company.status || "Pending"}
              </span>
              <br />

              {/* Overdue or Pending display below the Status */}
              {isOverdue && !company.status && (
                <span className="overdue">Overdue!</span>
              )}
              {isPending && !company.status && (
                <span className="pending">Pending</span>
              )}

              <br />
              <button className="btn-animate" onClick={() => markAsCompleted(company.id)}>
                Mark as Completed
              </button>

              {hoveredCompanyId === company.id && (
                <div className="communication-details">
                  <p><strong>Additional Details:</strong></p>
                  <p>Company contact info, communications history, etc.</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <h3>Communication Frequency Chart</h3>
      <CommunicationChart /> {/* Display the communication chart here */}

      <h3>Calendar View</h3>
      <CalendarView companies={companies} markAsCompleted={markAsCompleted} />

      {/* Display Modal if a company is selected */}
      <CommunicationDetailModal
        company={selectedCompany}
        onClose={() => setSelectedCompanyId(null)} // Close modal when the close button is clicked
      />
    </div>
  );
};

export default UserPage;
