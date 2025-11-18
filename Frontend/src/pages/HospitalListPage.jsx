import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function HospitalListPage() {
  const [hospitals, setHospitals] = useState([]);
  const [message, setMessage] = useState('Loading hospitals...');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hospitals`);
        setHospitals(response.data);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching hospitals. Is your backend running?');
        console.error(error);
      }
    };
    fetchHospitals();
  }, []);

  // --- NEW DELETE FUNCTION ---
  const handleDelete = async (hospitalId) => {
    try {
      await axios.delete(`${API_URL}/api/hospitals/${hospitalId}`);
      // Remove from UI without reloading
      setHospitals(hospitals.filter(h => h.id !== hospitalId));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error deleting hospital ${hospitalId}.`);
      console.error("Error deleting hospital:", error);
    }
  };

  // --- STYLES ---
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' };
  const buttonStyle = { padding: '0.5rem 1rem', fontSize: '1rem', color: '#fff', backgroundColor: '#28a745', border: 'none', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' };
  const actionsCellStyle = { padding: '10px', border: '1px solid #ddd', textAlign: 'center', display: 'flex', gap: '0.5rem', justifyContent: 'center' };
  const editButtonStyle = { ...buttonStyle, backgroundColor: '#007bff', fontSize: '0.9rem', padding: '0.25rem 0.5rem' };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545', fontSize: '0.9rem', padding: '0.25rem 0.5rem' };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={headerStyle}>
        <h1>Hospital Management</h1>
        <Link to="/hospitals/new" style={buttonStyle}>
          Create New Hospital
        </Link>
      </div>
      
      {message && <p>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>City</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>State</th>
            {/* --- NEW COLUMN --- */}
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(hospital => (
            <tr key={hospital.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hospital.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hospital.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hospital.city}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hospital.state}</td>
              {/* --- NEW ACTIONS CELL --- */}
              <td style={actionsCellStyle}>
                <Link 
                  to={`/hospitals/edit/${hospital.id}`} 
                  style={editButtonStyle}
                >
                  Edit
                </Link>
                <button 
                  style={deleteButtonStyle} 
                  onClick={() => handleDelete(hospital.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HospitalListPage;