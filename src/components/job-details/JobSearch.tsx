import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import JobSearch from '../JobSearch';
interface Job {
    JobID: number;
    FirmID: string;
    Firm: string;
    City: string;
    State: string;
    JobDescription: string;
    JobPostTitle: string;
    PracticeArea: string;
    Cases: string[];
    length: string;
    DateUpdated: string;
  }
  
interface JobSearchProps {
  jobDetails: Job[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClearFilters: () => void;
  isMobile: boolean;
}

const JobSearchSection: React.FC<JobSearchProps> = ({
  jobDetails,
  searchQuery,
  setSearchQuery,
  handleClearFilters,
//   isMobile,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '20px',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <JobSearch
        jobDetails={jobDetails}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box>
        <Typography
          padding={1}
          fontSize={12}
          sx={{
            background: 'black',
            border: '1px solid white',
            cursor: 'pointer',
            padding: '5px',
            '&:hover': {
              background: '#11b55e',
              color: 'black',
            },
          }}
          onClick={handleClearFilters}
        >
          Clear All Filters
        </Typography>
      </Box>
    </Box>
  );
};

export default JobSearchSection;