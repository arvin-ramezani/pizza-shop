import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledFoodItem = styled(motion.div)`
  width: 240px;
  margin: 0 auto;
`;

export const Container = styled(motion.div)`
  position: relative;
  padding: 4rem 0.3rem 1.4rem;
  margin: 0 0.2rem;
  background: #fff;
`;

export const StyledImageWrapper = styled.div`
  width: fit-content;
  height: auto;
  margin: 0 auto;
  position: absolute;
  right: 50%;
  transform: translateX(50%) !important;
  top: 3%;
`;

export const FoodContent = styled(motion.div)`
  border-radius: 20px;
  padding: 0.1rem 0.8rem 0.5rem;
  height: 340px;
  box-shadow: -1px 2px 4px 1px ${({ theme }) => theme.colors.darkWhite};
`;

export const FoodHeader = styled(motion.h3)`
  margin-top: 50px;
`;

export const IntegredientText = styled.p`
  font-size: 0.8rem;
  height: 42px;
  line-height: 1.2;
`;

export const StyledDetailsLink = styled(Link)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.blue};
`;

export const QuantityTitle = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5 1.5rem;
  margin-right: 1.5rem;
  margin-top: 1.5rem;
  display: block;
  font-size: 0.8rem;
`;

export const QuantityCounter = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.5rem;
  gap: 0.5rem;
`;

export const QuantityText = styled(motion.p)`
  font-size: 1.4rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  position: relative;
`;

export const StyledPrice = styled.p`
  margin-left: 0.4rem;
`;

export const StyledTotalPrice = styled.p`
  position: absolute;
  bottom: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1rem;
  margin-top: 1rem;

  & p > span {
    margin-right: 0.2rem;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

export const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  & > p {
    margin-top: 0.4rem;
  }
`;

export const StyledButtonWrapper = styled(motion.div)`
  margin: 1.2rem 0 0.5rem;
  width: 100%;
`;
