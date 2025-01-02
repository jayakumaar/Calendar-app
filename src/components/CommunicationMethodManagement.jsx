import React, { useState } from 'react';
import '../styles/CommunicationMethod.css';

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Share or interact with company posts on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Launch the grand mobile', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Cancelled freshers hiring', sequence: 3, mandatory: true },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newMethod, setNewMethod] = useState({ name: '', description: '', sequence: '', mandatory: false });
  const [error, setError] = useState({ name: '', description: '', sequence: '' });

  const handleAddMethod = () => {
    setShowPopup(true);
  };

  const handleSaveMethod = () => {
    let isValid = true;
    const newError = { name: '', description: '', sequence: '' };

    // Validate each field
    if (!newMethod.name) {
      newError.name = 'Please enter the method name';
      isValid = false;
    }
    if (!newMethod.description) {
      newError.description = 'Please enter the method description';
      isValid = false;
    }
    if (!newMethod.sequence) {
      newError.sequence = 'Please enter the sequence number';
      isValid = false;
    }

    if (isValid) {
      setMethods([...methods, { ...newMethod, sequence: parseInt(newMethod.sequence) }]);
      setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
      setShowPopup(false);
    } else {
      setError(newError); // Display error messages
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
    setError({ name: '', description: '', sequence: '' }); // Reset error messages on cancel
  };

  return (
    <div className="communication-methods">
      <div className="header">
        <h1>Communication Methods</h1>
        <button className="add-method" onClick={handleAddMethod}>
          + Add Method
        </button>
      </div>
      <table className="methods-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sequence</th>
            <th>Mandatory</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method, index) => (
            <tr key={index}>
              <td>{method.name}</td>
              <td>{method.description}</td>
              <td>{method.sequence}</td>
              <td>{method.mandatory ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Method</h2>
            <label>Method Name</label>
            <input
              type="text"
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
            />
            {error.name && <div className="error">{error.name}</div>} {/* Display error */}

            <label>Description</label>
            <input
              type="text"
              value={newMethod.description}
              onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
            />
            {error.description && <div className="error">{error.description}</div>} {/* Display error */}

            <label>Sequence</label>
            <input
              type="number"
              value={newMethod.sequence}
              onChange={(e) => setNewMethod({ ...newMethod, sequence: e.target.value })}
            />
            {error.sequence && <div className="error">{error.sequence}</div>} {/* Display error */}

            <label>
              Mandatory
              <input
                type="checkbox"
                checked={newMethod.mandatory}
                onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
              />
            </label>

            <div className="popup-buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSaveMethod}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethods;
