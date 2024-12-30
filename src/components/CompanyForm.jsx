import React, { useState, useEffect } from 'react';

const CompanyForm = ({ onSubmit, company }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [emails, setEmails] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [comments, setComments] = useState('');
  const [periodicity, setPeriodicity] = useState('');

  // This effect runs when the company prop changes
  useEffect(() => {
    if (company) {
      setName(company.name || '');
      setLocation(company.location || '');
      setLinkedin(company.linkedin || '');
      setEmails(company.emails || '');
      setPhoneNumbers(company.phoneNumbers || '');
      setComments(company.comments || '');
      setPeriodicity(company.periodicity || '');
    }
  }, [company]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyData = { name, location, linkedin, emails, phoneNumbers, comments, periodicity };
    onSubmit(companyData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{company?.name ? 'Edit Company' : 'Add Company'}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label>LinkedIn Profile:</label>
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>
      <div>
        <label>Emails:</label>
        <input
          type="email"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Numbers:</label>
        <input
          type="text"
          value={phoneNumbers}
          onChange={(e) => setPhoneNumbers(e.target.value)}
        />
      </div>
      <div>
        <label>Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <label>Communication Periodicity:</label>
        <input
          type="text"
          value={periodicity}
          onChange={(e) => setPeriodicity(e.target.value)}
        />
      </div>
      <button type="submit">{company?.name ? 'Update' : 'Add'} Company</button>
    </form>
  );
};

export default CompanyForm;
