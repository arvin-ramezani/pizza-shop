import React from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

import { LoadingSpinnerVariants } from './loading-spinner.variants';

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
