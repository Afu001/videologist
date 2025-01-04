import React, { useEffect, useState } from 'react';
import SwipeableView from '../components/SwipeableView';
import axios from 'axios';
import './Feed.css';

const Feed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      console.log('[Frontend] Fetching video metadata from backend...');
      try {
        const response = await axios.get('https://videologist-backend-main.azurewebsites.net/videos/list');
        console.log('[Frontend] Video metadata received:', response.data);
        setVideos(response.data);
      } catch (error) {
        console.error('[Frontend] Error fetching video metadata:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="feed">
      {videos.length === 0 ? (
        <p className="loading">Loading videos...</p>
      ) : (
        <SwipeableView videos={videos} />
      )}
    </div>
  );
};

export default Feed;
