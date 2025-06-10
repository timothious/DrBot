# DrBot - Cancer Support Chatbot 🤖🩺

This project provides a simple setup for a chatbot application called **DrBot**, designed to answer cancer-related questions using the Gemini API. It includes a Node.js backend and a lightweight frontend.

## Steps to Run

1. Start the XAMPP server (Apache and MySQL if required)
2. Navigate to the backend directory:
   ```bash
   cd DrBot/Backend
## Start the Node.js backend server:
node server.js

## Start the frontend (if located in a folder named div):
npm start div


## Technologies Used
React – Frontend framework
Node.js – Backend runtime environment
Gemini API – Cancer-related AI question answering
XAMPP – Local server for Apache & MySQL

**Install and Start XAMPP**  
   Download and install XAMPP from the official website:  
   👉 [https://www.apachefriends.org/download.html]
   After installation, launch XAMPP and start the **Apache** and **MySQL** services.

** ✅ Notes
Ensure you have Node.js and npm installed.
A valid Gemini API key is required in your backend.
Frontend and backend run independently, so ensure both are active for full functionality.

## Project Structure
```bash
   DrBot/
   ├── Backend/              # Node.js backend server using Gemini API
   ├── node_modules/
   ├── public/
   ├── src/
   │   ├── assets/           # Static assets like images
   │   ├── components/       # React page components
   │   │   ├── Styles/       # CSS/styling files
   │   │   ├── home.jsx      # Home page of the chatbot
   │   │   ├── Profile.jsx   # User profile page
   │   │   ├── Setting.jsx   # App settings page
   │   │   └── SignIn.jsx    # User sign-in page
   │   ├── api.js            # Handles API calls to the backend (Gemini API integration)
   │   ├── App.jsx           # Main application component
   │   ├── App.css           # Main CSS file
   │   └── index.css         # Global CSS styles
   ├── .dist/                # Distribution/build files




