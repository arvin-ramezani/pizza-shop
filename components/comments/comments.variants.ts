import { Variants } from 'framer-motion';

export const commentsBlockVariants: Variants = {
  initial: { opacity: 0, x: -50, transition: { duration: 0 } },
  animation: (isDeleting) => ({
    opacity: isDeleting ? 0.4 : 1,
    x: 0,

    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delay: 0.2,
    },
  }),
};

export const commentItemVariants: Variants = {
  initial: { opacity: 0, x: -100 },
  animation: {
    x: 0,
    opacity: 1,
  },
  warning: {
    x: [-30, 0, -20, 0, -10, 0],
  },
};
