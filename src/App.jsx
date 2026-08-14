import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import TheBeginning from './sections/TheBeginning';
import Memories from './sections/Memories';
import Reflection from './sections/Reflection';
import BirthdayReveal from './sections/BirthdayReveal';
import Chirkut from './sections/Chirkut';
import FinalLetter from './sections/FinalLetter';
import AmbientCanvas from './components/AmbientCanvas';
import ScrollProgress from './components/ScrollProgress';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    });
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgress />
      <MusicPlayer />
      <AmbientCanvas />
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <main className="app-container">
        <Hero />
        <TheBeginning />
        <Memories />
        <Reflection />
        <BirthdayReveal />
        <Chirkut />
        <FinalLetter />
      </main>
    </>
  );
}
