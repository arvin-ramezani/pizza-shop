import { Variants } from 'framer-motion';

export const editButtonVariant: Variants = {
  animation: (editMode) => {
    return editMode
      ? {}
      : {
          x: [-20, 20, -10, 10, -5, 5, -2, 2, -1, 1, 0],
          transition: { duration: 0.3 },
        };
  },
};
