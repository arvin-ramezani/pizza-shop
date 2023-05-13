import { Variants } from 'framer-motion';

export const cartItemVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
    rotate: -20,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
  },
  exit: {
    x: 100,
    opacity: 0,
  },
};
