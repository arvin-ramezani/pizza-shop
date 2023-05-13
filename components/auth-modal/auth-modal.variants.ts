import { Variants } from 'framer-motion';

export const authModalVariants: Variants = {
  initial: { y: '100vh', x: '0', opacity: 0, scale: 0.5 },
  exit: { y: '-100vh', x: '0', opacity: 0, scale: 0.5 },
  animation: {
    y: '0%',
    x: '0',
    opacity: 1,
    scale: 1,
  },
};
