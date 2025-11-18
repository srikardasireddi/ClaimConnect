import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // This hook reads the ID from the URL
import axios from 'axios';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function ClaimDetailsPage() {
  const [claimDetails, setClaimDetails] = useState(null);
  const [message, setMessage] = useState('Loading claim details...');
  
  // Get the 'id' from the URL (e.g., /claims/1)
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchClaimDetails = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/claims/${id}`);
          setClaimDetails(response.data);
          setMessage('');
        } catch (error) {
          setMessage(`Error fetching claim details for ID ${id}.`);
          console.error(error);
        }
      };
      fetchClaimDetails();
    }
  }, [id]); // Re-run this if the 'id' in the URL changes

  // --- Styles ---
  const containerStyle = {
    padding: '2rem',
  };
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '2rem',
    maxWidth: '800px',
    margin: '1rem auto'
  };
  const sectionTitleStyle = {
    borderBottom: '2px solid #007bff',
    paddingBottom: '0.5rem',
    color: '#007bff',
    marginTop: '0'
  };
  const detailGrid = {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    gap: '1rem'
  };
  const labelStyle = {
    fontWeight: 'bold',
    color: '#555'
  };

  if (message) {
    return (
      <div style={containerStyle}>
        <h1>{message}</h1>
      </div>
    );
  }

  if (!claimDetails) {
    return null; // Should be covered by loading message
  }

  // We have the data, render it
  return (
    <div style={containerStyle}>
      <h1>Claim Details: ID #{claimDetails.claim.id}</h1>
      
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Claim Information</h2>
        <div style={detailGrid}>
          <span style={labelStyle}>Status:</span>
          <span>{claimDetails.claim.status}</span>
          
          <span style={labelStyle}>Amount:</span>
          <span>${claimDetails.claim.amount.toLocaleString()}</span>
          
          <span style={labelStyle}>Claim Date:</span>
          <span>{claimDetails.claim.claimDate}</span>
          
          <span style={labelStyle}>Description:</span>
          <span>{claimDetails.claim.description}</span>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Patient Details</h2>
        <div style={detailGrid}>
          <span style={labelStyle}>Patient ID:</span>
          <span>{claimDetails.patient.id}</span>
          
          <span style={labelStyle}>Name:</span>
          <span>{claimDetails.patient.name}</span>
          
          <span style={labelStyle}>Email:</span>
          <span>{claimDetails.patient.email}</span>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Hospital Details</h2>
        <div style={detailGrid}>
          <span style={labelStyle}>Hospital ID:</span>
          <span>{claimDetails.hospital.id}</span>
          
          <span style={labelStyle}>Name:</span>
          <span>{claimDetails.hospital.name}</span>
          
          <span style={labelStyle}>Location:</span>
          <span>{claimDetails.hospital.city}</span>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailsPage;