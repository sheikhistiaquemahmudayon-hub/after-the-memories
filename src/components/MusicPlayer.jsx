import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleFirstInteraction = () => {
      audio.play().catch(() => {});
    };

    audio.play().catch(() => {
      window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
      window.addEventListener('keydown', handleFirstInteraction, { once: true });
    });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="music-capsule-wrap">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="./audio/music.m4a" type="audio/mp4" />
        <source src="./audio/song.mp3" type="audio/mpeg" />
      </audio>
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
