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

  // Add this inside the Check component
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    console.log("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file); // 👈 MUST match upload.single("file")

  try {
    const res = await fetch("http://localhost:8081/check", {
      method: "POST",
      body: formData
    });

    const data = await res.text();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
    };

  return (
    <div className='checkScreen'>
      {/* FORM WRAPPER FOR MULTER */}
      <form 
        className="uploadCard" 
        action="/upload"  // Replace with your API endpoint
        method="POST"
        onSubmit={handleSubmit} 
        header={{ 'Content-Type': 'multipart/form-data' }}
      >
        <h1>Upload File</h1>
        <p>Testing Multer Upload</p>
        
        <div className="dropZone" onClick={onBtnClick}>
          {/* Ensure 'name' matches your multer upload.single('file') name */}
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