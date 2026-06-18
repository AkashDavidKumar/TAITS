import React, { useEffect, useRef } from 'react';

/**
 * Animated background rendering system combining a 2D interactive canvas
 * connection net and a rotating radial gradient mesh.
 * Optimizes performance via the Page Visibility API and debounced resize.
 */
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId = null;
    let resizeTimeout = null;
    let isTabActive = true;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const area = canvas.width * canvas.height;
      const maxParticles = window.innerWidth < 768 ? 25 : 65;
      const numberOfParticles = Math.min(Math.floor(area / 20000), maxParticles);

      const isLight = document.body.classList.contains('light-theme');
      const color = isLight ? 'rgba(21, 87, 255, 0.2)' : 'rgba(110, 46, 255, 0.25)';

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.3 - 0.15;
        const directionY = Math.random() * 0.3 - 0.15;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const animateParticles = () => {
      if (!isTabActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.body.classList.contains('light-theme');
      const len = particlesArray.length;

      for (let i = 0; i < len; i++) {
        particlesArray[i].update();

        // Check distance to link particles
        for (let j = i + 1; j < len; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle = isLight
              ? `rgba(6, 26, 91, ${0.12 - distance / 900})`
              : `rgba(45, 123, 255, ${0.08 - distance / 1300})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Watch for light/dark theme toggle body class changes
    const bodyObserver = new MutationObserver(() => {
      initParticles();
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
        initParticles();
      }, 150);
    };

    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible';
      if (isTabActive) {
        if (!animationFrameId) {
          animateParticles();
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      bodyObserver.disconnect();
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef} />
      <div className="bg-mesh" />
    </>
  );
}
