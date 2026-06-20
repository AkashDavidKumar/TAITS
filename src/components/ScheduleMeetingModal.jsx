import React, { useState, useContext } from 'react';
import { EmailContext } from '../context/EmailContext';

/**
 * Schedule Meeting Form Modal.
 * Prompts user for name, email, company, and agenda.
 * Automatically dispatches the request to the nodemailer API or simulator.
 */
export default function ScheduleMeetingModal({ isOpen, onClose }) {
  const { dispatchEmail } = useContext(EmailContext);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const meetingId = Date.now().toString();
    await dispatchEmail('meeting-request', {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      message: formData.message,
      meetingId,
    });

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', organization: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--luxury-gold)', marginBottom: '1rem' }}>🎉 Request Dispatched!</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Check the Email Simulator at the bottom-right of the screen to review and confirm your meeting details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
              Schedule <span className="gradient-text">a Meeting</span>
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
              <label>Organization / School</label>
              <input
                type="text"
                placeholder="Institution name"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Meeting Subject / Scope</label>
              <textarea
                rows="3"
                required
                placeholder="Provide a brief description of what you'd like to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {isSubmitting ? 'Sending Request...' : 'Send Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
