import React, { useState, useRef } from 'react';
import "./upload.scss";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // New state for loading 
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onBtnClick = () => {
    // Prevent clicking the dropzone while an upload is in progress
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    // Get user from localStorage on the FRONTEND
    const user = JSON.parse(localStorage.getItem("user"));
    const user2 = JSON.parse(sessionStorage.getItem("envKey"));

    const formData = new FormData();
    formData.append("file", file);
    // Pass the envKey or user info here
    formData.append("envKey", user?.envKey || user2 || "tempUser" );

    try {
      const res = await fetch("https://flashvault-production.up.railway.app/checkTemp", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response from server:", data);
      
      if(res.ok) {
        alert("Upload successful!");
        setFile(null); 
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error("Error during upload:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsUploading(false); // Stop loading UI regardless of success or failure 
    }
  };

  return (
    <div className='updateScreen'>
      <form className="uploadCard" onSubmit={handleSubmit}>
        <h1>Upload File</h1>
        <p>Testing Multer Upload</p>
        
        <div className={`dropZone ${isUploading ? 'disabled' : ''}`} onClick={onBtnClick}>
          <input 
            type="file" 
            name="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            hidden 
            disabled={isUploading}
          />
          <div className="icon">＋</div>
          <span>{file ? file.name : "Click to select"}</span>
        </div>

        {file && (
          <button 
            type="submit" 
            className="uploadBtn" 
            disabled={isUploading} // Disable button while uploading
          >
            {isUploading ? "WAIT Uploading..." : "Check Now"}
          </button>
        )}

        {/* Optional status text */}
        {isUploading && <p className="status">Please wait, your file is being sent...</p>}
      </form>
    </div>
  );
};

export default Upload;