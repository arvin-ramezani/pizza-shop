import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledAddPlaceBlock = styled(motion.div)`
  margin-bottom: 2rem;

  & h4 {
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

export const AuthMapWrapper = styled(motion.div)`
  margin: 0 auto 2rem;
  gap: 0.5rem;
  width: 100%;

  & > span {
    display: flex;
    align-items: center;
  }
`;

export const AddLocationWrapper = styled.div`
  display: flex;

  & > span {
    font-size: 0.8rem;
  }
`;
