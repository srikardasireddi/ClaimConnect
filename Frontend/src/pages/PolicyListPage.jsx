import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function PolicyListPage() {
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState('Loading policies...');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // ... fetchPolicies logic is the same ...
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/policies`);
        setPolicies(response.data);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching policies. Is your backend running?');
        console.error(error);
      }
    };
    fetchPolicies();
  }, []);

  // --- NEW DELETE FUNCTION ---
  const handleDelete = async (policyId) => {
    try {
      await axios.delete(`${API_URL}/api/policies/${policyId}`);
      // Remove from UI
      setPolicies(policies.filter(p => p.id !== policyId));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error deleting policy ${policyId}.`);
      console.error("Error deleting policy:", error);
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
        <h1>Insurance Policy Management</h1>
        <Link to="/policies/new" style={buttonStyle}>
          Create New Policy
        </Link>
      </div>
      
      {message && <p>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Policy Number</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Provider</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Patient ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
            {/* --- NEW COLUMN --- */}
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map(policy => (
            <tr key={policy.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{policy.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{policy.policyNumber}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{policy.providerName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{policy.patientId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{policy.endDate}</td>
              {/* --- NEW ACTIONS CELL --- */}
              <td style={actionsCellStyle}>
                <Link 
                  to={`/policies/edit/${policy.id}`} 
                  style={editButtonStyle}
                >
                  Edit
                </Link>
                <button 
                  style={deleteButtonStyle} 
                  onClick={() => handleDelete(policy.id)}
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

export default PolicyListPage;