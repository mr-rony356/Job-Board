import React, { createContext, useState, useContext } from 'react';

interface FormData {
  state: string;
  city: string;
  practiceArea: string;
  specialties: string;
  jdYear: string;
  clicked?: string;
}

interface JobContextType {
  jobFormData: FormData;
  setJobFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobFormData, setJobFormData] = useState<FormData>({
    state: '',
    city: '',
    practiceArea: '',
    specialties: '',
    jdYear: '',
  });

  return (
    <JobContext.Provider value={{ jobFormData, setJobFormData }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
