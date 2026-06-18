import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg';
import useMagnetic from '../hooks/useMagnetic';

/**
 * Responsive navigation bar with scroll state detection,
 * system/local-storage theme toggling, and magnetic link behaviors.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Magnetic interaction bindings
  const logoRef = useMagnetic(10);
  const linkAboutRef = useMagnetic(8);
  const linkServicesRef = useMagnetic(8);
  const linkProcessRef = useMagnetic(8);
  const linkIndustriesRef = useMagnetic(8);
  const linkInitiativesRef = useMagnetic(8);
  const themeToggleRef = useMagnetic(10);
  const ctaButtonRef = useMagnetic(12);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Initialize theme state from local storage or device preferences
    const savedTheme = localStorage.getItem('taits-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);

    setIsLightTheme(initialLight);
    if (initialLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextLight = !isLightTheme;
    setIsLightTheme(nextLight);
    if (nextLight) {
      document.body.classList.add('light-theme');
      localStorage.setItem('taits-theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('taits-theme', 'dark');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo btn-magnetic" ref={logoRef}>
        <img src={logo} alt="TAITS Logo" />
        <span>TAITS</span>
      </a>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#about" ref={linkAboutRef} onClick={closeMobileMenu}>About</a>
        <a href="#services" ref={linkServicesRef} onClick={closeMobileMenu}>Services</a>
        <a href="#process" ref={linkProcessRef} onClick={closeMobileMenu}>Process</a>
        <a href="#industries" ref={linkIndustriesRef} onClick={closeMobileMenu}>Industries</a>
        <a href="#initiatives" ref={linkInitiativesRef} onClick={closeMobileMenu}>Initiatives</a>
      </div>

      <div className="nav-cta hide-mobile" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          ref={themeToggleRef}
          onClick={toggleTheme}
          className="theme-toggle-btn btn-magnetic"
          title="Toggle Theme"
        >
          {isLightTheme ? (
            <svg id="moon-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg id="sun-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
        <a href="#contact" ref={ctaButtonRef} className="btn btn-outline btn-magnetic">Get Started</a>
      </div>

      <div className="mobile-nav-actions" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
          {isLightTheme ? '🌙' : '☀️'}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
