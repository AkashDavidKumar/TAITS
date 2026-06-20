import React, { useState, useContext, useEffect } from 'react';
import IntroScreen from './animations/IntroScreen';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import { EmailProvider, EmailContext } from './context/EmailContext';
import ScheduleMeetingModal from './components/ScheduleMeetingModal';
import ContactUsModal from './components/ContactUsModal';
import SchedulePicker from './components/SchedulePicker';
import './styles/global.css';

/**
 * Helper component to render modals inside context.
 */
function ModalContainer() {
  const { isScheduleOpen, closeSchedule, isContactOpen, closeContact } = useContext(EmailContext);
  return (
    <>
      <ScheduleMeetingModal isOpen={isScheduleOpen} onClose={closeSchedule} />
      <ContactUsModal isOpen={isContactOpen} onClose={closeContact} />
    </>
  );
}

/**
 * Root App Component.
 * Integrates the loading reveal state and mounts the layout once complete.
 */
function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isScheduleView, setIsScheduleView] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsScheduleView(params.get('action') === 'schedule');
  }, []);

  if (isScheduleView) {
    return (
      <EmailProvider>
        <SchedulePicker />
      </EmailProvider>
    );
  }

  return (
    <EmailProvider>
      {!isIntroComplete ? (
        <IntroScreen onComplete={() => setIsIntroComplete(true)} />
      ) : (
        <>
          <Layout>
            <Home />
          </Layout>
          <ModalContainer />
        </>
      )}
    </EmailProvider>
  );
}

export default App;
