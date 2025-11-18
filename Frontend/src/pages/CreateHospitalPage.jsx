import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function CreateHospitalPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Submitting new hospital...');

    try {
      const response = await axios.post(`${API_URL}/api/hospitals`, formData);
      setMessage(`Success! New hospital created with ID: ${response.data.id}`);
      
      setTimeout(() => {
        navigate('/hospitals');
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to submit hospital.'}`);
      console.error("Error submitting hospital:", error);
    }
  };

  // --- Styles (copied from our other forms) ---
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const labelStyle = { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' };
  const inputStyle = { padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create New Hospital</h1>
      
      <form style={formStyle} onSubmit={handleSubmit}>
        
        <label style={labelStyle} htmlFor="name">Hospital Name</label>
        <input id="name" name="name" type="text" style={inputStyle} value={formData.name} onChange={handleChange} />

        <label style={labelStyle} htmlFor="address">Address</label>
        <input id="address" name="address" type="text" style={inputStyle} value={formData.address} onChange={handleChange} />

        <label style={labelStyle} htmlFor="city">City</label>
        <input id="city" name="city" type="text" style={inputStyle} value={formData.city} onChange={handleChange} />

        <label style={labelStyle} htmlFor="state">State</label>
        <input id="state" name="state" type="text" style={inputStyle} value={formData.state} onChange={handleChange} />

        <label style={labelStyle} htmlFor="zipCode">Zip Code</label>
        <input id="zipCode" name="zipCode" type="text" style={inputStyle} value={formData.zipCode} onChange={handleChange} />

        <button style={buttonStyle} type="submit">Create Hospital</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default CreateHospitalPage;