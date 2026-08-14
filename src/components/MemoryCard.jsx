import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MemoryCard({ memory, layout = 'center' }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imageRef.current;
    if (!card || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 55, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => card.classList.add('memory-card--revealed'),
          },
        }
      );

      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.07 },
        {
          yPercent: 6,
          scale: 1.07,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      if (memory.overlay && overlayRef.current) {
        const lines = overlayRef.current.querySelectorAll('.overlay__line');
        gsap.fromTo(
          lines,
          { y: 22, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: overlayRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [memory.overlay]);

  const layoutClass = `memory-card memory-card--${layout}`;

  return (
    <div className={layoutClass} ref={cardRef}>
      <div className="memory-card__frame">
        <div className="memory-card__shimmer" aria-hidden="true" />
        <div className="memory-card__img-wrap">
          <img
            src={memory.image}
            alt={memory.caption || 'Memory'}
            loading="lazy"
            decoding="async"
            ref={imageRef}
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        {memory.overlay && (
          <div className="memory-card__overlay" ref={overlayRef}>
            <div className="overlay__poem">
              {memory.overlay.lines.map((line, i) => {
                const isLast = i === memory.overlay.lines.length - 1;
                return (
                  <span
                    key={i}
                    className={`overlay__line ${isLast ? 'overlay__line--accent' : ''}`}
                  >
                    {line}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {memory.caption && <p className="memory-card__caption">{memory.caption}</p>}
    </div>
  );
}
