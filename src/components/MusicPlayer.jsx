import React, { useState, useRef, useEffect } from 'react';

const PASSCODE = '4/10/2002';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.removeItem('site_unlocked');
    } catch (_) {}
  }, []);

  useEffect(() => {
    document.body.style.overflow = hasEntered ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasEntered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = password.trim().replace(/[-.]/g, '/');
    if (value === PASSCODE || value === '04/10/2002') {
      setError(false);
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
      setHasEntered(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
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
        aria-hidden={hasEntered}
      >
        <div className="entry-ambient-glow" aria-hidden="true" />
        <div className={`entry-card ${shake ? 'entry-card--shake' : ''}`}>
          <span className="entry-icon" aria-hidden="true">✦</span>
          <p className="entry-subtitle">Enter Secret Passcode</p>
          <form className="entry-form" onSubmit={handleSubmit}>
            <input
              type="password"
              className={`entry-input ${error ? 'entry-input--error' : ''}`}
              placeholder="Enter passcode..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              autoComplete="off"
              autoFocus
            />
            {error && <span className="entry-error-msg">Incorrect passcode, try again</span>}
            <button type="submit" className="entry-btn">
              Unlock
            </button>
          </form>
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
