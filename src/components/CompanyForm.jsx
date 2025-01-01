
import '../styles/CompanyForm.css';  // Importing the CSS file

import React, { useState, useEffect } from 'react';

const CompanyForm = ({ onSubmit, company }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastContacted: '',
    nextContact: '',
    frequency: ''
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        lastContacted: company.lastContacted,
        nextContact: company.nextContact,
        frequency: company.frequency
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', lastContacted: '', nextContact: '', frequency: '' });
  };

  return (
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
      <button type="submit">{company ? 'Update Company' : 'Add Company'}</button>
    </form>
  );
};

export default CompanyForm;
