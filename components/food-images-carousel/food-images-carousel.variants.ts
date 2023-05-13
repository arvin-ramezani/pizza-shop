import { Variants } from 'framer-motion';

export const foodImagesCarouselVariants: Variants = {
  initial: { scale: 0, rotate: -200 },
  animation: { scale: 1, rotate: 0 },
  slideAnimation: ({ position, index }) => ({
    zIndex: index === position ? 1 : -1,
    scale: index === position ? 1 : 0.8,
    rotate: 0,
    opacity: [0, 1],
    borderRadius: '0.6rem',
    // right: `${(index - position) * 60 - 40}vw`,
    right: `${(index - position) * 50 - 40}vw`,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  }),
};

export const foodImageVariants: Variants = {
  initial: { boxShadow: '0px 0px 0px 0px transparent' },
  animation: ({ position, index }) => ({
    boxShadow:
      index === position
        ? '-6px 4px 20px 4px rgb(181 178 178)'
        : '0px 0px 0px 0px transparent',
  }),
};
