import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center'
  };

  const logoStyle = {
    color: '#007bff',
    marginRight: 'auto', // Pushes all other links to the right
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const linkStyle = {
    color: '#333',
    margin: '0 0.75rem',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500'
  };

  const ctaStyle = {
    ...linkStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '5px'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>ClaimConnect</Link>
      
      <Link to="/patients" style={linkStyle}>View Patients</Link>
      <Link to="/hospitals" style={linkStyle}>View Hospitals</Link>
      <Link to="/claims" style={linkStyle}>View Claims</Link>
      <Link to="/policies" style={linkStyle}>View Policies</Link>

      <Link to="/submit-claim" style={ctaStyle}>Submit New Claim</Link>
    </nav>
  );
}

export default Navbar;