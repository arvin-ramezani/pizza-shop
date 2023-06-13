import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledUserOrdersSection = styled(motion.section)`
  position: relative;
`;

export const StyledLoadingImageWrapper = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000000c2;
  z-index: 2;
`;

export const StyledLoadingImage = styled(motion.img)`
  display: block;
  margin: 4rem auto;
  width: 100px;
  height: auto;
  position: fixed;
  top: 35%;
  right: 50%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 60%;
  }
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

export const UserOrdersPagination = styled.div`
  padding: 0.5rem 1rem;
`;

export const UserOrdersPaginationSelectBox = styled.select`
  padding: 0.1rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  & option {
    cursor: pointer;
  }
`;

export const UserOrdersPaginationText = styled.div`
  margin-bottom: 1rem;
  font-size: 0.8rem;

  & > span {
    display: block;
  }
`;

export const UserOrdersButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
