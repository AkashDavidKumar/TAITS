import React, { useRef } from 'react';

/**
 * Service card component with self-contained 3D perspective tilt hover interactions.
 */
export default function ServiceCard({ icon, title, desc, linkText, linkHref = '#' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Capped at 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Animate smoothly back to normal
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className="glass-card service-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service-icon-wrapper">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>
      <a href={linkHref} className="service-link">
        {linkText}
      </a>
    </div>
  );
}
