import { Variants } from 'framer-motion';

export const modalBackdropVariants: Variants = {
  hidden: {
    height: '0',
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    height: '100%',

    transition: {
      when: 'beforeChildren',
    },
  },
};

export const modalFormVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (isEditing) => ({
    opacity: isEditing ? 0.4 : 1,
  }),
};

export const spinnerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  spinnerInitial: { rotate: 0 },
  spinnerAnimation: {
    rotate: 360,

    transition: { repeat: Infinity, duration: 0.5 },
  },
};

export const editButtonVariants: Variants = {
  animation: { x: [-10, 10, -5, 4, -2, 1, 0], transition: { duration: 0.3 } },
};
