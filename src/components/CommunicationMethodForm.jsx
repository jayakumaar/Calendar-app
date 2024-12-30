// src/components/CommunicationMethodForm.js
import React, { useState } from 'react';

const CommunicationMethodForm = ({ onSubmit, method = {} }) => {
  const [name, setName] = useState(method.name || '');
  const [description, setDescription] = useState(method.description || '');
  const [sequence, setSequence] = useState(method.sequence || '');
  const [mandatory, setMandatory] = useState(method.mandatory || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const methodData = { name, description, sequence, mandatory };
    onSubmit(methodData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{method.name ? 'Edit Communication Method' : 'Add Communication Method'}</h2>
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
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Sequence:</label>
        <input
          type="number"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mandatory:</label>
        <input
          type="checkbox"
          checked={mandatory}
          onChange={(e) => setMandatory(e.target.checked)}
        />
      </div>
      <button type="submit">{method.name ? 'Update' : 'Add'} Method</button>
    </form>
  );
};

export default CommunicationMethodForm;
