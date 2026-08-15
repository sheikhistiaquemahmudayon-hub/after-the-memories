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

    const events = ['pointerdown', 'touchend', 'click', 'keydown'];
    let unlocked = false;

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    const handleFirstInteraction = () => {
      if (unlocked || isManualPausedRef.current || !audio.paused) return;

      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          unlocked = true;
          removeListeners();
        }).catch(() => {
          // Silent catch: allows subsequent events (like touchend) to retry if pointerdown was rejected
        });
      }
    };

    // Attach listeners immediately in the capture phase
    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true });
    });

    // Try autoplay on mount
    const initPlay = audio.play();
    if (initPlay !== undefined) {
      initPlay
        .then(() => {
          unlocked = true;
          removeListeners();
        })
        .catch(() => {});
    }

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
