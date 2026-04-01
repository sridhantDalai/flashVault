import React, { useState, useEffect } from 'react';
import './dashboardTemp.scss';
import { useNavigate } from "react-router-dom";

const DashboardTemp = () => {
  const [files, setFiles] = useState([]);
  // Initial 5 minutes in seconds (300)
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://flashvault-production.up.railway.app/getImg");
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  // Timer Logic
  useEffect(() => {


    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isImage = (file) => {
    const imageFormats = ["jpg", "jpeg", "png", "webp", "gif"];
    return imageFormats.includes(file.format);
  };

  const handleDelete = async (public_id) => {
    try {
      const res = await fetch("https://flashvault-production.up.railway.app/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });
      const data = await res.json();
      if (data.success) {
        setFiles((prev) => prev.filter((file) => file.public_id !== public_id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (url, name) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if(timeLeft <= 0){
    navigate("/loadTemp", {
      replace: true,
      state: { type: "logout" }
    })
  }
  
  const handleUpload = () => navigate("/upload");
  const handleKey = () => navigate("/key");

  return (
    <div className="dashboard-container">
      <div className="glass-grid">
        <aside className="sidebar-nav">
          <div className="brand">
            <div className="logo-dot"></div>
            <span>Vault</span>
          </div>

          <div className="nav-group">
            <button className="nav-btn active">
              <span className="icon">📁</span> Files
            </button>
            <button onClick={handleKey} className="nav-btn">
              <span className="icon">🔑</span> ENV Key
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

        <main className="main-viewport">
          <header className="content-header">
            <div>
              <h1>Welcome<br/>{user?.name}</h1>
              <p className="subtitle">Manage your temporary transfers</p>
            </div>
            <div className="timer-badge">
                <span className="timer-icon">⏳</span>
                <span className="timer-text">{formatTime(timeLeft)}</span>
                <div className="timer-progress" style={{ width: `${(timeLeft / 300) * 100}%` }}></div>
                <p className="logout-text" style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.8 }}>
                You will Log out in
              </p>
            </div>
          </header>

          <div className="files-grid">
            {files.map((file, index) => {
              const fileName = `file${files.length - index}.${file.format}`;
              return (
                <div key={file.public_id} className="file-item">
                  <div className="file-icon">
                    <span className="glow-effect"></span>
                    {isImage(file) ? (
                      <img src={file.secure_url} alt="file" className="file-preview" />
                    ) : (
                      <div className="file-placeholder"></div>
                    )}
                  </div>

                  <div className="file-meta">
                    <h3 className="file-name">{fileName}</h3>
                    <div className="expiry-tag">Expires in {formatTime(timeLeft)}</div>
                  </div>

                  <button onClick={() => handleDownload(file.secure_url, fileName)} className="download-btn">↓</button>

                  <div className="file-actions">
                    <button className="delete-btn" onClick={() => handleDelete(file.public_id)}>
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

export default DashboardTemp;