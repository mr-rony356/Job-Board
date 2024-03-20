import React from 'react';
import { Footer } from '../components/Footer';

interface MainSectionWrapperProps {
  children: React.ReactNode;
}

const MainSectionWrapper: React.FC<MainSectionWrapperProps> = ({ children }) => {
  return (
    <section style={{
      background: 'linear-gradient(rgb(37 37 37), rgb(10 14 19 / 64%)), url(bg.jpg) 50% no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight:'93vh',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'column'

    }}>
      {children}
      <Footer />

    </section>
  );
};

export default MainSectionWrapper;
