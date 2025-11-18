import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function PatientListPage() {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState('Loading patients...');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/patients`);
        setPatients(response.data);
        setMessage(''); 
      } catch (error) {
        setMessage('Error fetching patients. Is your backend running?');
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`${API_URL}/api/patients/${patientId}`);
      setPatients(patients.filter(patient => patient.id !== patientId));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error deleting patient ${patientId}. Is the backend running?`);
      console.error("Error deleting patient:", error);
    }
  };

  // --- NEW STYLES ---
  const pageStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem'
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };
  
  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    color: '#fff',
    backgroundColor: '#28a745', // Green
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold'
  };
  
  const tableContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflow: 'hidden' // Important for rounded corners on tables
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };
  
  const thStyle = {
    padding: '1rem',
    borderBottom: '2px solid #f4f7f6',
    background: '#f8f9fa',
    textAlign: 'left',
    color: '#555'
  };
  
  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #f4f7f6'
  };

  const actionsCellStyle = { 
    ...tdStyle,
    display: 'flex',
    gap: '0.5rem',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff', // Blue
    padding: '0.4rem 0.8rem'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Red
    padding: '0.4rem 0.8rem'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1>Patient Management</h1>
        <Link to="/patients/new" style={buttonStyle}>
          Create New Patient
        </Link>
      </div>

      {message && <p>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td style={tdStyle}>{patient.id}</td>
                <td style={tdStyle}>{patient.name}</td>
                <td style={tdStyle}>{patient.email}</td>
                <td style={actionsCellStyle}>
                  <Link to={`/patients/edit/${patient.id}`} style={editButtonStyle}>
                    Edit
                  </Link>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(patient.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientListPage;