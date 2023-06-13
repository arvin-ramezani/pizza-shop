import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledCommentModal = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCommentsWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.backgroundColors.white};
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  width: 90%;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 50%;
  }
`;
