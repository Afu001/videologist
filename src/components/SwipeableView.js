import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './SwipeableView.css';

const SwipeableView = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [likedVideos, setLikedVideos] = useState({});

  const handleLogout = () => {
    window.location.reload(); // Simulates logout by reloading the app
  };

  const handleSwipe = (deltaY) => {
    if (deltaY > 0 && currentIndex < filteredVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlay = () => {
    const videoElement = document.getElementById(`video-${currentIndex}`);
    if (playing) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setPlaying(!playing);
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe(1),
    onSwipedDown: () => handleSwipe(-1),
    trackMouse: true,
  });

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = videos.filter((video) =>
      video.title.toLowerCase().includes(query) ||
      video.hashtags.some((hashtag) => hashtag.toLowerCase().includes(query))
    );
    setFilteredVideos(results);
    setCurrentIndex(0); // Reset to the first result
  };

  const handleLike = (index) => {
    setLikedVideos((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  return (
    <div className="swipeable-view" {...swipeHandlers}>
      <header className="header">
        <input
          type="text"
          placeholder="Search by title or hashtag..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {filteredVideos.length > 0 ? (
        filteredVideos.map((video, index) => (
          <div
            key={index}
            className={`video-card ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <video
              id={`video-${index}`}
              src={`http://localhost:5000${video.url}`}
              className="video-player"
              loop
              autoPlay
              muted
            />
            <div className="video-overlay">
              <button onClick={togglePlay} className="play-pause-btn">
                {playing ? 'Pause' : 'Play'}
              </button>
              <h2 className="video-title">{video.title}</h2>
              <div className="hashtags">
                {video.hashtags.map((hashtag, i) => (
                  <span key={i} className="hashtag">#{hashtag}</span>
                ))}
              </div>
              <button
                onClick={() => handleLike(index)}
                className={`like-btn ${likedVideos[index] ? 'liked' : ''}`}
              >
                ❤️
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No videos found.</div>
      )}
    </div>
  );
};

export default SwipeableView;
