import React, { useState , useEffect } from 'react';
import './dashboard.scss';

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data for files
  const [files, setFiles] = useState([]);

  useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch("flashvault-production.up.railway.app/getImg");
      const data = await res.json();

      setFiles(data); // direct set
    } catch (err) {
      console.error(err);
    }
  };

  fetchImages();
}, []);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  const navigate = useNavigate()
  
  const handleUpload = () => {
    navigate("/upload")
  }

  const handleKey = () => {
    navigate("/key")
  }


  return (
    <div className="dashboard-container">
      <div className="glass-grid">
        
        {/* Sidebar - Actions */}
        <aside className="sidebar-nav">
          <div className="brand">
            <div className="logo-dot"></div>
            <span>Vault</span>
          </div>

          <div className="nav-group">
            <button className="nav-btn active">
              <span className="icon">📁</span>
              Files
            </button>
            <button onClick={handleKey} className="nav-btn">
              <span className="icon">🔑</span>
              ENV Key
            </button>
          </div>

          <div className="upload-section">
             <button onClick={handleUpload} className="primary-upload-btn">
               <span>+</span> Upload New
             </button>
          </div>
          
          <div className="locker-info">
             <p className="label">Locker Room</p>
             <p className="id">{user?.lockerRoom}</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-viewport">
          <header className="content-header">
            <div>
              <h1>Welcome<br/>{user?.name}</h1>
              <p className="subtitle">Manage your temporary transfers</p>
            </div>
            <div className="user-profile">
               <img src="https://api.dicebear.com/7.x/shapes/svg?seed=S" alt="Profile" />
            </div>
          </header>

          <div className="files-grid">
            {files.map(file => (
              <div key={file.id} className="file-item">
                <div className="file-icon">
                  <span className="glow-effect"></span>
                  {/* ---- */}
                  <img 
                    src={file.secure_url} 
                    alt="file" 
                    width="60" 
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  {/* ------ */}
                </div>
                <div className="file-meta">
                  <h3 className="file-name">{file.public_id}</h3>
                  <div className="file-stats">
                    <span className="dot">•</span>
                  </div>
                </div>
                <button className="download-btn">↓</button>

                <div className="file-actions">
                  <button className="delete-btn">
                    <span className="icon">🗑</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;