import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledAboutus = styled(motion.section)`
  max-width: 80%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  gap: 5rem;

  margin-bottom: 10rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;

    & > div {
      flex: 1;
    }
  }
`;

export const AboutusTextBlock = styled(motion.div)`
  & h2 {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 2rem;
  }
`;

export const AboutusMapContainer = styled(motion.div)``;
