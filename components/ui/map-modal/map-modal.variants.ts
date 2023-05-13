import { Variants } from 'framer-motion';

export const mapModalVariants: Variants = {
  initialContainer: {
    background: 'rgba(0,0,0,0)',
  },
  animationContainer: {
    background: 'rgba(0,0,0,0.8)',
  },
  initialMapModal: {
    top: '-100vh',
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  },
  animationMapModal: {
    top: '0',

    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 13,
    },
  },
};
