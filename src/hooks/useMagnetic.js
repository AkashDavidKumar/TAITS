import { useEffect, useRef } from 'react';

/**
 * Custom React Hook to apply a premium magnetic pull effect to any DOM element.
 * @param {number} range - Maximum pixel offset range of the magnetic pull.
 */
export default function useMagnetic(range = 15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate translation percentages
      const moveX = (x / rect.width) * range;
      const moveY = (y / rect.height) * range;

      // Apply hardware accelerated translate3d
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0px, 0px, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    };

    const handleMouseEnter = () => {
      el.style.transition = 'none'; // Clear transitions for smooth manual tracking
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [range]);

  return ref;
}
