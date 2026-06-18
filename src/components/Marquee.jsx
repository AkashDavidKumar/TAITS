import React from 'react';

/**
 * Infinite horizontal scrolling Marquee for client testimonials.
 * Seamlessly duplicates the cards list to create a continuous loop on the GPU.
 */
export default function Marquee() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: '"TAITS Tech transformed our educational institute with their seamless ERP solution. Highly recommended!"',
      avatarColor: 'var(--electric-blue)',
      name: 'Dr. Sharma',
      role: 'Dean, Engineering College',
    },
    {
      stars: '★★★★★',
      text: '"Their custom software development team is top-notch. They delivered exactly what our business needed, on time."',
      avatarColor: 'var(--luxury-gold)',
      name: 'A. Patel',
      role: 'CEO, Retail Chain',
    },
    {
      stars: '★★★★★',
      text: '"The AI workshop conducted by TAITS was phenomenal. Our students gained immense practical knowledge."',
      avatarColor: 'var(--vibrant-violet)',
      name: 'Prof. Kumar',
      role: 'HOD Computer Science',
    },
    {
      stars: '★★★★★',
      text: '"Excellent support and highly scalable cloud solutions. They truly understand enterprise needs."',
      avatarColor: 'var(--electric-blue)',
      name: 'M. Singh',
      role: 'Tech Lead, Startup Inc',
    },
  ];

  // Combine lists to map twice for seamless wrapping
  const doubleList = [...testimonials, ...testimonials];

  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        {doubleList.map((item, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="stars">{item.stars}</div>
            <p>{item.text}</p>
            <div className="client-info" style={{ marginTop: '1rem' }}>
              <div
                className="client-avatar"
                style={{ background: item.avatarColor }}
              />
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>{item.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
