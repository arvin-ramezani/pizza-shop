import { theme } from '@/utils/theme.styled';
import { Variants } from 'framer-motion';

export const placeVariants: Variants = {
  initial: { scale: 0 },
  animation: {
    scale: 1,
    transition: { type: 'spring', stiffness: 600, damping: 10 },
  },
};

export const deletePlaceVariants: Variants = {
  hidden: { opacity: 0, scale: 0, backgroundColor: theme.colors.primary },
  visible: { opacity: 0, scale: 1, backgroundColor: theme.colors.primary },
  hover: { opacity: 1, scale: 1, backgroundColor: theme.colors.darkWhite },
  tap: { scale: 0 },
};
