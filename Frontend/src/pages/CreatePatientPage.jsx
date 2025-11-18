import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // We'll use this to go back to the patient list

const API_URL = 'http://localhost:9090'; // Our API Gateway

function CreatePatientPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the page from reloading
    setMessage('Submitting new patient...');

    const patientData = {
      name,
      email,
      phoneNumber,
      address
    };

    try {
      const response = await axios.post(`${API_URL}/api/patients`, patientData);
      setMessage(`Success! New patient created with ID: ${response.data.id}`);
      
      // After 2 seconds, go back to the patient list page
      setTimeout(() => {
        navigate('/patients');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to submit patient.'}`);
      console.error("Error submitting patient:", error);
    }
  };

  // --- Styles (copied from SubmitClaimPage) ---
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  };
  const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  };
  const inputStyle = {
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem'
  };
  const buttonStyle = {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create New Patient</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>
        
        <label style={labelStyle} htmlFor="name">Full Name</label>
        <input 
          id="name" 
          type="text" 
          style={inputStyle} 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g., John Doe"
        />

        <label style={labelStyle} htmlFor="email">Email Address</label>
        <input 
          id="email" 
          type="email" 
          style={inputStyle} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="e.g., john.doe@example.com"
        />

        <label style={labelStyle} htmlFor="phone">Phone Number</label>
        <input 
          id="phone" 
          type="text" 
          style={inputStyle} 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          placeholder="e.g., 9876543210"
        />

        <label style={labelStyle} htmlFor="address">Address</label>
        <textarea 
          id="address" 
          style={inputStyle} 
          rows="3"
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g., 123 Main St, Visakhapatnam"
        />

        <button style={buttonStyle} type="submit">Create Patient</button>

        {/* Show success or error messages */}
        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default CreatePatientPage;