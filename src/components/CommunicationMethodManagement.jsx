import React, { useState } from 'react';
import CommunicationMethodForm from './CommunicationMethodForm';

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: false },
    { name: 'Email', description: 'Send an Email', sequence: 3, mandatory: false },
    { name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other methods of communication', sequence: 5, mandatory: false },
  ]);
  const [editingMethod, setEditingMethod] = useState(null);

  const handleAddMethod = (methodData) => {
    setMethods([...methods, methodData]);
  };

  const handleEditMethod = (method) => {
    setEditingMethod(method);
  };

  const handleUpdateMethod = (updatedMethod) => {
    setMethods(methods.map((method) => method.name === updatedMethod.name ? updatedMethod : method));
    setEditingMethod(null);
  };

  const handleDeleteMethod = (methodName) => {
    setMethods(methods.filter((method) => method.name !== methodName));
  };

  return (
    <div>
      <h1>Communication Method Management</h1>
      {/* Pass an empty object if editingMethod is null */}
      <CommunicationMethodForm 
        onSubmit={editingMethod ? handleUpdateMethod : handleAddMethod} 
        communicationMethod={editingMethod || {}} 
      />
      <div>
        <h2>Communication Method List</h2>
        <ul>
          {methods.map((method) => (
            <li key={method.name}>
              <span>{method.name}</span> - {method.description}
              <button onClick={() => handleEditMethod(method)}>Edit</button>
              <button onClick={() => handleDeleteMethod(method.name)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunicationMethodManagement;
