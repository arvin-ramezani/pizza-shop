import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)``;

export const QuantityTitle = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5 1.5rem;
  margin-right: 1.5rem;
  margin-top: 0.8rem;
  display: block;
`;

export const QuantityCounter = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.5rem;
`;

export const QuantityText = styled(motion.p)`
  font-size: 1.4rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

export const StyledPrice = styled.p``;

export const StyledButtonWrapper = styled(motion.div)`
  margin: 1.2rem 0 0.5rem;
  width: 100%;
  z-index: 100;
  display: flex;
`;
