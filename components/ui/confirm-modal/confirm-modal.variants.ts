import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    y: -150,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { when: 'beforeChildren' },
  },
};

export const modalBodyVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.05 },
  },
};
