import React, { useState } from "react";
import mockCompanies from "../services/mockData";
import "./../styles/AdminPage.css";

const AdminPage = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [formData, setFormData] = useState({
    name: "",
    lastContacted: "",
    nextContact: "",
    frequency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanies([
      ...companies,
      { id: companies.length + 1, ...formData },
    ]);
    setFormData({ name: "", lastContacted: "", nextContact: "", frequency: "" });
  };

  return (
    <div className="admin-container fade-in">
      <h2>Admin Module</h2>
      <h3>Company List</h3>
      <ul className="company-list">
        {companies.map((company) => (
          <li key={company.id}>
            <strong>{company.name}</strong>: Last Contacted on {company.lastContacted}, Next Contact on {company.nextContact}, Frequency: {company.frequency}
          </li>
        ))}
      </ul>

      <div className="form-container slide-up">
        <h3>Add a New Company</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="lastContacted"
            value={formData.lastContacted}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="nextContact"
            value={formData.nextContact}
            onChange={handleChange}
            required
          />
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-Monthly">Bi-Monthly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <button type="submit">Add Company</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
