import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledConfirmModal = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.8);
`;

export const Modal = styled(motion.div)`
  background: #f5f5f5;
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 0.4rem;
`;

export const ModalBody = styled(motion.div)``;

export const ModalActionButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
