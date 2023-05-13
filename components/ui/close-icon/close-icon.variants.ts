import { Variants } from 'framer-motion';

export const closeIconVariants: Variants = {
  tap: { scale: 0.6, opacity: 0.6 },
  hover: { scale: 1.1 },
  disabled: { opacity: 0.4, transition: { duration: 0.3 } },
  animation: { opacity: 1, cursor: 'pointer' },
};
