import React, { useState } from 'react';
import SwipeableView from './components/SwipeableView'
import Feed from './pages/Feed'; // Import the SwipeableView component
import LoginSignup from './components/LoginSignup'; // Import the LoginSignup component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]); // Array to store video data

  // Function to handle successful login
  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);  // Set login status to true
    setUser(username);    // Store the logged-in user's name
    // Simulate loading videos (can be replaced with an API call)

  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);  // Set login status to false
    setUser(null);          // Clear the user data
    setVideos([]);          // Clear the video list
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginSignup onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Feed videos={videos} />
          
        </>
      )}
    </div>
  );
}

export default App;
