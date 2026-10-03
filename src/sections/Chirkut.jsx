import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const POEM_LINE_1 = 'অক্টোবরের নিয়তি যদি শিউলি হয়ে ঝরে পড়া হয়,';
const POEM_LINE_2 = 'তবে আমার পুরো অস্তিত্বের একমাত্র অনুবাদ তুই।';

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

      const poem = section.querySelector('.chirkut__poem');
      if (poem) {
        gsap.fromTo(
          poem,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: poem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="chirkut" id="chirkut" ref={sectionRef}>
      <div className="chirkut__inner">
        {siteData.chirkut.title && (
          <div className="chirkut__header">
            <span className="chirkut__subtitle">{siteData.chirkut.title}</span>
          </div>
        )}

        <div className="chirkut__content">
          {siteData.chirkut.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="chirkut__p">
              {paragraph}
            </p>
          ))}

          <div className="chirkut__poem">
            <div className="chirkut__poem-divider" aria-hidden="true">✦</div>
            <p className="chirkut__poem-line">
              {POEM_LINE_1}
            </p>
            <p className="chirkut__poem-line chirkut__poem-line--highlight">
              {POEM_LINE_2}
            </p>
            <div className="chirkut__poem-divider" aria-hidden="true">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
}
