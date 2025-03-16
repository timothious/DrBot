import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBars, FaHome, FaThLarge, FaCalendarAlt, FaUser, FaFileAlt } from "react-icons/fa";
import "./Styles/SignIn.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <FaHome className="icon" />
        <FaThLarge className="icon" />
        <FaFileAlt className="icon" />
        <FaCalendarAlt className="icon" />
        <FaUser className="icon" />
      </div>
    </>
  );
};

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1000);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:5000/signup", formData);
      setSuccessMessage("Account created successfully! Please Sign In.");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Signup failed. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post("http://localhost:5000/signin", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      
      navigate("/home");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Invalid credentials. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-container ${isActive ? "active" : "inactive"}`}>
        <div className={`container ${isActive ? "active" : ""}`} id="container">
          {/* Sign Up Form */}
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <input type="text" name="name" placeholder="Name" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              <div className="password-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="button" onClick={handleSignIn}>Log In</button>
            </form>
          </div>

          {/* Toggle Panel */}
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <button className="hidden" onClick={toggleActive}>Sign In</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <button className="hidden" onClick={toggleActive}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
