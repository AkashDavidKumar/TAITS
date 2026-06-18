import React from 'react';
import useMagnetic from '../hooks/useMagnetic';

/**
 * Reusable wrapper component to apply magnetic pull on anchor links.
 */
export function MagneticAnchor({ children, className = '', range = 10, ...props }) {
  const ref = useMagnetic(range);
  return (
    <a ref={ref} className={`${className} btn-magnetic`} {...props}>
      {children}
    </a>
  );
}

/**
 * Reusable wrapper component to apply magnetic pull on buttons.
 */
export function MagneticButton({ children, className = '', range = 10, ...props }) {
  const ref = useMagnetic(range);
  return (
    <button ref={ref} className={`${className} btn-magnetic`} {...props}>
      {children}
    </button>
  );
}
