import React, { useEffect, useRef } from 'react';

function createShiuliSprite() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  const size = 96;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const r = 36;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;

  const petalCount = 6;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(r * 0.16, -r * 0.08);
    ctx.bezierCurveTo(r * 0.35, -r * 0.45, r * 0.85, -r * 0.35, r, 0);
    ctx.bezierCurveTo(r * 0.85, r * 0.35, r * 0.35, r * 0.45, r * 0.16, r * 0.08);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(0, 0, r, 0);
    petalGrad.addColorStop(0, '#fff5eb');
    petalGrad.addColorStop(0.3, '#ffffff');
    petalGrad.addColorStop(1, '#f8f9fa');
    ctx.fillStyle = petalGrad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(235, 230, 220, 0.4)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  ctx.shadowColor = 'transparent';

  const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.38);
  hubGrad.addColorStop(0, '#ff3800');
  hubGrad.addColorStop(0.55, '#ff6f00');
  hubGrad.addColorStop(0.9, '#ffa000');
  hubGrad.addColorStop(1, 'rgba(255, 160, 0, 0)');
  ctx.fillStyle = hubGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#b71c1c';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffe082';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.05, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

export default function ShiuliRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprite = createShiuliSprite();
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width <= 768;
    const count = isMobile ? 22 : 36;
    const baseSize = isMobile ? 22 : 28;

    const flowers = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * (height + 200) - 200,
      speedY: Math.random() * 1.4 + 1.1,
      speedX: (Math.random() - 0.5) * 0.5,
      swaySpeed: Math.random() * 0.025 + 0.015,
      swayAmount: Math.random() * 1.8 + 0.8,
      swayPhase: Math.random() * Math.PI * 2,
      size: baseSize * (0.85 + Math.random() * 0.4),
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.2 + 0.8,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (sprite) {
        for (let i = 0; i < flowers.length; i++) {
          const p = flowers[i];
          p.y += p.speedY;
          p.swayPhase += p.swaySpeed;
          p.x += Math.sin(p.swayPhase) * p.swayAmount + p.speedX;
          p.angle += p.rotSpeed;

          if (p.y > height + 40) {
            p.y = -40;
            p.x = Math.random() * width;
          }
          if (p.x < -40) p.x = width + 20;
          if (p.x > width + 40) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;
          ctx.drawImage(sprite, -p.size * 0.5, -p.size * 0.5, p.size, p.size);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="shiuli-rain-canvas" aria-hidden="true" />;
}
