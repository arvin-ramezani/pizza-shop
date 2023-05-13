import { Variants } from 'framer-motion';

export const foodItemVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
  exit: { x: 50, scale: 0.95 },
  quantityCounterText: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
  hoverItem: {
    boxShadow: 'inset -1px 2px 4px 1px #ff7a008c',
  },
};

export const foodItemTotalPriceVariants: Variants = {
  initial: { opacity: 0.5, scale: 0.4 },
  animation: { opacity: 1, scale: [0.5, 1.2, 1] },
};
