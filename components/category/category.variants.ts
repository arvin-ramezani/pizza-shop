import { theme } from '@/utils/theme.styled';
import { Variants } from 'framer-motion';

export const categoryItemVariant: Variants = {
  animation: (active) => ({
    color: active ? theme.colors.white : theme.colors.dark,
    fontSize: active ? '1.2rem' : '1rem',
  }),
};
