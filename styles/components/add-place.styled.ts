import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledAddPlaceBlock = styled(motion.div)`
  margin-bottom: 2rem;
`;

export const AuthMapWrapper = styled(motion.div)`
  /* display: flex;
  align-items: center; */
  margin: 0 auto 2rem;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* width: 80%; */
  }

  & > span {
    display: flex;
    align-items: center;
  }
`;

export const AddLocationWrapper = styled.div`
  display: flex;
  /* gap: 0.3rem; */

  & > span {
    font-size: 0.8rem;
  }
`;
