import React, { useRef, useEffect } from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);

  // Autoplay video when the component is active
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [video]);

  return (
    <div className="video-card-container">
      <div className="video-card">
        <video
          ref={videoRef}
          src={video.url}
          loop
          muted
          className="video-player"
        />
      </div>
      <div className="spa-content">
        <h2 className="spa-title">Refresh Your Feed</h2>
        <p className="spa-description">
          Swipe through and immerse yourself in moments of inspiration.
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
