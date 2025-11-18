import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function EditPatientPage() {
  // useParams gets the ":id" from the URL
  const { id } = useParams(); 
  
  // formData will hold the patient's data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  
  const [message, setMessage] = useState('Loading patient data...');
  const navigate = useNavigate(); // Hook to navigate programmatically

  // --- 1. FETCH DATA ON PAGE LOAD ---
  useEffect(() => {
    // This runs as soon as the component loads
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/patients/${id}`);
        // Fill the form with the data from the backend
        setFormData(response.data);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching patient data.');
        console.error("Error fetching patient:", error);
      }
    };
    
    fetchPatient();
  }, [id]); // The [id] means this will re-run if the ID in the URL changes

  // --- 2. UPDATE STATE ON FORM CHANGE ---
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

    try {
      // Send a PUT request to update the patient
      const response = await axios.put(`${API_URL}/api/patients/${id}`, formData);
      setMessage(`Success! Patient (ID: ${response.data.id}) has been updated.`);
      
      // After 2 seconds, go back to the patient list page
      setTimeout(() => {
        navigate('/patients');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to save changes.'}`);
      console.error("Error updating patient:", error);
    }
  };

  // --- Styles (copied from our other forms) ---
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const labelStyle = { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' };
  const inputStyle = { padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Patient (ID: {id})</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>
        
        <label style={labelStyle} htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text" style={inputStyle} value={formData.name} onChange={handleChange} />

        <label style={labelStyle} htmlFor="email">Email Address</label>
        <input id="email" name="email" type="email" style={inputStyle} value={formData.email} onChange={handleChange} />

        <label style={labelStyle} htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" name="phoneNumber" type="text" style={inputStyle} value={formData.phoneNumber} onChange={handleChange} />

        <label style={labelStyle} htmlFor="address">Address</label>
        <textarea id="address" name="address" style={inputStyle} rows="3" value={formData.address} onChange={handleChange} />

        <button style={buttonStyle} type="submit">Save Changes</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default EditPatientPage;