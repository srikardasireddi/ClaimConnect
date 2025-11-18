import React from 'react';

function HomePage() {
  const pageStyle = {
    padding: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    maxWidth: '900px',
    margin: '2rem auto'
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Welcome to ClaimConnect</h1>
        <p>This is the central management system for your insurance claims.</p>
        <p>Use the navigation bar above to manage patients, hospitals, policies, or to submit a new claim.</p>
      </div>
    </div>
  );
}

export default HomePage;