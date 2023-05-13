import { Variants } from 'framer-motion';

export const headerVariants: Variants = {
  visible: {
    opacity: [0, 1],
    y: [30, 0],
    transition: { when: 'beforeChildren' },
  },
  cartLentghAnimate: {
    y: [10, 0],
    x: [10, 0],
    scale: [0, 1],
    transition: { duration: 0.3 },
  },
};
