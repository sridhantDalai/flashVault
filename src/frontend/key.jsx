import React from 'react';
import './key.scss';

function Key() {
  const envKey = "4A2B-91X7-KL09-PROX"; // Placeholder key

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">YOUR ENVIRONMENT KEY</h1>
        
        <div className="key-display">
          <code>{envKey}</code>
        </div>

        <button className="dashboard-btn" onClick={() => console.log('Redirecting...')}>
          Goto dashboard
        </button>
      </div>
    </div>
  );
}

export default Key;