/**
 * Framer Motion Animation Variants & Helpers
 * Replicates the CSS bezier curves and reveal triggers from the original styles.
 */

export const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.5, 0, 0, 1], // Cubic-bezier from original stylesheet
      delay: delay,
    },
  }),
};

export const revealLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.5, 0, 0, 1],
      delay: delay,
    },
  }),
};

export const revealRightVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.5, 0, 0, 1],
      delay: delay,
    },
  }),
};

export const revealScaleVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.5, 0, 0, 1],
      delay: delay,
    },
  }),
};

export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
