import React from 'react';
import Footer from '../footer/footer';

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
      <Footer />
      <CustomToast />
    </>
  );
};

export default Layout;
