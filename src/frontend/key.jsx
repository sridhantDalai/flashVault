import {useEffect} from 'react';
import './key.scss';

import { useNavigate } from "react-router-dom";

function Key() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const handleDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">YOUR ENVIRONMENT KEY</h1>
        
        <div className="key-display">
          <code>{user?.envKey}</code>
        </div>

        <button onClick={handleDashboard} className="dashboard-btn" >
          Goto dashboard
        </button>
      </div>
    </div>
  );
}

export default Key;