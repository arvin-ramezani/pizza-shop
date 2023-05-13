import { motion } from 'framer-motion';
import styled from 'styled-components';

export const FoodContainer = styled(motion.div)`
  margin-top: 70px;
  overflow-x: hidden;
  padding: 0 0.5rem;
`;

export const Container = styled(motion.div)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: row-reverse;
    width: 80%;
    margin: 0 auto;
  }
`;

export const TitleBlock = styled(motion.div)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-between;
  }
`;

export const FoodName = styled(motion.h1)`
  margin: 0 auto 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Integredients = styled(motion.p)`
  margin-bottom: 0.5rem;
`;

export const Details = styled(motion.div)`
  border-radius: 0.5rem;
  margin: 2rem 0 0;
`;

export const DetailsTitle = styled(motion.h4)`
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const FoodContent = styled.div``;
