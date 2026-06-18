import React from 'react';

/**
 * Floating cards for the Hero section visual.
 * Implements hardware-accelerated infinite floating keyframes.
 */
export default function FloatingCards() {
  return (
    <div className="floating-cards-container">
      <div className="float-card c1">
        <div className="float-icon">🤖</div>
        <div className="float-text">
          <h4>AI Solutions</h4>
          <p>Automated processes & intelligence</p>
        </div>
      </div>
      <div className="float-card c2">
        <div className="float-icon">📊</div>
        <div className="float-text">
          <h4>ERP Dashboard</h4>
          <p>Streamlined management systems</p>
        </div>
      </div>
      <div className="float-card c3">
        <div className="float-icon">📱</div>
        <div className="float-text">
          <h4>Mobile Apps</h4>
          <p>High performance iOS & Android</p>
        </div>
      </div>
    </div>
  );
}
