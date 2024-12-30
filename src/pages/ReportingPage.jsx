import React, { useState } from "react";
import mockCompanies from "../services/mockData";

const ReportingPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);

  const overdueCompanies = companies.filter(
    (company) => new Date(company.nextContact) < new Date() && company.status !== "Completed"
  );

  const completedCompanies = companies.filter(
    (company) => company.status === "Completed"
  );

  const totalCompanies = companies.length;

  return (
    <div className="fade-in">
      <h2>Reporting & Analytics</h2>
      <div>
        <h3>Communication Insights</h3>
        <p>Total Companies: {totalCompanies}</p>
        <p>Overdue Communications: {overdueCompanies.length}</p>
        <p>Completed Communications: {completedCompanies.length}</p>
      </div>
      <div>
        <h3>Overdue Communications</h3>
        <ul>
          {overdueCompanies.map((company) => (
            <li key={company.id}>
              <strong>{company.name}</strong> - Next Contact: {company.nextContact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportingPage;
