import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Chirkut() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const paragraphs = section.querySelectorAll('.chirkut__p');

      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="chirkut" id="chirkut" ref={sectionRef}>
      <div className="chirkut__inner">
        <div className="chirkut__header">
          <span className="chirkut__subtitle">একটি শেষ চিরকুট</span>
        </div>

        <div className="chirkut__content">
          {siteData.chirkut.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="chirkut__p">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
