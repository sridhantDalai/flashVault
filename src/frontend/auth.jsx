import React from 'react';
import './auth.scss';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-heading">Get into flashVault</h1>
        <p className="auth-subtext">Secure your assets instantly</p>
        
        <div className="auth-visual-area">
          <div className="icon-wrapper">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="bolt-icon"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>

        <button className="google-btn">
          Using GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Auth;