import React from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

const LoadingSpinnerVariants: Variants = {
  initial: { scale: 0, opacity: 0, rotate: 0 },
  animation: {
    scale: 1,
    opacity: 1,
    rotate: -360,
    transition: { repeat: Infinity, duration: 0.6, ease: 'linear' },
  },
};

const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner
      as={motion.img}
      variants={LoadingSpinnerVariants}
      initial="initial"
      animate="animation"
      exit="initial"
      src="/images/button/loading.png"
      alt="loading..."
    />
  );
};

const StyledLoadingSpinner = styled(motion.img)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export default LoadingSpinner;
