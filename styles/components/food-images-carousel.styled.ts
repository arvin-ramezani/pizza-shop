import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  width: 100vw;
  height: 50vh;
  margin-top: -10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 70vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    /* width: 80vw; */
    margin: -10px auto 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    /* width: 70vw; */
    margin: -10px auto 0;
  }
`;

export const SlidesContainer = styled(motion.div)`
  /* display: flex; */
  background-color: #a2caff;
  position: relative;
`;

export const Slide = styled(motion.div)`
  width: 80vw;
  height: 30vh;
  position: absolute;
  top: -20vh;
  background: ${({ theme }) => theme.colors.white} !important;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 50vh;
    top: -25vh;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 50vh;
    width: 70vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 60vw;
  }

  /* @media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    width: 50vw;
  } */
`;

export const StyledImage = styled(motion.img)`
  width: 100% !important;
  height: 100% !important;
  border-radius: 0.6rem;
  cursor: grab;
`;

export const ButtonsContainer = styled(motion.div)`
  position: absolute;
  top: 14vh;
  right: -40vw;
  display: flex;
  z-index: 1;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 28vh;
  }
`;
