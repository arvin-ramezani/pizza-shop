import { motion } from 'framer-motion';
import styled from 'styled-components';

import { theme } from '@/utils/theme.styled';

export const StyledMap = styled.div`
  position: relative;
`;

export const StyledMapSidebar = styled(motion.span)`
  padding: 0.5rem 1rem;
  background-color: #0000005e;
  border-radius: 0.4rem;
  color: #fff;
  font-size: 0.5rem;
  z-index: 1;
  letter-spacing: 1px;
  position: absolute;
  top: 0.5rem;
  left: 0.2rem;
  max-width: 90%;
  direction: ltr;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;
