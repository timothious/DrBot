import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaPowerOff, FaBars, FaCog, FaUserCircle } from "react-icons/fa";
import "./Styles/home.css";
import Setting from "./Setting"; 
import Profile from "./Profile";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleProfileUpdate = (image) => {
    setProfileImage(image);
    localStorage.setItem("profileImage", image);
    setIsProfileOpen(false);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    
    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Hello! How can I assist you?", sender: "bot" }]);
    }, 500);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="home-container">
      <nav className="navbar">
        <button 
          className={`nav-btn ${isSidebarOpen ? "nav-btn-active" : ""}`} 
          onClick={toggleSidebar} 
          title="Toggle Sidebar"
        >
          <FaBars />
        </button>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <FaPowerOff />
        </button>
      </nav>

      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-icons">
          <FaBook className="icon" title="Notebook" />
        </div>
        <div className="line_separator"></div>
        <div className="sidebar-lower-icons">
          <FaCog className="icon" title="Settings" onClick={toggleSettings} />
          <div className="profile-icon-container" onClick={toggleProfile} title="Profile">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-icon" />
            ) : (
              <FaUserCircle className="icon" />
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        {!isSettingsOpen && !isProfileOpen && (
          <div className="chat-container">
            {messages.length === 0 && (
              <p className="Bot-Intro-Msg">🤖 Hello! How can I assist you today?</p>
            )}
            <div className="chat-box">
              {messages.map((msg, index) => (
                <p key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                  {msg.text}
                </p>
              ))}
            </div>
            <div className="chat-input-container">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Type a message..." 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
        <Setting isOpen={isSettingsOpen} onClose={toggleSettings} />
        <Profile isOpen={isProfileOpen} toggleProfile={toggleProfile} onUpdateProfile={handleProfileUpdate} />
      </main>
    </div>
  );
};

export default Home;
