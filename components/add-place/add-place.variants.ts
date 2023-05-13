import { Variants } from 'framer-motion';

export const addCoordinatesVariant: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 10, delay: 0.4 },
  },
};
