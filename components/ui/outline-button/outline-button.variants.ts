import { Variants } from 'framer-motion';

export const outlineBtnVariants: Variants = {
  initial: { y: -30, opacity: 0, scale: 0.6 },
  animation: {
    y: 0,
    opacity: 1,
    scale: 1,
    cursor: 'pointer',
    transition: { duration: 0.4 },
  },
  disabled: {
    opacity: 0.8,
    x: 0,
    transition: { duration: 0.4 },
    cursor: 'no-drop',
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.6 },
};
