import React, { createContext, useContext, useState, ChangeEvent } from 'react';
import { Box, Button, InputBase, useMediaQuery, useTheme } from '@mui/material';
import { useJobContext } from '../context/FormDataContext';

interface Job {
    JobID: number;
    FirmID: string;
    Firm: string;
    City: string;
    State: string;
    JobDescription: string;
    JobPostTitle: string;
    PracticeArea: string;
    length: string;
    Cases: string[];

    // Add other job properties here
}

interface FilteredResultsContextValue {
    filteredResults: Job[];
    setFilteredResults: React.Dispatch<React.SetStateAction<Job[]>>;
}

const FilteredResultsContext = createContext<FilteredResultsContextValue | undefined>(undefined);

export const useFilteredResultsContext = (): FilteredResultsContextValue => {
    const context = useContext(FilteredResultsContext);
    if (!context) {
        throw new Error('useFilteredResultsContext must be used within a FilteredResultsProvider');
    }
    return context;
};

export const FilteredResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filteredResults, setFilteredResults] = useState<Job[]>([]);

    return (
        <FilteredResultsContext.Provider value={{ filteredResults, setFilteredResults }}>
            {children}
        </FilteredResultsContext.Provider>
    );
};

interface JobSearchProps {
    jobDetails: Job[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchQuery:string
  }
  
const JobSearch: React.FC<JobSearchProps> = ({  jobDetails, searchQuery, setSearchQuery  }) => {
    const { setFilteredResults } = useFilteredResultsContext();
    const {  setJobFormData } = useJobContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
      // if (event.target.value === '') {
      //   setSearchQuery('');
      // }
      handleSearchIconClick()
     
    };
  
    const handleSearchIconClick = () => {
        const keywords = searchQuery.split(',').map(keyword => keyword.trim().toLowerCase());
        let newFilteredResults = [...jobDetails];

        keywords.forEach(keyword => {
          newFilteredResults = newFilteredResults.filter(job =>
            Object.values(job).some(
              value => typeof value === 'string' && value.toLowerCase().includes(keyword)
            )
          );
        });

        setFilteredResults(newFilteredResults);
        // setSearchQuery(''); // Clear search input value
        setJobFormData({
          State: '',
          City: '',
          practiceArea: [],
          specialties: [],
        });
      };
      
  
    return (
      <Box sx={{ position: 'relative' }}>
        <InputBase
          value={searchQuery}
          placeholder="Keyword Search"
          size="medium"
          onChange={handleSearchChange}
          fullWidth
          sx={{
            '& .MuiInputBase-input': { color: 'white' },
            color: 'white',
            width:isMobile? '300px':'350px',
            padding: '5px 10px', // Adjust padding as needed
            backgroundColor: '#000',
            outline: 'white',
            border: '1px solid #1c663f',
            '&:hover': {
              border: '1px solid #1b663f',
            },
            '&.focused': {
              border: '2px solid #1c663f',
            },
          }}
        />
        <Button
          onClick={handleSearchIconClick}
          sx={{
            position: 'absolute',
            right: '1px',
            color: 'white',
            top:'5px',
            border:'none',
            textTransform:'capitalize',
            borderRadius:'0px',
            paddingBottom:'10px',
            background:'19ff85',
            '&:hover': {
              color:'gray'

            },
          }}
        >
          Search
        </Button>
      </Box>
    );
  };
  
export default JobSearch;
