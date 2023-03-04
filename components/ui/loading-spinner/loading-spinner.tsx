import React from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

const LoadingSpinnerVariants: Variants = {
  initial: {
    rotate: 0,
    position: 'fixed',
    right: '50%',
    top: '50%',
    width: '32px',
    height: '32px',
    x: '50%',
  },
  animation: {
    rotate: 360,
    // transform: 'rotate(360)',
    transition: { repeat: Infinity, duration: 1, ease: 'linear' },
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
