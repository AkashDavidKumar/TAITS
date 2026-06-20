import React, { createContext, useState, useEffect } from 'react';

export const EmailContext = createContext();

/**
 * React Context Provider for the hybrid email simulation system.
 * Dispatches mail payloads to /api/send-email. If SMTP credentials are not
 * found on the host, falls back to local storage and updates the in-app simulator.
 */
export function EmailProvider({ children }) {
  const [emails, setEmails] = useState(() => {
    const saved = localStorage.getItem('taits-simulated-emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openSchedule = () => setIsScheduleOpen(true);
  const closeSchedule = () => setIsScheduleOpen(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  useEffect(() => {
    localStorage.setItem('taits-simulated-emails', JSON.stringify(emails));
  }, [emails]);

  const clearEmails = () => {
    setEmails([]);
  };

  const dispatchEmail = async (type, payload) => {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload }),
      });

      const data = await res.json();

      if (data.success && data.mode === 'live') {
        console.log('Real email dispatched successfully via Nodemailer API!');
        // Keep a copy in the simulator for visual reference
        logSimulatedEmail(type, payload);
        return { success: true, mode: 'live' };
      }
    } catch (err) {
      console.warn('Backend API unavailable. Triggering frontend local simulator.');
    }

    // Simulation Fallback
    logSimulatedEmail(type, payload);
    return { success: true, mode: 'simulated' };
  };

  const logSimulatedEmail = (type, payload) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = Date.now().toString();

    if (type === 'meeting-request') {
      // 1. User Auto-Confirmation
      const userMail = {
        id: `${id}-u`,
        sender: 'no-reply@taitstech.com',
        senderName: 'TAITS Tech Support',
        receiver: payload.email,
        receiverName: payload.name,
        subject: '📥 Meeting Request Received',
        body: `<p>Hello <strong>${payload.name}</strong>,</p>
               <p>We have successfully received your meeting request. Our founders have been notified.</p>
               <p>We will review your details and respond shortly.</p>
               <br/>
               <p>Best regards,<br/><strong>TAITS Tech Team</strong></p>`,
        time: timestamp,
        isForUser: true,
      };

      // 2. Founders detailed notification (actionable slot picker)
      const foundersMail = {
        id: `${id}-f`,
        sender: payload.email,
        senderName: payload.name,
        receiver: 'founders@taitstech.com',
        receiverName: 'TAITS Tech Founders',
        subject: `📅 Meeting Request: ${payload.name}`,
        body: `<h3>New request details:</h3>
               <p><strong>Organization:</strong> ${payload.organization || 'Not Specified'}</p>
               <p><strong>Message:</strong> ${payload.message || 'No message provided.'}</p>
               <p>Select a date and time slot below to confirm this meeting request:</p>`,
        time: timestamp,
        isForUser: false,
        isActionable: true,
        payload: {
          meetingId: id,
          name: payload.name,
          email: payload.email,
        },
      };

      setEmails((prev) => [foundersMail, userMail, ...prev]);
    } else if (type === 'contact') {
      // 1. User Confirmation
      const userMail = {
        id: `${id}-u`,
        sender: 'no-reply@taitstech.com',
        senderName: 'TAITS Tech Support',
        receiver: payload.email,
        receiverName: payload.name,
        subject: '📥 Message Received: TAITS Tech',
        body: `<p>Hello <strong>${payload.name}</strong>,</p>
               <p>Thank you for reaching out to us. We have received your contact inquiry and our team will get back to you shortly.</p>
               <br/>
               <p>Best regards,<br/><strong>TAITS Tech Team</strong></p>`,
        time: timestamp,
        isForUser: true,
      };

      // 2. Founders Inbox
      const foundersMail = {
        id: `${id}-f`,
        sender: payload.email,
        senderName: payload.name,
        receiver: 'founders@taitstech.com',
        receiverName: 'TAITS Tech Founders',
        subject: `✉️ Contact Inquiry: ${payload.subject}`,
        body: `<h3>New inquiry message:</h3>
               <p><strong>Subject:</strong> ${payload.subject}</p>
               <p>${payload.message}</p>`,
        time: timestamp,
        isForUser: false,
      };

      setEmails((prev) => [foundersMail, userMail, ...prev]);
    }
  };

  const confirmSimulatedMeeting = (meetingId, userName, userEmail, dateTime) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = Date.now().toString();

    // 1. Send confirmation back to user
    const confirmMail = {
      id: `${id}-c`,
      sender: 'no-reply@taitstech.com',
      senderName: 'TAITS Tech Support',
      receiver: userEmail,
      receiverName: userName,
      subject: '📅 Meeting Confirmed: TAITS Tech',
      body: `<p>Hello <strong>${userName}</strong>,</p>
             <p>Our founders have scheduled a meeting with you!</p>
             <div style="background-color: rgba(21, 87, 255, 0.08); border-left: 4px solid var(--royal-blue); padding: 12px 16px; margin: 15px 0; border-radius: 4px; color: var(--text-main);">
               <strong>Confirmed Date & Time:</strong> ${dateTime}
             </div>
             <p>We look forward to speaking with you.</p>
             <br/>
             <p>Best regards,<br/><strong>TAITS Tech Team</strong></p>`,
      time: timestamp,
      isForUser: true,
    };

    // Remove the actionable tag from the original founders request
    setEmails((prev) => {
      const updated = prev.map((m) => {
        if (m.payload && m.payload.meetingId === meetingId) {
          return { ...m, isActionable: false };
        }
        return m;
      });
      return [confirmMail, ...updated];
    });

    // Attempt to invoke real nodemailer back-channel confirmation
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'founder-approve',
        payload: { name: userName, email: userEmail, dateTime },
      }),
    }).catch(() => {});
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        dispatchEmail,
        confirmSimulatedMeeting,
        clearEmails,
        isScheduleOpen,
        isContactOpen,
        openSchedule,
        closeSchedule,
        openContact,
        closeContact,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}
