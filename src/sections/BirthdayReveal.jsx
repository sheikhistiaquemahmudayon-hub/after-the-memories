import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function BirthdayReveal() {
  const sectionRef = useRef(null);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const glow = section.querySelector('.birthday__glow');
      const ring1 = section.querySelector('.birthday__ring--1');
      const ring2 = section.querySelector('.birthday__ring--2');
      const lineL = section.querySelector('.birthday__line--left');
      const lineR = section.querySelector('.birthday__line--right');
      const dot = section.querySelector('.birthday__dot');
      const date = section.querySelector('.birthday__date-wrap');
      const msg = section.querySelector('.birthday__message');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(glow, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' })
        .fromTo([ring1, ring2], { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2, stagger: 0.2, ease: 'power2.out' }, '-=1.8')
        .fromTo([lineL, lineR], { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: 'power4.inOut' }, '-=1.5')
        .fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, '-=1')
        .fromTo(date, { y: 25, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
        .fromTo(msg, { y: 35, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev.slice(-4), { id, x, y }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1200);
  };

  return (
    <section className="birthday" id="birthday-reveal" ref={sectionRef} onClick={handleCardClick}>
      <div className="birthday__glow" />
      <div className="birthday__ring birthday__ring--1" />
      <div className="birthday__ring birthday__ring--2" />
      <div className="birthday__inner">
        <div className="birthday__lines">
          <span className="birthday__line birthday__line--left" />
          <span className="birthday__dot" />
          <span className="birthday__line birthday__line--right" />
        </div>
        <div className="birthday__date-wrap">
          <span className="birthday__sparkle">✦</span>
          <h3 className="birthday__date">{siteData.birthday.date}</h3>
          <span className="birthday__sparkle">✦</span>
        </div>
        <div className="birthday__message-wrap">
          <h2 className="birthday__message">{siteData.birthday.message}</h2>
        </div>
      </div>
      {bursts.map((b) => (
        <div
          key={b.id}
          className="birthday__burst"
          style={{ left: b.x, top: b.y }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="birthday__burst-spark" style={{ '--i': i }} />
          ))}
        </div>
      ))}
    </section>
  );
}
