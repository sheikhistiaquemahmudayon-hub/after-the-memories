import React from 'react';

export default function WatermarkFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="watermark-card">
          <div className="watermark-card__header">
            <img
              src="./images/avraan-logo.png"
              alt="Avraan Logo"
              className="watermark-card__logo"
              loading="lazy"
            />
            <div className="watermark-card__brand-info">
              <span className="watermark-card__powered">powered by Avraan</span>
              <span className="watermark-card__wish">Happy Birthday</span>
            </div>
          </div>

          <div className="watermark-card__divider" />

          <div className="watermark-card__founder">
            <span className="watermark-card__name">SK. Istiaque Mahmud Ayon</span>
            <span className="watermark-card__title">Founder and CEO, Avraan</span>
          </div>

          <a
            href="https://intrudeye.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="watermark-card__btn"
          >
            <span>Know about Avraan</span>
            <span className="watermark-card__btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
