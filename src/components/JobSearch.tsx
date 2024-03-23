import React, { createContext, useContext, useState, ChangeEvent } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    console.log(filteredResults)

    return (
        <FilteredResultsContext.Provider value={{ filteredResults, setFilteredResults }}>
            {children}
        </FilteredResultsContext.Provider>
    );
};

interface JobSearchProps {
    jobDetails: Job[];
}

const JobSearch: React.FC<JobSearchProps> = ({ jobDetails }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { setFilteredResults } = useFilteredResultsContext();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.trim().toLowerCase());
    };

    const handleSearchIconClick = (jobDetails: Job[]) => {
        const newFilteredResults = jobDetails.filter((job) =>
            Object.values(job).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery)
            )
        );
        setFilteredResults(newFilteredResults);
    };

    return (
        <Box sx={{
            position:'relative',

        }}>
            <InputBase
                value={searchQuery}
                placeholder='Keyword Search'
                size='small'
                onChange={handleSearchChange}
                fullWidth
                sx={{
                    '& .MuiInputBase-input': { color: 'white' } ,
                    color: 'white',
                    width: '300px',
                    padding: '5px 10px', // Adjust padding as needed
                    backgroundColor: '#000',
                    outline:'white',
                    border: '1px solid #1c663f',
                    '&:hover': {
                        border: '1px solid #1b663f',
                    },
                    '&.focused': {
                        border: '2px solid #1c663f',

                    },
                }}
            />
            <IconButton
                onClick={() => handleSearchIconClick(jobDetails)} // Assuming jobDetails is available
                sx={{
                    position:'absolute',
                    right:'5px',
                    color: 'white',
                    '&:hover': {
                        borderColor: '#1c663f',
                    }
                }}
            >
                <SearchIcon />
            </IconButton>

            <Box>
                {/* Display filtered results */}
            </Box>
        </Box>
    );
};

export default JobSearch;
