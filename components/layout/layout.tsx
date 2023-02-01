import React from 'react';

import Header from '../header/header';
import CustomToast from '../ui/toast-container/toast-container';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <CustomToast />
    </>
  );
};

export default Layout;
