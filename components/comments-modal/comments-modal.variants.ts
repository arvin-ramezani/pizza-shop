import { Variants } from 'framer-motion';

export const commentModalVariants: Variants = {
  initial: { opacity: 0 },
  animation: { opacity: 1 },
  exit: {
    height: 0,
    y: '-100%',
  },
};
