import React, { useState } from 'react';
import '.././styles/CommunicationMethod.css'; // Make sure this is correct based on your folder structure

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Send an email', sequence: 3, mandatory: false },
    { name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other methods', sequence: 5, mandatory: false }
  ]);

  const handleAddMethod = (method) => {
    setMethods([...methods, method]);
  };

  const handleEditMethod = (index, updatedMethod) => {
    const newMethods = [...methods];
    newMethods[index] = updatedMethod;
    setMethods(newMethods);
  };

  const handleDeleteMethod = (index) => {
    const newMethods = methods.filter((_, i) => i !== index);
    setMethods(newMethods);
  };

  return (
    <div>
      <h2>Communication Methods</h2>
      <ul>
        {methods.map((method, index) => (
          <li key={index}>
            <span>{method.name}</span> - {method.description} - Sequence: {method.sequence} - Mandatory: {method.mandatory ? "Yes" : "No"}
            <button onClick={() => handleEditMethod(index, { ...method, description: 'Updated Description', mandatory: !method.mandatory })}>Edit</button>
            <button onClick={() => handleDeleteMethod(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddMethod({ name: 'New Method', description: 'Description', sequence: methods.length + 1, mandatory: false })}>Add Method</button>
    </div>
  );
};

export default CommunicationMethods;
