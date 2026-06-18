import React, { useEffect, useState, useRef } from 'react';

/**
 * Scroll-linked Process Tracker Timeline.
 * Monitors window scroll coordinates relative to the tracker element and
 * dynamically scales the fill line width from 0% to 100%.
 */
export default function ProcessTracker() {
  const trackRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);

  const steps = [
    { num: '01', title: 'Requirement Analysis', desc: 'Understanding your needs and goals.' },
    { num: '02', title: 'Solution Design', desc: 'Planning the best architectural solution.' },
    { num: '03', title: 'Development', desc: 'Building high quality and scalable software.' },
    { num: '04', title: 'Testing', desc: 'Ensuring quality, performance & security.' },
    { num: '05', title: 'Deployment', desc: 'Delivering the solution successfully.' },
    { num: '06', title: 'Support', desc: 'Continuous support and maintenance.' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate timeline filling offset percentage
      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        const scrolled = windowHeight * 0.8 - rect.top;
        const total = rect.height;
        let percentage = (scrolled / total) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        setLineWidth(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial scroll layout pass
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="process-container reveal" id="process-track" ref={trackRef}>
      <div className="process-line">
        <div
          className="process-line-fill"
          id="process-fill"
          style={{ width: `${lineWidth}%` }}
        />
      </div>

      {steps.map((step, idx) => (
        <div key={idx} className="process-step">
          <div className="step-num">{step.num}</div>
          <h4 className="step-title">{step.title}</h4>
          <p className="step-desc">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
