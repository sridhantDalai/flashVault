import React, { useState, useRef } from 'react';
import "./check.scss";

const Check = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onBtnClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    // Ensure "file" matches upload.single("file") in your Node.js route
    formData.append("file", file); 

    try {
      const res = await fetch("https://flashvault-production.up.railway.app/check", {
        method: "POST",
        body: formData,
        // IMPORTANT: Do NOT set Content-Type header manually. 
        // The browser will set it to multipart/form-data with the boundary automatically.
      });

      const data = await res.json(); // Changed to .json() for better handling
      console.log("Response from server:", data);
      
      if(res.ok) {
        alert("Upload successful!");
        setFile(null); // Clear the file after success
      }
    } catch (err) {
      console.error("Error during upload:", err);
    }
  };

  return (
    <div className='checkScreen'>
      {/* Cleaned up form attributes */}
      <form 
        className="uploadCard" 
        onSubmit={handleSubmit} 
      >
        <h1>Upload File</h1>
        <p>Testing Multer Upload</p>
        
        <div className="dropZone" onClick={onBtnClick}>
          <input 
            type="file" 
            name="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            hidden 
          />
          <div className="icon">＋</div>
          <span>{file ? file.name : "Click to select"}</span>
        </div>

        {file && (
          <button type="submit" className="uploadBtn">
            Check Now
          </button>
        )}
      </form>
    </div>
  );
};

export default Check;