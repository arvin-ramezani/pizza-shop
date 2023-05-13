import { Variants } from 'framer-motion';

export const userOrdersItemVariants: Variants = {
  initial: { opacity: 0, x: -100 },
  animation: { opacity: 1, x: 0 },
};

export const userOrdersItemPlaceNameVariants: Variants = {
  initial: { opacity: 0, scale: 0.4 },
  animation: {
    opacity: 1,
    scale: 1,
  },
};

export const orderFoodContainerVariants: Variants = {
  animation: (showMoreBtn) => ({
    height: showMoreBtn ? '100%' : '55px',
  }),
};

export const orderFoodMoreBtnVariants: Variants = {
  animation: (showMore) => ({
    height: showMore ? '100%' : '55px',
  }),
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};
