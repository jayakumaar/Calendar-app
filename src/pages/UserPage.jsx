import React, { useState, useEffect, useCallback } from "react";
import mockCompanies from "../services/mockData";
import { parseISO, format } from "date-fns"; // Import format for date formatting
import "../styles/UserPage.css";
import CalendarView from "../components/CalendarView";
import Notification from "../components/Notification";
import CommunicationDetailModal from "../components/CommunicationDetailModal";

const UserPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [overdueCompanies, setOverdueCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const markAsCompleted = (id) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id
        ? { ...company, status: "Completed" }
        : company
    );
    setCompanies(updatedCompanies);
  };

  const checkOverdueNotifications = useCallback(() => {
    const today = new Date();
    const overdueCompaniesList = companies.filter(
      (company) =>
        parseISO(company.nextContact) < today && company.status !== "Completed"
    );

    setOverdueCompanies(overdueCompaniesList);
    setShowNotification(overdueCompaniesList.length > 0);
  }, [companies]);

  useEffect(() => {
    checkOverdueNotifications();
  }, [checkOverdueNotifications]);

  const selectedCompany = companies.find((company) => company.id === selectedCompanyId);

  return (
    <div className="user-page">
      <header className="user-header">
        <h1>User Dashboard</h1>
      </header>

      {/* Overdue Notifications */}
      {showNotification && (
        <Notification
          className="notification-container"  // Add the class for animation
          notifications={overdueCompanies.map((company) => ({
            name: company.name,
            reason: "Overdue communication",
            lastContacted: format(parseISO(company.lastContacted), "MMMM d, yyyy"),
            nextContact: format(parseISO(company.nextContact), "MMMM d, yyyy"),
          }))}
          onClose={() => setShowNotification(false)}
        />
      )}

      <section className="upcoming-communications">
        <h2>Upcoming Communications</h2>
        <ul className="communication-list">
          {companies.map((company) => {
            const nextContactDate = parseISO(company.nextContact);
            const today = new Date();
            const isOverdue = nextContactDate < today && company.status !== "Completed";
            const isPending = nextContactDate >= today && company.status !== "Completed";

            return (
              <li
                key={company.id}
                className={`communication-item ${
                  isOverdue ? "overdue" : isPending ? "pending" : ""
                }`}
              >
                <strong
                  onClick={() => setSelectedCompanyId(company.id)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {company.name}
                </strong>
                <br />
                Last Contacted: {format(parseISO(company.lastContacted), "MMMM d, yyyy")}
                <br />
                Next Contact: {format(parseISO(company.nextContact), "MMMM d, yyyy")}
                <br />
                Frequency: {company.frequency}
                <br />
                Status:{" "}
                <span className="status">
                  {company.status || "Pending"}
                </span>
                <br />

                <button
                  className="btn-animate"
                  onClick={() => markAsCompleted(company.id)}
                >
                  Mark as Completed
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="calendar-section">
        <h2>Calendar View</h2>
        <CalendarView companies={companies} markAsCompleted={markAsCompleted} />
      </section>

      {selectedCompany && (
        <CommunicationDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompanyId(null)}
        />
      )}
    </div>
  );
};

export default UserPage;
