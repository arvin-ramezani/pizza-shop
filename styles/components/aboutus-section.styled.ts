import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledAboutus = styled(motion.div)`
  max-width: 80%;
  margin: 0 auto;
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

export const AboutusTextBlock = styled(motion.div)``;

export const AboutusMapContainer = styled(motion.div)``;
