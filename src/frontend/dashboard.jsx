import React, { useState , useEffect } from 'react';
import './dashboard.scss';

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data for files
  const [files, setFiles] = useState([]);

  useEffect(() => {
  const fetchImages = async () => {
    try {
      const res = await fetch("https://flashvault-production.up.railway.app/getImg");
      const data = await res.json();

      setFiles(data); // direct set
    } catch (err) {
      console.error(err);
    }
  };

  fetchImages();
}, []);

const isImage = (file) => {
  const imageFormats = ["jpg", "jpeg", "png", "webp", "gif"];
  return imageFormats.includes(file.format);
};

  const handleDelete = async (public_id) => {
  try {
    const res = await fetch(
      "https://flashvault-production.up.railway.app/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      }
    );

    const data = await res.json();

    if (data.success) {
      // remove from UI
      setFiles((prev) =>
        prev.filter((file) => file.public_id !== public_id)
      );
    }
  } catch (err) {
    console.error(err);
  }
};

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
                  {[...files].map((file, index) => {
                    const fileName = `file${files.length - index}.${file.format}`;

                    return (
                      <div key={file.public_id} className="file-item">
                        <div className="file-icon">
                          <span className="glow-effect"></span>

                          {isImage(file) ? (
                            <img 
                              src={file.secure_url} 
                              alt="file" 
                              className="file-preview"
                            />
                          ) : (
                            <div className="file-placeholder"></div>
                          )}
                        </div>

                        <div className="file-meta">
                          <h3 className="file-name">{fileName}</h3>
                          <div className="file-stats">
                            <span className="dot">•</span>
                          </div>
                        </div>

                        <button className="download-btn">↓</button>

                        <div className="file-actions">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(file.public_id)}
                          >
                            <span className="icon">🗑</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;