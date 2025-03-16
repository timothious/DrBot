import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import "./Styles/profile.css";

const Profile = ({ isOpen, toggleProfile, onUpdateProfile }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (profileImage) {
      onUpdateProfile(profileImage);
      toggleProfile();
    } else {
      alert("Please select an image before updating.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <button className="close-btn" onClick={toggleProfile}>
          <FaTimes />
        </button>
        <div className="profile-content">
          <label htmlFor="profile-upload" className="profile-upload">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="upload-placeholder">
                <FaCloudUploadAlt className="upload-icon" />
                <p>No file chosen, yet!</p>
              </div>
            )}
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          <div className="button-container">
            <label htmlFor="profile-upload" className="upload-button">
              Choose a File
            </label>
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
