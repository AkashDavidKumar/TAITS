import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Cursor from '../components/Cursor';

/**
 * Site Layout Wrapper.
 * Bundles the background grid/particle canvas, cursor nodes, and navbar header.
 * Automatically runs a global IntersectionObserver to activate CSS .reveal classes on scroll.
 */
export default function Layout({ children }) {
  useEffect(() => {
    const revealCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.15,
      rootMargin: '0px 0px -20% 0px',
    });

    // Find and observe all reveal elements
    const revealSelector = '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate';
    const unactiveSelector = '.reveal:not(.active), .reveal-up:not(.active), .reveal-down:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active), .reveal-rotate:not(.active)';

    const elements = document.querySelectorAll(revealSelector);
    elements.forEach((el) => revealObserver.observe(el));

    // Listen for dynamic changes in the DOM in case new sections mount later
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll(unactiveSelector);
      currentElements.forEach((el) => revealObserver.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Background />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
