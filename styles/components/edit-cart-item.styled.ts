import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ItemEdit = styled(motion.div)`
  align-self: flex-end;
  position: absolute;
  top: 0;
`;

export const Container = styled.div`
  padding: 1rem;
`;

export const QuantityTxt = styled(motion.div)`
  z-index: 1;
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  gap: 0.5rem;
`;

export const EditBtnsWrapper = styled(motion.div)`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
