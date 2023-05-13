import { Variants } from 'framer-motion';

export const carouselVariants: Variants = {
  initialTitle: { opacity: 0, x: -300 },
  titleAnimation: {
    // position: 'absolute',
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 10, delay: 1.5 },
  },
};

export const foodItemVariants: Variants = {
  initial: { opacity: 0, x: -40 },
  animation: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.6 },
  },
};
