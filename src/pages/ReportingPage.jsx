import React, { useState } from "react";
import mockCompanies from "../services/mockData";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend } from "recharts";
import "../styles/ReportingPage.css";

const ReportingPage = () => {
  const [companies] = useState(mockCompanies);

  const overdueCompanies = companies.filter(
    (company) => new Date(company.nextContact) < new Date() && company.status !== "Completed"
  );

  const completedCompanies = companies.filter(
    (company) => company.status === "Completed"
  );

  const incompleteCompanies = companies.filter(
    (company) => company.status !== "Completed" && new Date(company.nextContact) >= new Date()
  );

  const totalCompanies = companies.length;

  const statusData = [
    { name: "Completed", value: completedCompanies.length },
    { name: "Overdue", value: overdueCompanies.length },
    { name: "Incomplete", value: incompleteCompanies.length },
  ];

  const communicationMethodData = [
    { name: "Email", value: 12 },
    { name: "Phone", value: 8 },
    { name: "Message", value: 6 },
    { name: "Meeting", value: 5 },
  ];

  const COLORS = ["#005eff", "#ff7e5f", "#feb47b"];

  return (
    <div className="reporting-page">
      <h2 className="report-title">Reporting & Analytics</h2>
      
      <div className="report-summary">
        <h3>Communication Insights</h3>
        <div className="summary-item">
          <strong>Total Companies:</strong> {totalCompanies}
        </div>
        <div className="summary-item">
          <strong>Overdue Communications:</strong> {overdueCompanies.length}
        </div>
        <div className="summary-item">
          <strong>Completed Communications:</strong> {completedCompanies.length}
        </div>
        <div className="summary-item">
          <strong>Incomplete Communications:</strong> {incompleteCompanies.length}
        </div>
      </div>

      <div className="report-details">
        <div className="report-section">
          <h3>Overdue Communications</h3>
          <ul>
            {overdueCompanies.map((company) => (
              <li key={company.id} className="company-item">
                <strong>{company.name}</strong> - Next Contact: {company.nextContact}
              </li>
            ))}
          </ul>
        </div>

        <div className="report-section">
          <h3>Incomplete Communications (Upcoming but not completed)</h3>
          <ul>
            {incompleteCompanies.map((company) => (
              <li key={company.id} className="company-item">
                <strong>{company.name}</strong> - Next Contact: {company.nextContact}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Charts Section */}
      <div className="chart-container">
        <h3>Company Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Communication Method Frequency</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={communicationMethodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <BarTooltip />
            <Bar dataKey="value" fill="#005eff" />
            <BarLegend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportingPage;
