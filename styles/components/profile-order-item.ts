import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledOrderItem = styled(motion.div)`
  /* display: flex; */
  font-size: 1.6rem;
  /* border: 1px solid red; */
  border-radius: 0.6rem;
  margin: 0.5rem auto;
  padding: 0.5rem 1rem;
  box-shadow: -1px 1px 8px 0px ${({ theme }) => theme.colors.primary};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 40%;
  }
`;

export const OrderItemHeader = styled(motion.div)`
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
  padding: 0 0.5rem;
  border-radius: 1rem;

  & > h5 {
    cursor: pointer;
  }
`;

export const StyledMapBtnTxt = styled(motion.span)`
  color: ${({ theme }) => theme.colors.blue};
`;

export const OrderItemPlaceAddress = styled(motion.div)`
  font-size: 0.8rem;
  position: absolute;
  top: 0.4rem;
  padding: 0.5rem;
  background: #ccc;
  border-radius: 0.5rem;
`;

export const OrderFoodsBlock = styled(motion.div)`
  /* display: flex; */
  font-size: 0.8rem;
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
  padding: 1rem 0;
`;

export const TotalPrice = styled(motion.span)`
  font-size: 1rem;
  font-weight: 600;
`;

export const TotalQuantity = styled(motion.div)`
  font-weight: 600;
  padding: 0 0.6rem;
  margin-right: auto;
`;

export const TotalPriceText = styled(motion.div)`
  display: flex;
  gap: 0.2rem;
`;
