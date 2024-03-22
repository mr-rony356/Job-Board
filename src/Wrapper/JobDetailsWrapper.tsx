import React from 'react';
import { Footer } from '../components/Footer';

interface MainSectionWrapperProps {
  children: React.ReactNode;
}

const JobDetailsWrapper: React.FC<MainSectionWrapperProps> = ({ children }) => {
  return (
    <section style={{
      background:'black',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight:'93vh',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'column',
    }}>
      {children}
      <Footer />

    </section>
  );
};

export default JobDetailsWrapper;
