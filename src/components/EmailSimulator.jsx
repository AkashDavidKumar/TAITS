import React, { useState, useContext } from 'react';
import { EmailContext } from '../context/EmailContext';

/**
 * Floating Interactive Email Simulator Dashboard.
 * Renders in the bottom-right corner.
 * Allows developers and users to view simulated SMTP outputs
 * and schedule confirmations with an interactive Date/Time picker.
 */
export default function EmailSimulator() {
  const { emails, confirmSimulatedMeeting, clearEmails } = useContext(EmailContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('founders'); // 'founders' | 'users'
  const [selectedSlots, setSelectedSlots] = useState({}); // { [meetingId]: 'YYYY-MM-DDTHH:MM' }

  // Filter emails
  const userEmails = emails.filter((m) => m.isForUser);
  const foundersEmails = emails.filter((m) => !m.isForUser);

  const handleSlotConfirm = (meetingId, userName, userEmail) => {
    const slot = selectedSlots[meetingId];
    if (!slot) {
      alert('Please pick a date and time slot first.');
      return;
    }
    // Format slot text for presentation
    const dateObj = new Date(slot);
    const formatted = dateObj.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    confirmSimulatedMeeting(meetingId, userName, userEmail, formatted);
  };

  const handleSlotChange = (meetingId, val) => {
    setSelectedSlots((prev) => ({ ...prev, [meetingId]: val }));
  };

  const unreadCount = emails.length;

  return (
    <div className="email-simulator-container" style={containerStyle}>
      {/* Floating Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} style={badgeStyle} title="Simulated Email Inbox">
        <span>✉️ Inbox Simulator</span>
        {unreadCount > 0 && <span style={counterStyle}>{unreadCount}</span>}
      </button>

      {/* Simulator Drawer Panel */}
      {isOpen && (
        <div className="simulator-panel glass-card" style={panelStyle}>
          <div style={panelHeaderStyle}>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--luxury-gold)' }}>📬 Mail Simulator</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={clearEmails} style={smallBtnStyle}>Clear</button>
              <button onClick={() => setIsOpen(false)} style={closeBtnStyle}>✕</button>
            </div>
          </div>

          {/* Tabs */}
          <div style={tabsWrapperStyle}>
            <button
              onClick={() => setActiveTab('founders')}
              style={{
                ...tabStyle,
                borderBottom: activeTab === 'founders' ? '2px solid var(--electric-blue)' : 'none',
                opacity: activeTab === 'founders' ? 1 : 0.6,
              }}
            >
              Founders' Inbox ({foundersEmails.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              style={{
                ...tabStyle,
                borderBottom: activeTab === 'users' ? '2px solid var(--electric-blue)' : 'none',
                opacity: activeTab === 'users' ? 1 : 0.6,
              }}
            >
              User's Inbox ({userEmails.length})
            </button>
          </div>

          {/* Email List Content */}
          <div style={emailListStyle}>
            {activeTab === 'founders' ? (
              foundersEmails.length === 0 ? (
                <div style={emptyStyle}>No messages in founders' inbox. Use the forms to test!</div>
              ) : (
                foundersEmails.map((mail) => (
                  <div key={mail.id} style={mailItemStyle}>
                    <div style={mailMetaStyle}>
                      <span><strong>From:</strong> {mail.senderName} ({mail.sender})</span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{mail.time}</span>
                    </div>
                    <div style={mailSubjectStyle}>
                      {mail.subject}
                    </div>
                    <div
                      style={mailBodyStyle}
                      dangerouslySetInnerHTML={{ __html: mail.body }}
                    />
                    {mail.isActionable && (
                      <div style={actionBlockStyle}>
                        <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
                          Select Meeting Slot:
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="datetime-local"
                            value={selectedSlots[mail.payload.meetingId] || ''}
                            onChange={(e) => handleSlotChange(mail.payload.meetingId, e.target.value)}
                            style={dateInputStyle}
                          />
                          <button
                            onClick={() => handleSlotConfirm(mail.payload.meetingId, mail.payload.name, mail.payload.email)}
                            style={actionBtnStyle}
                          >
                            Confirm Slot
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )
            ) : userEmails.length === 0 ? (
              <div style={emptyStyle}>No confirmations or alerts in user's inbox yet.</div>
            ) : (
              userEmails.map((mail) => (
                <div key={mail.id} style={mailItemStyle}>
                  <div style={mailMetaStyle}>
                    <span><strong>To:</strong> {mail.receiverName} ({mail.receiver})</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{mail.time}</span>
                  </div>
                  <div style={mailSubjectStyle}>
                    {mail.subject}
                  </div>
                  <div
                    style={mailBodyStyle}
                    dangerouslySetInnerHTML={{ __html: mail.body }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Styling definitions (Inline styles to avoid polluting global CSS and ensure component isolation)
const containerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 99999,
  fontFamily: 'system-ui, sans-serif',
};

const badgeStyle = {
  background: 'linear-gradient(135deg, var(--premium-purple, #7c3aed), var(--electric-blue, #2563eb))',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  padding: '12px 20px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.2s',
};

const counterStyle = {
  background: '#ef4444',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '0.75rem',
  minWidth: '18px',
  textAlign: 'center',
};

const panelStyle = {
  width: '380px',
  maxHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  bottom: '60px',
  right: '0',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(15, 23, 42, 0.95)',
  color: '#f8fafc',
};

const panelHeaderStyle = {
  padding: '12px 16px',
  background: 'rgba(30, 41, 59, 0.8)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const smallBtnStyle = {
  background: 'rgba(239, 68, 68, 0.2)',
  color: '#fca5a5',
  border: '1px solid rgba(239, 68, 68, 0.4)',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '0.75rem',
  cursor: 'pointer',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  fontSize: '1rem',
  cursor: 'pointer',
};

const tabsWrapperStyle = {
  display: 'flex',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const tabStyle = {
  flex: 1,
  padding: '10px',
  background: 'none',
  border: 'none',
  color: '#f8fafc',
  fontSize: '0.85rem',
  fontWeight: '600',
  cursor: 'pointer',
  textAlign: 'center',
};

const emailListStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxHeight: '380px',
};

const emptyStyle = {
  textAlign: 'center',
  padding: '30px 20px',
  color: '#94a3b8',
  fontSize: '0.85rem',
};

const mailItemStyle = {
  background: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '10px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const mailMetaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.75rem',
  color: '#94a3b8',
};

const mailSubjectStyle = {
  fontWeight: 'bold',
  fontSize: '0.9rem',
  color: '#f8fafc',
};

const mailBodyStyle = {
  fontSize: '0.85rem',
  color: '#cbd5e1',
  lineHeight: '1.4',
  padding: '8px 0',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
};

const actionBlockStyle = {
  marginTop: '8px',
  paddingTop: '8px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const dateInputStyle = {
  flex: 1,
  background: '#0f172a',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
  padding: '6px',
  color: 'white',
  fontSize: '0.8rem',
};

const actionBtnStyle = {
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '0.8rem',
  fontWeight: '600',
  cursor: 'pointer',
};
