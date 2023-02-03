import { theme } from '@/utils/theme.styled';
import { Variants } from 'framer-motion';

export const buttonSmVariants: Variants = {
  tap: { scale: 0.6, opacity: 0.6 },
  hover: { scale: 1.1 },
  disabled: {
    opacity: 0.8,
    scale: 1,
    backgroundColor: theme.colors.darkWhite,
    cursor: 'no-drop',
    boxShadow: '-2px 1px 3px 1px rgb(209 203 203)',
    transition: { duration: 0.3 },
  },
  animation: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0 },
};
