import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg';
import useMagnetic from '../hooks/useMagnetic';

/**
 * Circular Infographic node positioning system.
 * Renders dynamically positioned node bubbles in a circular orbit on desktop (angle calculation),
 * and stacks them as vertical cards on mobile viewports.
 */
export default function Infographic() {
  const [isDesktop, setIsDesktop] = useState(false);
  const centerLogoRef = useMagnetic(12);

  const nodes = [
    { emoji: '💰', title: 'Affordable', desc: 'High quality at reasonable prices' },
    { emoji: '⚙️', title: 'Modern Tech', desc: 'Using latest frameworks' },
    { emoji: '📈', title: 'Scalable', desc: 'Built to grow with you' },
    { emoji: '🎓', title: 'Student Friendly', desc: 'Easy to use and learn' },
    { emoji: '🔄', title: 'Innovation', desc: 'Constantly improving' },
    { emoji: '🛡️', title: 'Support', desc: 'Dedicated assistance' },
    { emoji: '🎯', title: 'Focus', desc: 'Customer success driven' },
    { emoji: '✨', title: 'Quality', desc: 'Best coding practices' },
  ];

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div className="infographic-container">
      <div className="info-center btn-magnetic" ref={centerLogoRef}>
        <img src={logo} alt="TAITS Logo" />
      </div>

      {nodes.map((node, index) => {
        let nodeStyle = {};

        if (isDesktop) {
          const radius = 220; // Radius of orbit
          const center = 300; // SVG space center reference
          const angleStep = (Math.PI * 2) / nodes.length;
          const angle = index * angleStep - Math.PI / 2; // Offset starting point (top)
          const x = center + radius * Math.cos(angle) - 30; // Subtract half-bubble width (30px)
          const y = center + radius * Math.sin(angle) - 30;

          nodeStyle = {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
          };
        } else {
          nodeStyle = {
            position: 'relative',
          };
        }

        return (
          <div key={index} className="info-node" style={nodeStyle}>
            <div style={{ fontSize: '1.5rem' }}>{node.emoji}</div>
            <div className="info-tooltip">
              <strong>{node.title}</strong>
              <span>{node.desc}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
