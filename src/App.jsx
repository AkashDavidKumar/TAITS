import React, { useState } from 'react';
import IntroScreen from './animations/IntroScreen';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import './styles/global.css';

/**
 * Root App Component.
 * Integrates the loading reveal state and mounts the layout once complete.
 */
function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <>
      {!isIntroComplete ? (
        <IntroScreen onComplete={() => setIsIntroComplete(true)} />
      ) : (
        <Layout>
          <Home />
        </Layout>
      )}
    </>
  );
}

export default App;
