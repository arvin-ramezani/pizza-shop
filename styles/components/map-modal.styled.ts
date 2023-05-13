import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MapModalContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledMapModal = styled(motion.div)`
  width: clamp(40%, 500px, 80%);
  background: #fff;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 0.5rem;
  position: relative;
`;

export const CoordinatesText = styled(motion.div)`
  direction: ltr;
  font-size: 0.8rem;

  & span {
    display: block;
    margin: 0 0.4rem;
  }
`;

export const MapModalButtonsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;

  & button {
    padding: 0.3rem;
    font-size: 0.8rem;
    width: 100px;
  }
`;
