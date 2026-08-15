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
    let lastAttempt = 0;

    const cleanup = () => {
      document.removeEventListener('touchstart', onTouch, true);
      document.removeEventListener('click', onDesktop, true);
      document.removeEventListener('keydown', onDesktop, true);
    };

    const play = () => {
      if (unlocked || isManualPausedRef.current) return;
      if (!audio.paused) { unlocked = true; cleanup(); return; }
      const now = Date.now();
      if (now - lastAttempt < 300) return;
      lastAttempt = now;
      audio.play().then(() => { unlocked = true; cleanup(); }).catch(() => { lastAttempt = 0; });
    };

    const onTouch = () => play();
    const onDesktop = () => play();

    document.addEventListener('touchstart', onTouch, { capture: true, passive: true });
    document.addEventListener('click', onDesktop, { capture: true });
    document.addEventListener('keydown', onDesktop, { capture: true });

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
