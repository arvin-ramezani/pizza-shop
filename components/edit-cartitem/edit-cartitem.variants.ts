import { Variants } from 'framer-motion';

export const editCartitemVariants: Variants = {
  containerInitial: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  containerAnimation: {
    width: '100%',
    height: '100%',
    opacity: 1,
    borderRadius: '12px',
    background: 'linear-gradient(270deg, black 20%, #000000a8',
  },
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  quantityTextAnimation: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
};
