import React, { useEffect, useState, useRef } from 'react';

/**
 * Animated statistics numbers counter.
 * Triggers counting animation when scrolled into view using IntersectionObserver.
 */
export default function StatsTracker() {
  const containerRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    students: 0,
    workshops: 0,
    institutions: 0,
  });

  const stats = [
    { key: 'projects', target: 150, label: 'Projects Delivered' },
    { key: 'students', target: 5000, label: 'Students Trained' },
    { key: 'workshops', target: 120, label: 'Workshops' },
    { key: 'institutions', target: 50, label: 'Institutions Served' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const speed = 100; // Steps to reach target value
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts((prev) => {
        const next = {};
        stats.forEach((stat) => {
          const target = stat.target;
          const increment = target / speed;
          const computedVal = Math.ceil(increment * currentStep);
          next[stat.key] = computedVal >= target ? target : computedVal;
        });
        return next;
      });

      if (currentStep >= speed) {
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <div className="stats-wrap reveal" ref={containerRef}>
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-item">
          <div className="stat-num">
            {counts[stat.key]}
            {counts[stat.key] >= stat.target ? '+' : ''}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
