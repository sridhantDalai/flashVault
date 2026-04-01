import React, { useState } from 'react';
import './env.scss';
import { useNavigate } from 'react-router-dom';

const EnvPage = () => {
  const navigate = useNavigate();

  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoToAdminLogin = () => {
    navigate("/");
  };

  
  console.log(sessionStorage.getItem("logIN"))

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!key) {
      return setError("Please enter ENV key");
    }

    try {
      setLoading(true);

      const res = await fetch("https://flashvault-production.up.railway.app/verifyENV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ key })
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/loadTemp", {
        replace: true,
        state: { type: "loggedIn" }
      })

      } else {
        setError(data.message || "Invalid Key");
      }

    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="env-container">
      <div className="glass-card">
        <h1 className="heading">
          Enter Your<br /> Environment Key
        </h1>
        <p className="sub-heading">
          Access your secure workspace
        </p>

        <form className="env-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <input
              type="text"
              placeholder="ENV Key"
              className="env-input"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            <button type="submit" className="btn-primary">
              {loading ? "Checking..." : "Enter Vault"}
            </button>

            <button
              onClick={handleGoToAdminLogin}
              type="button"
              className="btn-secondary"
            >
              Go to Admin Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EnvPage;