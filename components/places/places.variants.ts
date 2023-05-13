import { Variants } from 'framer-motion';

export const placeListVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3, delay: 1 },
  },
};

export const placeVariants: Variants = {
  initial: { x: -30, y: -30, opacity: 0, scale: 0.5 },
  animation: (isSelected) => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,

      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    };
  },
};
