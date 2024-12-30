import React, { useState, useEffect } from "react";
import mockCompanies from "../services/mockData";
import { parseISO } from "date-fns";
import "./../styles/UserPage.css";
import CalendarView from "../components/CalendarView"; // Import the CalendarView component
import Notification from '../components/Notification';
import CommunicationChart from "../components/CommunicationChart"; // Import the new chart component
import CommunicationDetailModal from "../components/CommunicationDetailsModal"; // Import the Modal component


const UserPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null);
  const [overdueNotification, setOverdueNotification] = useState(false);
  const [overdueCompanies, setOverdueCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // State to handle selected company for the modal

  // Function to handle marking a company as completed
  const markAsCompleted = (id) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id
        ? { ...company, status: "Completed" } // Update the status to "Completed"
        : company
    );
    setCompanies(updatedCompanies);
  };

  // Function to check if there are any overdue communications
  const checkOverdueNotifications = () => {
    const today = new Date();
    const overdueCompaniesList = companies.filter(
      (company) => parseISO(company.nextContact) < today && company.status !== "Completed"
    );

    setOverdueCompanies(overdueCompaniesList); // Set the list of overdue companies
    setOverdueNotification(overdueCompaniesList.length > 0); // If there are overdue companies, show the notification
  };

  // Re-check for overdue notifications when companies or statuses change
  useEffect(() => {
    checkOverdueNotifications();
  }, [companies]);

  // Get the selected company for the modal
  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  return (
    <div className="user-container fade-in">
      <h2>User Module</h2>

      {/* Overdue Notification */}
      {overdueNotification && (
        <div className="overdue-notification">
          <p>You have overdue communications with the following companies:</p>
          <ul>
            {overdueCompanies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
          <button onClick={() => setOverdueNotification(false)}>Close</button>
        </div>
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
