import React, { useState } from "react";
import "./Styles/setting.css";

const Setting = ({ isOpen, onClose, userId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = async () => {
    if (!name && !email) {
      alert("Please enter at least one field to update.");
      return;
    }

    const response = await fetch("http://localhost:5000/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, name, email }),
    });

    const data = await response.json();
    alert(data.message);
  };

  if (!isOpen) return null;

  return (
    <div className="setting-overlay">
      <div className="setting-container">
        <h2 className="section-title">Personal Details</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
