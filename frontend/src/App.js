import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    status: 'Freshman',
    userId: '',
    collegeEmail: '',
    rollNumber: '',
  });
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    appContainer.classList.add('fade-in');
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  return (
    <div className="app-container background-pattern" style={{ backgroundColor: '#f7f7f7' }}>
      <header className="app-header" style={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
        <h1>College Information</h1>
      </header>
      <main className="app-main">
        <section className="input-section" style={{ padding: '20px' }}>
          <h2>Enter College Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" value={formData.status} onChange={handleFormChange}>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="user-id">User ID:</label>
              <input
                type="text"
                id="user-id"
                name="userId"
                placeholder="Enter your User ID"
                value={formData.userId}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="college-email">College Email:</label>
              <input
                type="email"
                id="college-email"
                name="collegeEmail"
                placeholder="Enter your College Email"
                value={formData.collegeEmail}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="roll-number">College Roll Number:</label>
              <input
                type="text"
                id="roll-number"
                name="rollNumber"
                placeholder="Enter your Roll Number"
                value={formData.rollNumber}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className="submit-button" style={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        </section>
        {response && (
          <section className="response-section" style={{ padding: '20px' }}>
            <h2>College Information Analysis</h2>
            <select
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              className="select-options"
              style={{ width: '100%', height: '200px', padding: '10px', fontSize: '16px' }}
            >
              <option value="status">Status</option>
              <option value="userId">User ID</option>
              <option value="collegeEmail">College Email</option>
              <option value="rollNumber">College Roll Number</option>
            </select>
            <ul className="response-list" style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {selectedOptions.includes('status') && (
                <li style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  <strong>Status:</strong> {response.status}
                </li>
              )}
              {selectedOptions.includes('userId') && (
                <li style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  <strong>User ID:</strong> {response.userId}
                </li>
              )}
              {selectedOptions.includes('collegeEmail') && (
                <li style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  <strong>College Email:</strong> {response.collegeEmail}
                </li>
              )}
              {selectedOptions.includes('rollNumber') && (
                <li style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                  <strong>College Roll Number:</strong> {response.rollNumber}
                </li>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;