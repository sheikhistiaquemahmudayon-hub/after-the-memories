import React, { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef(null);

  const startExperience = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
    setHasEntered(true);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="./audio/music.m4a"
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className={`entry-overlay ${hasEntered ? 'entry-overlay--hidden' : ''}`}
        onClick={startExperience}
        role="button"
        tabIndex={0}
        aria-label="Tap to Open Experience"
      >
        <div className="entry-card" onClick={(e) => e.stopPropagation()}>
          <p className="entry-subtitle">a few things I never knew how to say</p>
          <button
            type="button"
            className="entry-btn"
            onClick={startExperience}
          >
            <span>Tap to Open</span>
            <span aria-hidden="true">✨</span>
          </button>
          <span className="entry-hint">🎧 Best experienced with sound</span>
        </div>
      </div>

      <div className="music-capsule-wrap">
        <button
          type="button"
          className={`music-capsule ${isPlaying ? 'music-capsule--playing' : ''}`}
          onClick={togglePlay}
          aria-label="Toggle background audio"
        >
          <div className="music-bars" aria-hidden="true">
            <span className="music-bar" />
            <span className="music-bar" />
            <span className="music-bar" />
            <span className="music-bar" />
          </div>
          <span className="music-label">{isPlaying ? 'Sound On' : 'Music'}</span>
        </button>
      </div>
    </>
  );
}
