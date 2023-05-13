import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

export const StyledPlaceList = styled(motion.div)`
  margin-bottom: 1rem;
`;

export const StyledPlace = styled(motion.div)`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.darkWhite};
  border-radius: 0.3rem;
  cursor: pointer;
  position: relative;
  margin-left: 0.3rem;

  & > span {
    padding: 0.2rem 0.5rem;
  }
`;

export const StyledDelete = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`;

export const StyledCloseIcon = styled(AiOutlineCloseCircle)``;
