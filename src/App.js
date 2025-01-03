import React, { useState } from 'react';
import SwipeableView from './components/SwipeableView'
import Feed from './pages/Feed'; 
import LoginSignup from './components/LoginSignup'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]); 

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);  
    setUser(username);    
   

  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);  
    setUser(null);          
    setVideos([]);          
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
