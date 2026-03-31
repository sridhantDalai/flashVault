import React from 'react';
import './auth.scss';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const handleENVLogin = () => {
    navigate("/env");
  };

  const handleLogin = () => {
    window.open("https://flashvault-production.up.railway.app/auth/google", "_self");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {/* Main Login Card */}
        <div className="auth-card">
          <h1 className="auth-heading">Get into flashVault</h1>
          <p className="auth-subtext">As an Admin Registration / Log In</p>
          
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

          <button onClick={handleLogin} className="google-btn">
            Using GOOGLE
          </button>
        </div>

        {/* ENV Key Card - Now aligned centrally */}
        <div className="auth-card secondary-card">
          <div className="card-content">
            <h2 className="auth-heading secondary">Do you have an <br/> ENV Key? </h2>
            <p className="auth-subtext">Enter Your Vault as Temporary</p>
            <button onClick={handleENVLogin} className="env-btn">
              Click here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;