import React, { useState, useContext } from 'react';
import { EmailContext } from '../context/EmailContext';

/**
 * Contact Us Form Modal.
 * Prompts user for name, email, subject, and message.
 * Automatically dispatches the request to the nodemailer API or simulator.
 */
export default function ContactUsModal({ isOpen, onClose }) {
  const { dispatchEmail } = useContext(EmailContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await dispatchEmail('contact', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--luxury-gold)', marginBottom: '1rem' }}>🎉 Message Sent!</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Check the Email Simulator at the bottom-right of the screen to view the auto-response and founder notifications.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
              Contact <span className="gradient-text">Us</span>
            </h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                required
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="4"
                required
                placeholder="Type your message details here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
