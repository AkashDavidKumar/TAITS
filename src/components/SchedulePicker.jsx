import React, { useState, useEffect } from 'react';

/**
 * SchedulePicker Component.
 * Loaded when URL contains `?action=schedule`.
 * Allows the founder to pick a date, time, and custom Google Meet link,
 * then dispatches the confirmation email to both the founder and the client.
 */
export default function SchedulePicker() {
  const [queryParams, setQueryParams] = useState({ id: '', email: '', name: '' });
  const [formData, setFormData] = useState({ date: '', time: '', meetLink: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQueryParams({
      id: params.get('id') || '',
      email: params.get('email') || '',
      name: params.get('name') || '',
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!queryParams.email || !queryParams.id) {
      setErrorMsg('Invalid meeting credentials in URL parameters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'confirm-schedule',
          payload: {
            meetingId: queryParams.id,
            name: queryParams.name,
            email: queryParams.email,
            date: formData.date,
            time: formData.time,
            meetLink: formData.meetLink,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to confirm meeting schedule.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Failed to confirm meeting schedule.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--bg-base)',
      color: 'var(--text-main)',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        padding: '3rem 2.5rem',
        background: '#0d111d',
        border: '1px solid var(--glass-border)',
        borderRadius: '24px',
        boxShadow: 'var(--glass-shadow)',
        boxSizing: 'border-box',
        textAlign: 'center'
      }} className="schedule-card">
        <h3 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700
        }}>
          Schedule <span className="gradient-text">Meeting Slot</span>
        </h3>

        {submitted ? (
          <div style={{ marginTop: '2rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--luxury-gold)', marginBottom: '1rem' }}>Meeting Scheduled!</h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              The appointment has been locked. Confirmation emails containing the meeting schedule and Google Meet link have been sent to <strong>{queryParams.name || queryParams.email}</strong> and the founders' inbox.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              Go to Home Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '1.5rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '1.2rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Scheduling slot for:
              </p>
              <h4 style={{ margin: '5px 0 0 0', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600 }}>
                {queryParams.name || 'Client Request'}
              </h4>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: 'var(--electric-blue)' }}>
                {queryParams.email}
              </p>
            </div>

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                marginBottom: '1.5rem',
                color: '#ef4444',
                fontSize: '0.9rem'
              }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Select Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: '#161b26',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Select Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: '#161b26',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Google Meet Link (Optional)</label>
              <input
                type="url"
                placeholder="https://meet.google.com/..."
                value={formData.meetLink}
                onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  background: '#161b26',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Leave empty to use default Google Meet room set in .env.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', borderRadius: '50px', cursor: 'pointer' }}
            >
              {isSubmitting ? 'Confirming Appointment...' : 'Confirm Meeting Slot'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
