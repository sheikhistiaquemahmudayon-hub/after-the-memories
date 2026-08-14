import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterHeader({ number, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tag = el.querySelector('.chapter__tag-wrap');
      const heading = el.querySelector('.chapter__title');
      const lineL = el.querySelector('.chapter__line--left');
      const lineR = el.querySelector('.chapter__line--right');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo([lineL, lineR], { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' })
        .fromTo(tag, { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div className="chapter" ref={ref}>
      <div className="chapter__tag-wrap">
        <span className="chapter__tag">✦ CHAPTER {number} ✦</span>
      </div>
      <div className="chapter__title-row">
        <span className="chapter__line chapter__line--left" />
        <h2 className="chapter__title">{title}</h2>
        <span className="chapter__line chapter__line--right" />
      </div>
    </div>
  );
}
