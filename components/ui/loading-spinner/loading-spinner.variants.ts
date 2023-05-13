import { Variants } from 'framer-motion';

export const LoadingSpinnerVariants: Variants = {
  initial: {
    rotate: 0,
    position: 'fixed',
    right: '50%',
    top: '50%',
    width: '32px',
    height: '32px',
    x: '50%',
  },
  animation: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1, ease: 'linear' },
  },
};
