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

export const issueContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: 'beforeChildren' },
  },
};

export const issueChildrenVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};
