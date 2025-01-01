import React, { useState } from 'react';
import CompanyForm from './CompanyForm.jsx';
// import './../styles/CommunicationMethod.css';
import '../styles/CompanyManagement.css'; // Adjust the path as per your project structure


const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddCompany = (companyData) => {
    setCompanies([...companies, companyData]);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
  };

  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(companies.map((company) => company.name === updatedCompany.name ? updatedCompany : company));
    setEditingCompany(null);
  };

  const handleDeleteCompany = (companyName) => {
    setCompanies(companies.filter((company) => company.name !== companyName));
  };

  return (
    <div>
      <h1>Company Management</h1>
      <CompanyForm onSubmit={editingCompany ? handleUpdateCompany : handleAddCompany} company={editingCompany} />
      
      <div>
        <h2>Company List</h2>
        <ul>
          {companies.map((company) => (
            <li key={company.name}>
              <span>{company.name}</span>
              <button onClick={() => handleEditCompany(company)}>Edit</button>
              <button onClick={() => handleDeleteCompany(company.name)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyManagement;
