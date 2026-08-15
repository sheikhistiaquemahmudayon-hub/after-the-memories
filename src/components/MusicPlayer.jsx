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

    audio.play().catch(() => {});

    const events = [
      'touchstart',
      'touchend',
      'pointerdown',
      'pointerup',
      'mousedown',
      'click',
      'keydown',
      'scroll',
      'wheel',
    ];

    const cleanListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAndPlay, true);
        document.removeEventListener(evt, unlockAndPlay, true);
        if (document.body) {
          document.body.removeEventListener(evt, unlockAndPlay, true);
        }
      });
    };

    const unlockAndPlay = () => {
      if (isManualPausedRef.current || !audio) return;

      if (!audio.paused) {
        cleanListeners();
        return;
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            cleanListeners();
          })
          .catch(() => {});
      }
    };

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAndPlay, { capture: true });
      document.addEventListener(evt, unlockAndPlay, { capture: true });
      if (document.body) {
        document.body.addEventListener(evt, unlockAndPlay, { capture: true });
      }
    });

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
