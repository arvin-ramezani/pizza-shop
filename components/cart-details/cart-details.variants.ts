import { Variants } from 'framer-motion';

export const cartDetailsVariants: Variants = {
  containerInitial: { opacity: 0, x: -50 },
  containerAnimation: {
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      duration: 0.6,
      delay: 0.6,
    },
  },
  detailsTextInitial: { scale: 0 },
  detailsTextAnimation: {
    scale: [0, 1.4, 1],
    opacity: [0, 0.5, 1],
    transition: { type: 'spring' },
  },
};
