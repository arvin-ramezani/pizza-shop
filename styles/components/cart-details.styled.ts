import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledCartDetails = styled(motion.div)`
  width: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40%;
  }
`;

export const CartDetailsContainer = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0.6rem;
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  width: auto;
  border-radius: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: flex-start;
    gap: 2rem;
    padding: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;

    border-radius: 0.8rem;
    overflow: hidden;
  }
`;

export const StyledDarkLayout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: -1;
`;

export const QuantityContainer = styled.div`
  & > p {
    display: inline-block;
  }
`;

export const TotalPriceContainer = styled.div`
  & > p {
    display: inline-block;
  }
`;

export const ClearCartBtnWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & button {
  }

  & button:first-child {
    margin-bottom: 0.8rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-self: flex-start;
    margin-top: auto;
  }
`;

export const CreateOrderContainer = styled(motion.div)`
  padding: 0.6rem;
`;

export const AddressContainer = styled.div`
  & > h3 {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
