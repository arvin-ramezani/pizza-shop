import { Variants } from 'framer-motion';

export const triggerAnimateVariants: Variants = {
  animation: { x: [30, -20, 10, -5, 5, 0], transition: { duration: 0.5 } },
};

export const errorTextVariants: Variants = {
  initial: { x: -100, opacity: 0 },
  animation: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};
