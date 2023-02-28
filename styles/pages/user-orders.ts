import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledLoadingImage = styled(motion.img)`
  display: block;
  margin: 4rem auto;
  width: 100px;
  height: auto;
`;

export const StyledUserOrdersList = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;

  & h5 {
    margin: 0;
  }
`;
