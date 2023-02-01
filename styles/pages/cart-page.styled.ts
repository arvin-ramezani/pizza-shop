import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 70px auto 0;
  max-width: 1200px;
  overflow: hidden !important;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 100px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: 140px;
  }
`;
export const CartItemsContainer = styled(motion.div)`
  padding: 1rem;
  width: auto;

  & > div:first-child {
    margin: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40%;
    padding: 0.3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 30%;
  }
`;

export const EmptyCartContainer = styled.div`
  display: flex;
`;
