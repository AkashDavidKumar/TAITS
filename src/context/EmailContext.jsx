import React, { createContext, useState } from 'react';

export const EmailContext = createContext();

/**
 * React Context Provider for the email system.
 * Dispatches mail payloads directly to /api/send-email without simulator logic.
 */
export function EmailProvider({ children }) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openSchedule = () => setIsScheduleOpen(true);
  const closeSchedule = () => setIsScheduleOpen(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const dispatchEmail = async (type, payload) => {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload }),
      });

      const data = await res.json();
      return { success: data.success };
    } catch (err) {
      console.error('Error dispatching email:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <EmailContext.Provider
      value={{
        dispatchEmail,
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
