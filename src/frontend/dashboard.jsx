import React, { useState } from 'react';
import './dashboard.scss';

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data for files
  const [files, setFiles] = useState([
    { id: 1, name: "Project_Final.zip", size: "12.4 MB", date: "2 mins ago" },
    { id: 2, name: "Invoice_March.pdf", size: "1.2 MB", date: "1 hour ago" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
    { id: 3, name: "Asset_3.png", size: "4.5 MB", date: "Yesterday" },
  ]);

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
             <p className="id">#88219</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-viewport">
          <header className="content-header">
            <div>
              <h1>Welcome {user?.name}</h1>
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
                  📄
                </div>
                <div className="file-meta">
                  <h3 className="file-name">{file.name}</h3>
                  <div className="file-stats">
                    <span>{file.size}</span>
                    <span className="dot">•</span>
                    <span>{file.date}</span>
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