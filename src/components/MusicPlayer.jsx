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

    let isAttempting = false;
    const events = ['touchstart', 'pointerdown', 'click', 'keydown', 'scroll', 'wheel'];

    const cleanListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction, true);
      });
    };

    const handleInteraction = () => {
      if (isManualPausedRef.current || !audio) return;
      if (!audio.paused) {
        cleanListeners();
        return;
      }
      if (isAttempting) return;

      isAttempting = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAttempting = false;
            cleanListeners();
          })
          .catch(() => {
            isAttempting = false;
          });
      } else {
        isAttempting = false;
      }
    };

    // 1. Try to play immediately (works on desktop if allowed)
    const initPromise = audio.play();
    if (initPromise !== undefined) {
      initPromise
        .then(() => {
          // Success on mount! No need for interaction listeners.
        })
        .catch(() => {
          // 2. If it fails (mobile autoplay blocked), attach listeners
          events.forEach((evt) => {
            window.addEventListener(evt, handleInteraction, true);
          });
        });
    } else {
      events.forEach((evt) => {
        window.addEventListener(evt, handleInteraction, true);
      });
    }

    return () => {
      cleanListeners();
    };
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
