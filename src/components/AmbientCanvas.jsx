import React, { useEffect, useRef } from 'react';

export default function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width <= 768;
    const starCount = isMobile ? 55 : 95;
    const petalCount = isMobile ? 7 : 14;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulse: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.15 + 0.05,
      isMajor: Math.random() < 0.08,
    }));

    const nebulae = [
      { xRatio: 0.3, yRatio: 0.35, radiusRatio: 0.55, color: 'rgba(28, 22, 45, 0.4)', angle: 0, speed: 0.0003 },
      { xRatio: 0.7, yRatio: 0.65, radiusRatio: 0.65, color: 'rgba(15, 25, 40, 0.35)', angle: Math.PI, speed: 0.0002 },
      { xRatio: 0.5, yRatio: 0.85, radiusRatio: 0.5, color: 'rgba(35, 28, 18, 0.3)', angle: Math.PI * 0.5, speed: 0.00025 },
    ];

    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 7,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      speedY: Math.random() * 0.5 + 0.35,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4 + 0.15,
      alpha: Math.random() * 0.07 + 0.03,
    }));

    const sparkles = [];
    const shootingStars = [];
    let nextShootingStar = Date.now() + 2500;

    function createShootingStar() {
      const startX = Math.random() * (width * 0.8) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 5 + 7;
      const length = Math.random() * 80 + 70;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        alpha: 1,
        decay: 0.016,
      });
    }

    function addSparkles(cx, cy, count = 12) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1;
        sparkles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          size: Math.random() * 2.2 + 1,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    }

    const handlePointerDown = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x !== undefined && y !== undefined) {
        addSparkles(x, y, 14);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    function drawMajorStar(x, y, size, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(255, 245, 220, ${alpha})`;
      ctx.shadowColor = 'rgba(235, 205, 150, 0.9)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 245, 220, ${alpha * 0.7})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(-size * 3, 0);
      ctx.lineTo(size * 3, 0);
      ctx.moveTo(0, -size * 3);
      ctx.lineTo(0, size * 3);
      ctx.stroke();
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        n.angle += n.speed;
        const cx = (n.xRatio + Math.cos(n.angle) * 0.06) * width;
        const cy = (n.yRatio + Math.sin(n.angle) * 0.06) * height;
        const radius = Math.min(width, height) * n.radiusRatio;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(0.5, n.color.replace(/[\d\.]+\)$/, '0.12)'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pulse += s.pulseSpeed;
        const currentAlpha = Math.min(1, Math.max(0.1, s.baseAlpha + Math.sin(s.pulse) * 0.35));
        s.y -= s.speedY;

        if (s.y < 0) s.y = height;

        if (s.isMajor) {
          drawMajorStar(s.x, s.y, s.size, currentAlpha);
        } else {
          ctx.fillStyle = `rgba(245, 230, 200, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const now = Date.now();
      if (now > nextShootingStar) {
        createShootingStar();
        nextShootingStar = now + Math.random() * 5000 + 4000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.alpha -= st.decay;

        if (st.alpha <= 0 || st.x > width + 100 || st.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = st.x - (st.vx / 8) * st.length;
        const tailY = st.y - (st.vy / 8) * st.length;

        const grad = ctx.createLinearGradient(tailX, tailY, st.x, st.y);
        grad.addColorStop(0, 'rgba(255, 245, 220, 0)');
        grad.addColorStop(0.8, `rgba(235, 205, 150, ${st.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${st.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(st.x, st.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${st.alpha})`;
        ctx.shadowColor = 'rgba(255, 240, 200, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.4 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(223, 190, 132, ${p.alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 240, 210, ${sp.alpha})`;
        ctx.shadowColor = 'rgba(223, 190, 132, 0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
