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
    let pendingPlay = null;

    const events = ['touchstart', 'touchmove', 'pointerdown', 'click', 'keydown', 'scroll', 'wheel'];

    const removeListeners = () => {
      events.forEach((evt) => {
        const isPassive = evt === 'scroll' || evt === 'wheel' || evt === 'touchmove';
        window.removeEventListener(evt, handleFirstInteraction, { capture: true, passive: isPassive });
      });
    };

    const handleFirstInteraction = () => {
      if (unlocked || isManualPausedRef.current || !audio.paused) return;
      if (pendingPlay) return;

      pendingPlay = audio.play();
      if (pendingPlay !== undefined) {
        pendingPlay
          .then(() => {
            unlocked = true;
            pendingPlay = null;
            removeListeners();
          })
          .catch(() => {
            pendingPlay = null;
          });
      }
    };

    // Attach listeners immediately so we don't miss the first touch if the user interacts instantly
    events.forEach((evt) => {
      const isPassive = evt === 'scroll' || evt === 'wheel' || evt === 'touchmove';
      window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: isPassive });
    });

    const initPlay = audio.play();
    if (initPlay !== undefined) {
      initPlay
        .then(() => {
          unlocked = true;
          removeListeners();
        })
        .catch(() => {
          // Listeners are already attached, they will handle the unlock
        });
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
