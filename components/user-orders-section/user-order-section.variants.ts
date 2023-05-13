import { Variants } from 'framer-motion';

export const loadingImageVariants: Variants = {
  initial: {
    rotate: 0,
    x: '50%',
  },
  animation: {
    rotate: -360,
    x: '50%',
    transition: { repeat: Infinity, duration: 0.6, ease: 'linear' },
  },
};

export const userOrdersVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: 'beforeChildren' },
  },
};
