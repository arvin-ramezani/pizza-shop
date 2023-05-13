import { Variants } from 'framer-motion';

export const foodItemVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animation: {
    x: 0,
    opacity: 1,
  },
  quantityCounterText: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
};
