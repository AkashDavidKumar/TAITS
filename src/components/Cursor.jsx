import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium custom cursor tracking component.
 * Features linear interpolation (lerp) outline tracking, GPU acceleration,
 * and smart mobile/tablet screen suppression.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch =
        window.innerWidth <= 1024 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsHidden(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isHidden) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const updateOutline = () => {
      const ease = 0.12; // Lower = smoother lag
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(updateOutline);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateOutline);

    const handleMouseEnter = () => {
      if (outlineRef.current) outlineRef.current.classList.add('hovering');
      if (dotRef.current) dotRef.current.style.backgroundColor = 'var(--luxury-gold)';
    };

    const handleMouseLeave = () => {
      if (outlineRef.current) outlineRef.current.classList.remove('hovering');
      if (dotRef.current) dotRef.current.style.backgroundColor = 'var(--electric-blue)';
    };

    // Attach listeners to interactive elements
    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, .btn, .btn-magnetic, .info-node, .service-card, .testimonial-card'
      );
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
        target.addEventListener('mouseenter', handleMouseEnter);
        target.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // MutationObserver to scan for newly rendered elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      const hoverTargets = document.querySelectorAll(
        'a, button, .btn, .btn-magnetic, .info-node, .service-card, .testimonial-card'
      );
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}
