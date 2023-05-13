import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';

import IconButton from '@/components/ui/icon-button/icon-button';

export const StyledCartItem = styled(motion.div)`
  position: relative;
  cursor: grab;
`;

export const CartItemContainer = styled(motion.div)`
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0.6rem 0.4rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  box-shadow: -5px 3px 6px 4px ${({ theme }) => theme.colors.darkWhite};
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;

export const StyledImage = styled(Image)`
  align-self: center;
`;

export const ItemName = styled(motion.div)`
  & > h4 {
    margin: 0;
  }
`;

export const PriceContainer = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  margin-right: auto;

  & > p {
    margin-left: 0.2rem;
  }
`;

export const QuantityPrice = styled.div``;

export const Quantity = styled.p`
  margin-bottom: 1rem;
`;

export const ItemPriceText = styled.p`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
`;

export const ItemPrice = styled.p``;
