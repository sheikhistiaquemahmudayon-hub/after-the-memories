import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isManualPausedRef = useRef(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      isManualPausedRef.current = false;
      audio.play().catch(() => {});
    } else {
      isManualPausedRef.current = true;
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unlocked = false;
    const events = ['touchstart', 'touchend', 'pointerdown', 'pointerup', 'click', 'keydown'];

    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, tryPlay, true));
    };

    const tryPlay = () => {
      if (unlocked || isManualPausedRef.current || !audio.paused) {
        if (!audio.paused) { unlocked = true; cleanup(); }
        return;
      }
      audio.play().then(() => { unlocked = true; cleanup(); }).catch(() => {});
    };

    events.forEach((evt) => window.addEventListener(evt, tryPlay, true));

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'running') {
      audio.play().then(() => { unlocked = true; cleanup(); }).catch(() => {});
    }
    ctx.close().catch(() => {});

    return cleanup;
  }, []);

  return (
    <div className="music-capsule-wrap">
      <audio
        ref={audioRef}
        src="./audio/music.m4a"
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
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
  );
}
