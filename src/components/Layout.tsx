import React from 'react';
import MainSectionWrapper from '../Wrapper/MainSectionWrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainSectionWrapper >
        {children}
      </MainSectionWrapper>
    </>
  );
};

export default Layout;
