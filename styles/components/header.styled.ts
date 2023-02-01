import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.header`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.93) 11.2%,
    rgb(63 61 61 / 68%)
  );
  box-shadow: 0px 1px 8px 1px #000c;

  position: sticky;
  z-index: 2;
  height: 70px;
  margin: -70px auto 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 100px;
    margin: -100px auto 0;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0.5rem 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 80%;
  }
`;

export const Logo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80px;
    height: 80px;
  }
`;

export const AuthButtonContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 0.6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

export const StyledUserNameLetter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.4rem;
`;

export const WrapperIconButton = styled(motion.div)`
  position: relative;
  margin-top: 0.6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-right: 2rem;
  }
`;

export const CartLengthWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  /* display: block; */
  border-radius: 50%;
  position: absolute;
  left: -12px;
  top: -12px;
  overflow: hidden;
  min-width: 28px;
  min-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  padding: 3px 1px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    /* padding: 0.3rem 0.5rem;
  width: auto;
  height: auto; */
  }
`;

export const CartLengthNumber = styled(motion.span)`
  /* display: block; */
  position: static;
`;
