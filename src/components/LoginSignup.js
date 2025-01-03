import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleLogout = () => {
    window.location.reload(); 
  };

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const admin = { admin: 'adminpassword' };

    if (isSignup) {
      if (users[username]) {
        setError('User already exists');
        return;
      }
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      setError('');
      alert('Signup successful! You can now log in.');
      setIsSignup(false);
    } else {
      if (username === 'admin' && password === admin.admin) {
        setIsAdmin(true);
        setError('');
        alert('Admin login successful!');
      } else if (users[username] === password) {
        onLoginSuccess(username);
        setError('');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !videoTitle || !hashtags) {
      setError('All fields are required for video upload');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', videoTitle);
    formData.append('hashtags', hashtags);

    try {
      const response = await fetch('http://localhost:5000/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Video uploaded successfully!');
        setVideoFile(null);
        setVideoTitle('');
        setHashtags('');
        setError('');
      } else {
        const result = await response.text();
        setError(result);
      }
    } catch (err) {
      setError('An error occurred while uploading the video');
    }
  };

  return (
    <div className="login-signup-screen">
      {!isAdmin && (
        <form className={`auth-form ${isAdmin ? 'hidden' : ''}`} onSubmit={handleSubmit}>
          <h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
          {error && <p className="error">{error}</p>}
          <p onClick={handleToggleMode} className="toggle-mode">
            {isSignup ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
          </p>
        </form>
      )}

      {isAdmin && (
        <div className="admin-upload">
          <h2>Upload Video</h2>
          <form onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Video Title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hashtags (comma-separated)"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button type="submit">Upload Video</button>
            <button onClick={handleLogout}>
          Logout
        </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
