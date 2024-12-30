import React, { useState } from "react";
import { parseISO, isBefore, isToday, isEqual, isAfter } from "date-fns"; // Import missing functions
import "../styles/CalendarView.css";

const CalendarView = ({ companies, markAsCompleted }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first and last day of the current month
  const getMonthRange = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
  };

  // Get all the days in the current month
  const getCalendarDays = () => {
    const { startOfMonth, endOfMonth } = getMonthRange();
    const days = [];

    // Get the day of the week for the 1st day of the month
    const firstDayOfMonth = startOfMonth.getDay();
    const lastDayOfMonth = endOfMonth.getDate();

    // Fill the calendar with empty days if the month doesn't start on Sunday
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Fill the calendar with the actual days of the month
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Check if the date is overdue or pending based on the next contact date
  const getCommunicationStatus = (day) => {
    const { startOfMonth, endOfMonth } = getMonthRange();
    const communicationsForDay = companies.filter((company) => {
      const nextContactDate = parseISO(company.nextContact);
      // Check if the nextContact is the exact date of the day being checked
      const isSameDay = isEqual(nextContactDate, new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

      return isSameDay && company.status !== "Completed"; // Only show for the exact day
    });

    return communicationsForDay;
  };

  // Change to the next or previous month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt; Previous</button>
        <h3>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h3>
        <button onClick={() => changeMonth(1)}>Next &gt;</button>
      </div>

      <div className="calendar-grid">
        {getCalendarDays().map((day, index) => (
          <div key={index} className="calendar-day">
            {day ? (
              <>
                <div className="calendar-date">{day}</div>
                <div className="communication-status">
                  {getCommunicationStatus(day).map((company) => {
                    const nextContactDate = parseISO(company.nextContact);
                    const today = new Date();
                    const isOverdue = isBefore(nextContactDate, today) && company.status !== "Completed";
                    const isPending = isEqual(nextContactDate, today) && company.status !== "Completed";
                    return (
                      <div key={company.id} className={`status-badge ${isOverdue ? "overdue" : ""} ${isPending ? "pending" : ""}`}>
                        {isOverdue ? "Overdue" : "Pending"}
                        <button
                          className="complete-btn"
                          onClick={() => markAsCompleted(company.id)}
                        >
                          Mark as Completed
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="empty-day"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
