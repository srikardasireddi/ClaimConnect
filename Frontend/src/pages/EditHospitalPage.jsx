import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:9090'; // Our API Gateway

function EditHospitalPage() {
  const { id } = useParams(); // Get the ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [message, setMessage] = useState('Loading hospital data...');
  const navigate = useNavigate();

  // 1. Fetch the hospital data when the page loads
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hospitals/${id}`);
        setFormData(response.data); // Fill the form with data
        setMessage('');
      } catch (error) {
        setMessage('Error fetching hospital data.');
        console.error("Error fetching hospital:", error);
      }
    };
    fetchHospital();
  }, [id]);

  // 2. Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Saving changes...');

    try {
      // Send a PUT request to update the hospital
      const response = await axios.put(`${API_URL}/api/hospitals/${id}`, formData);
      setMessage(`Success! Hospital (ID: ${response.data.id}) updated.`);
      
      setTimeout(() => {
        navigate('/hospitals'); // Go back to the hospital list
      }, 2000);

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to save changes.'}`);
      console.error("Error updating hospital:", error);
    }
  };

  // --- Styles ---
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const labelStyle = { marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' };
  const inputStyle = { padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Hospital (ID: {id})</h1>
      
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

        <button style={buttonStyle} type="submit">Save Changes</button>

        {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

export default EditHospitalPage;