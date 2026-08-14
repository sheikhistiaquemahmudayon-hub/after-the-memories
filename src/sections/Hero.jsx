import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const curtainRef = useRef(null);
  const glowRef = useRef(null);
  const lettersRef = useRef([]);
  const subtitleRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const scrollRef = useRef(null);

  const nameLetters = siteData.hero.name.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(curtainRef.current, { opacity: 0, duration: 1.6, ease: 'power2.inOut' })
        .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, '-=1.2')
        .fromTo(lineTopRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power4.inOut' }, '-=1.4')
        .fromTo(
          lettersRef.current,
          { y: 50, opacity: 0, filter: 'blur(12px)', scale: 0.9 },
          { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.6, stagger: 0.15, ease: 'power3.out' },
          '-=1'
        )
        .fromTo(subtitleRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .fromTo(lineBottomRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }, '-=0.7')
        .fromTo(scrollRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4');

      gsap.to(scrollRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero__ambient-glow" ref={glowRef} />
      <div className="hero__curtain" ref={curtainRef} />
      <div className="hero__inner">
        <div className="hero__line" ref={lineTopRef} />
        <h1 className="hero__name">
          {nameLetters.map((char, i) => (
            <span
              key={i}
              className="hero__char"
              ref={(el) => (lettersRef.current[i] = el)}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="hero__subtitle" ref={subtitleRef}>
          {siteData.hero.subtitle}
        </p>
        <div className="hero__line hero__line--short" ref={lineBottomRef} />
      </div>
      <div className="hero__scroll" ref={scrollRef}>
        <span className="hero__scroll-text">scroll</span>
        <div className="hero__scroll-line-wrap">
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
