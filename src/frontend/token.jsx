import React from 'react';
import './token.scss';

import { useNavigate } from "react-router-dom";

const Token = () => {
    const navigate = useNavigate()

      const handleProfile = () => {
        navigate("/dashboard")
    }

  return (
    <div className="token-container">
      <div className="token-card">
        <h1 className="token-heading">Enter your ENV 🔑 Key</h1>
        <p className="token-subtext">Secure Environment Access</p>
        
        <div className="input-wrapper">
          <input 
            type="text" 
            className="token-input" 
            placeholder="xfna-nfkad-fkhbg" 
          />
        </div>

        <button onClick={handleProfile} className="token-button">
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Token;