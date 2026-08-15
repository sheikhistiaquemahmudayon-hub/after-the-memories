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

    const events = [
      'touchstart',
      'touchend',
      'pointerdown',
      'pointerup',
      'click',
      'scroll',
      'wheel',
      'keydown',
    ];

    const removeListeners = () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction, true);
        document.removeEventListener(event, handleInteraction, true);
      });
    };

    const handleInteraction = () => {
      if (isManualPausedRef.current || !audio || isAttempting || !audio.paused) {
        return;
      }

      isAttempting = true;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAttempting = false;
            removeListeners();
          })
          .catch(() => {
            isAttempting = false;
          });
      } else {
        isAttempting = false;
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true });
      document.addEventListener(event, handleInteraction, { capture: true, passive: true });
    });

    handleInteraction();

    return () => {
      removeListeners();
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
