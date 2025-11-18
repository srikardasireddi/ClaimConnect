import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function EditPolicyPage() {
  const { id } = useParams(); // Get the policy ID from the URL
  const [patients, setPatients] = useState([]);
  
  // Form data
  const [formData, setFormData] = useState({
    patientId: '',
    policyNumber: '',
    providerName: '',
    startDate: '',
    endDate: '',
    coverageAmount: ''
  });

  const [message, setMessage] = useState('Loading policy data...');
  const navigate = useNavigate();

  // --- 1. FETCH DATA ON PAGE LOAD ---
  useEffect(() => {
    // Fetch all patients for the dropdown
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/patients`);
        setPatients(response.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    // Fetch the specific policy we want to edit
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/policies/${id}`);
        // Format the dates correctly for the <input type="date">
        const policy = response.data;
        policy.startDate = policy.startDate.split('T')[0];
        policy.endDate = policy.endDate.split('T')[0];
        
        setFormData(policy);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching policy data.');
        console.error("Error fetching policy:", error);
      }
    };

    fetchPatients();
    fetchPolicy();
  }, [id]);

  // --- 2. HANDLE FORM FIELD CHANGES ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- 3. HANDLE FORM SUBMISSION ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Saving changes...');

    const policyData = {
      ...formData,
      patientId: Number(formData.patientId),
      coverageAmount: Number(formData.coverageAmount)
    };

    try {
      // Send a PUT request to update the policy
      const response = await axios.put(`${API_URL}/api/policies/${id}`, policyData);
      setMessage(`Success! Policy (ID: ${response.data.id}) updated.`);
      
      setTimeout(() => {
        navigate('/policies');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to save changes.'}`);
      console.error("Error updating policy:", error);
    }
  };

  // --- Styles ---
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const labelStyle = { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' };
  const inputStyle = { padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Policy (ID: {id})</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>

        <label style={labelStyle} htmlFor="patient">Select Patient</label>
        <select 
          id="patient" 
          name="patientId" 
          style={inputStyle} 
          value={formData.patientId} 
          onChange={handleChange}
        >
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} (ID: {patient.id})
            </option>
          ))}
        </select>
        
        <label style={labelStyle} htmlFor="policyNumber">Policy Number</label>
        <input id="policyNumber" name="policyNumber" type="text" style={inputStyle} value={formData.policyNumber} onChange={handleChange} />

        <label style={labelStyle} htmlFor="providerName">Provider Name</label>
        <input id="providerName" name="providerName" type="text" style={inputStyle} value={formData.providerName} onChange={handleChange} />

        <label style={labelStyle} htmlFor="startDate">Start Date</label>
        <input id="startDate" name="startDate" type="date" style={inputStyle} value={formData.startDate} onChange={handleChange} />

        <label style={labelStyle} htmlFor="endDate">End Date</label>
        <input id="endDate" name="endDate" type="date" style={inputStyle} value={formData.endDate} onChange={handleChange} />
        
        <label style={labelStyle} htmlFor="coverageAmount">Coverage Amount</label>
        <input id="coverageAmount" name="coverageAmount" type="number" style={inputStyle} value={formData.coverageAmount} onChange={handleChange} />

        <button style={buttonStyle} type="submit">Save Changes</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default EditPolicyPage;