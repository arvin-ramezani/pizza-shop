import { theme } from '@/utils/theme.styled';
import { Variants } from 'framer-motion';

export const secondaryBtnVariants: Variants = {
  initial: { y: -100, opacity: 0, scale: 0 },
  animation: {
    y: 0,
    opacity: 1,
    scale: 1,
    cursor: 'pointer',
    transition: { duration: 0.4 },
  },
  disabled: {
    opacity: 0.8,
    backgroundColor: theme.colors.darkWhite,
    cursor: 'no-drop',
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.6 },
};
