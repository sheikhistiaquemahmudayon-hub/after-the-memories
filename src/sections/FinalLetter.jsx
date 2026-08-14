import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function FinalLetter() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const seal = section.querySelector('.letter__seal');
      const lineTop = section.querySelector('.letter__line--top');
      const paragraphs = section.querySelectorAll('.letter__paragraph');
      const signOff = section.querySelector('.letter__sign-off');
      const flourish = section.querySelector('.letter__flourish');
      const lineBottom = section.querySelector('.letter__line--bottom');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(seal, { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)' })
        .fromTo(lineTop, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }, '-=0.4')
        .fromTo(paragraphs, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.3, ease: 'power3.out' }, '-=0.5')
        .fromTo(signOff, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.3')
        .fromTo(flourish, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
        .fromTo(lineBottom, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="letter" id="final-letter" ref={sectionRef}>
      <div className="letter__inner">
        <div className="letter__glow-bg" />
        <div className="letter__seal" aria-hidden="true">✦</div>
        <div className="letter__line letter__line--top" />
        <div className="letter__body">
          {siteData.finalLetter.paragraphs.map((paragraph, index) => (
            <p key={index} className="letter__paragraph">
              {paragraph}
            </p>
          ))}
          <div className="letter__sign-wrap">
            <p className="letter__sign-off">{siteData.finalLetter.signOff}</p>
            {siteData.finalLetter.name && (
              <p className="letter__signature-name">{siteData.finalLetter.name}</p>
            )}
            <div className="letter__flourish" />
          </div>
        </div>
        <div className="letter__line letter__line--bottom" />
      </div>
    </section>
  );
}
