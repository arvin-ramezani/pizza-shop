import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledOrderItem = styled(motion.div)`
  font-size: 1.6rem;
  border-radius: 0.6rem;
  margin: 0.5rem auto;
  padding: 0.5rem 1rem;
  width: 100%;

  box-shadow: -1px 1px 8px 0px ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 40%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 60%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 40%;
  }
`;

export const OrderItemHeader = styled(motion.div)`
  display: flex;
  position: relative;
  padding: 0 0.5rem;
  border-radius: 1rem;
`;

export const ProfileOrderItemPlaceName = styled(motion.h4)`
  cursor: pointer;
  margin: 0;
  font-size: clamp(1rem, 1.2rem, 1.4rem);
  color: ${({ theme }) => theme.colors.blue};
  position: relative;

  ::after {
    content: '';
    position: absolute;
    width: 70%;
    height: 4px;
    right: 0;
    bottom: 0;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

export const StyledMapBtnTxt = styled(motion.span)`
  color: ${({ theme }) => theme.colors.blue};
`;

export const ProfileOrderItemDate = styled(motion.div)`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const OrderItemPlaceAddress = styled(motion.div)`
  font-size: 0.8rem;
  position: absolute;
  top: 0.4rem;
  padding: 0.5rem;
  background: ${({ theme }) => theme.backgroundColors.blue};
  border-radius: 0.5rem;
`;

export const OrderFoodItemScrollbarContainer = styled(motion.div)`
  direction: ltr;
  /* height: 55px; */
  overflow-y: scroll;
  padding-right: 0.4rem;

  & > div {
    direction: rtl;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }
`;

export const OrderFoodsBlock = styled(motion.div)`
  font-size: 0.8rem;
`;

export const OrderFoodMoreBtn = styled(motion.div)`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 1rem 1rem 0 0;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.blue};
`;

export const OrderFoodsItem = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const OrderFoodName = styled(motion.div)``;

export const OrderFoodQuantity = styled(motion.div)`
  font-weight: 600;
  padding: 0 0.6rem;
  margin-right: auto;
  line-height: 1;
`;

export const OrderFoodPrice = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const TotalPriceBlock = styled(motion.div)`
  display: flex;
  font-size: 0.9rem;
  height: 1.5rem;
  align-items: center;
  margin-top: 0.8rem;
  border-top: 1px solid;
  padding: 1.4rem 0;
`;

export const TotalPrice = styled(motion.span)`
  font-size: 1rem;
  font-weight: 600;
`;

export const TotalQuantity = styled(motion.div)`
  font-weight: 600;
  padding: 0 0.6rem;
  margin-right: auto;
  line-height: 1;
`;

export const TotalPriceText = styled(motion.div)`
  display: flex;
  gap: 0.2rem;
`;
