import React from 'react';
import {
  useTransform,
  useViewportScroll,
  useScroll,
  motion,
} from 'framer-motion';

const Header = () => {
  //   const { scrollYProgress } = useViewportScroll();
  const { scrollYProgress } = useScroll();

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ['0%', '0%', '-100%']
  );

  console.log(headerY, 'header');

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        background: '#f00',
        width: '100%',
        height: '300px',
        y: headerY,
      }}
    >
      Header
    </motion.header>
  );
};

export default Header;
