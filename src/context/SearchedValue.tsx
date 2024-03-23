import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the interface for the job details context
interface JobDetailsContextType {
  jobDetails: string[];
  setSelectedJobDetails: (details: string[]) => void;
}

// Create a context
export const JobDetailsContext = createContext<JobDetailsContextType>({
  jobDetails: [],
  setSelectedJobDetails: () => {},
});

// Define props for the provider
interface JobDetailsProviderProps {
  children: ReactNode;
}

// Create a provider for the context
export const JobDetailsProvider: React.FC<JobDetailsProviderProps> = ({ children }) => {
  // State to store job details
  const [jobDetails, setJobDetails] = useState<string[]>([]);

  // Function to set job details
  const setSelectedJobDetails = (details: string[]) => {
    setJobDetails(details);
  };

  return (
    <JobDetailsContext.Provider value={{ jobDetails, setSelectedJobDetails }}>
      {children}
    </JobDetailsContext.Provider>
  );
};
