import React from 'react';
import './env.scss';
import { useNavigate } from 'react-router-dom';

const EnvPage = () => {
  const navigate = useNavigate();

  const handleGoToAdminLogin = () => {
    navigate("/")
  }

  return (
    <div className="env-container">
      <div className="glass-card">
        <h1 className="heading">Enter Your<br/> Environment Key</h1>
        <p className="sub-heading">Access your secure workspace</p>
        
        <form className="env-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input 
              placeholder="ENV Key" 
              className="env-input"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              Enter Vault
            </button>
            <button onClick={handleGoToAdminLogin} type="button" className="btn-secondary">
              Go to Admin Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnvPage;