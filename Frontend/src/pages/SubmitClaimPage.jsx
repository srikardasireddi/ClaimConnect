import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function SubmitClaimPage() {
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  
  const [patientId, setPatientId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch Patients
    axios.get(`${API_URL}/api/patients`)
      .then(response => {
        setPatients(response.data);
        if (response.data.length > 0) setPatientId(response.data[0].id);
      })
      .catch(err => console.error("Error fetching patients:", err));

    // Fetch Hospitals
    axios.get(`${API_URL}/api/hospitals`)
      .then(response => {
        setHospitals(response.data);
        if (response.data.length > 0) setHospitalId(response.data[0].id);
      })
      .catch(err => console.error("Error fetching hospitals:", err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setMessage('Submitting claim...');

    const claimData = {
      patientId: Number(patientId),
      hospitalId: Number(hospitalId),
      amount: Number(amount),
      description: description
    };

    try {
      const response = await axios.post(`${API_URL}/api/claims`, claimData);
      setMessage(`Success! New claim created with ID: ${response.data.id}`);
      setAmount('');
      setDescription('');
    } catch (error) {
      setMessage(`Error: ${error.response.data.message || 'Failed to submit claim.'}`);
      console.error("Error submitting claim:", error);
    }
  };

  // --- NEW STYLES ---
  const pageStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem'
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '1rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  };

  const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#555'
  };

  const inputStyle = {
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#fff' // Ensure it's white
  };
  
  const buttonStyle = {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };
  
  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center' }}>Submit a New Claim</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>
        
        <label style={labelStyle} htmlFor="patient">Select Patient</label>
        <select 
          id="patient" 
          style={inputStyle} 
          value={patientId} 
          onChange={(e) => setPatientId(e.target.value)}
        >
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} (ID: {patient.id})
            </option>
          ))}
        </select>

        <label style={labelStyle} htmlFor="hospital">Select Hospital</label>
        <select 
          id="hospital" 
          style={inputStyle} 
          value={hospitalId} 
          onChange={(e) => setHospitalId(e.target.value)}
        >
          {hospitals.map(hospital => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name} (ID: {hospital.id})
            </option>
          ))}
        </select>

        <label style={labelStyle} htmlFor="amount">Claim Amount</label>
        <input 
          id="amount" 
          type="number" 
          style={inputStyle} 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="e.g., 50000.0"
        />

        <label style={labelStyle} htmlFor="description">Description of Claim</label>
        <textarea 
          id="description" 
          style={inputStyle} 
          rows="4"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Fever and consultation"
        />

        <button style={buttonStyle} type="submit">Submit Claim</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default SubmitClaimPage;