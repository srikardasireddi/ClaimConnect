import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function CreatePolicyPage() {
  const [patients, setPatients] = useState([]);
  
  // Form data
  const [patientId, setPatientId] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [providerName, setProviderName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch patients when the page loads
  useEffect(() => {
    axios.get(`${API_URL}/api/patients`)
      .then(response => {
        setPatients(response.data);
        if (response.data.length > 0) {
          setPatientId(response.data[0].id); // Set default patient
        }
      })
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Submitting new policy...');

    const policyData = {
      patientId: Number(patientId),
      policyNumber,
      providerName,
      startDate,
      endDate,
      coverageAmount: Number(coverageAmount)
    };

    try {
      const response = await axios.post(`${API_URL}/api/policies`, policyData);
      setMessage(`Success! New policy created with ID: ${response.data.id}`);
      
      setTimeout(() => {
        navigate('/policies');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to submit policy.'}`);
      console.error("Error submitting policy:", error);
    }
  };

  // --- Styles (copied from our other forms) ---
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const labelStyle = { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' };
  const inputStyle = { padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create New Insurance Policy</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>

        <label style={labelStyle} htmlFor="patient">Select Patient</label>
        <select id="patient" style={inputStyle} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} (ID: {patient.id})
            </option>
          ))}
        </select>
        
        <label style={labelStyle} htmlFor="policyNumber">Policy Number</label>
        <input id="policyNumber" type="text" style={inputStyle} value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />

        <label style={labelStyle} htmlFor="providerName">Provider Name</label>
        <input id="providerName" type="text" style={inputStyle} value={providerName} onChange={(e) => setProviderName(e.target.value)} />

        <label style={labelStyle} htmlFor="startDate">Start Date</label>
        <input id="startDate" type="date" style={inputStyle} value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label style={labelStyle} htmlFor="endDate">End Date</label>
        <input id="endDate" type="date" style={inputStyle} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        
        <label style={labelStyle} htmlFor="coverageAmount">Coverage Amount</label>
        <input id="coverageAmount" type="number" style={inputStyle} value={coverageAmount} onChange={(e) => setCoverageAmount(e.target.value)} />

        <button style={buttonStyle} type="submit">Create Policy</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default CreatePolicyPage;