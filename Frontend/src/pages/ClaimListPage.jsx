import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- IMPORT LINK

const API_URL = 'http://localhost:9090'; // Our API Gateway

function ClaimListPage() {
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState('Loading claims...');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/claims`);
        setClaims(response.data);
        setMessage(''); // Clear loading message
      } catch (error) {
        setMessage('Error fetching claims. Is your backend running?');
        console.error(error);
      }
    };

    fetchClaims();
  }, []);
  
  const linkStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Claim Management</h1>
      {message && <p>{message}</p>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Claim ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Patient ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hospital ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim => (
            <tr key={claim.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {/* --- THIS IS THE CHANGE --- */}
                <Link to={`/claims/${claim.id}`} style={linkStyle}>
                  {claim.id}
                </Link>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{claim.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{claim.patientId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{claim.hospitalId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{claim.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClaimListPage;