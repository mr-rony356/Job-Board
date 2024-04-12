import React, { useState, useMemo } from 'react';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import JobDetailsWrapper from '../Wrapper/JobDetailsWrapper';
import FilterItems from '../components/FiltersOption';
import AccordionUsage from '../components/JobResult';
import JobSearch from '../components/JobSearch';
import Pagination from '@mui/material/Pagination';
import { useJobContext } from '../context/FormDataContext';
import { useFilteredResultsContext } from '../components/JobSearch'; // Import FilteredResultsProvider

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

interface JobDetailsProps {
  jobDetails: Job[]; // Accept jobDetails as prop
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData, setJobFormData } = useJobContext();
  const { filteredResults, setFilteredResults } = useFilteredResultsContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 20;
  const [cleared, setCleared] = useState(false);
  // Memoized filtered jobs
  const filteredJobDetails = useMemo(() => {
    return jobDetails.filter(job => {
      const cityMatch = !jobFormData.City || jobFormData.City === job.City;
      const stateMatch = !jobFormData.State || jobFormData.State === 'Remote' || jobFormData.State === job.State;

      let practiceAreaMatch = true;
      if (jobFormData.practiceArea && jobFormData.practiceArea.length > 0) {
        practiceAreaMatch = jobFormData.practiceArea.some(area => job.PracticeArea.includes(area.toUpperCase()));
      }

      let specialtyMatch = true;
      if (jobFormData.specialties && jobFormData.specialties.length > 0) {
        specialtyMatch = jobFormData.specialties.some(specialty => job.Cases.some(caseValue => caseValue.toUpperCase() === specialty.toUpperCase()));
      }

      return cityMatch && stateMatch && practiceAreaMatch && specialtyMatch;
    });
  }, [jobDetails, jobFormData]);

  // Paginate filtered jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // Change page
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    console.log(event)
  };

  // Clear all filters
  const handleClearFilters = () => {
    setJobFormData({
      State: '',
      City: '',
      practiceArea: [],
      specialties: [],
    });
    setSearchQuery('');
    setFilteredResults([]);
    setCurrentPage(1);
    setCleared(true)
  };
  // Determine which jobs to display based on filters and search
  const determineDisplayedJobs = () => {
    // If filters are applied or search results exist, show the appropriate jobs
    if (filteredResults.length > 0 && !jobFormData.State && !jobFormData.City) {
      return filteredResults;
    }
    if (!jobFormData.State && !jobFormData.City && searchQuery) {
      return [];
    }


    if (
      filteredJobDetails.length > 0 ||
      jobFormData.State ||
      (jobFormData.City && jobFormData.State) ||
      (jobFormData.City && jobFormData.State && jobFormData.practiceArea?.length) ||
      (jobFormData.City && jobFormData.State && jobFormData.practiceArea?.length && jobFormData.specialties?.length)
    ) {
      return filteredJobDetails;
    }
    // If filtered results exist, show them
    // If no filters are applied and no search results exist, show all jobs
    else if (!jobFormData.State && !jobFormData.City && !searchQuery) {
      return jobDetails;
    }
    // If no jobs are found, return an empty array
    else {
      return [];
    }
  };
  // Paginate the displayed jobs
  const totalJobs = determineDisplayedJobs().length;
  const displayedJobs = determineDisplayedJobs().slice(indexOfFirstJob, indexOfLastJob);
  // const displayedRangeStart = indexOfFirstJob + 1;
  // const displayedRangeEnd = Math.min(indexOfLastJob, totalJobs);
  return (
    <JobDetailsWrapper>
      <Box
        sx={{
          display: 'flex',
          maxWidth: isMobile ? '100%' : '80%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: '3rem',
              fontFamily: 'inherit',
            }}
          >
            Search Jobs
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

          <FilterItems cleared={cleared} />
        </Box>
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
          <JobSearch jobDetails={jobDetails} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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

        <Divider sx={{ borderColor: '#19ff85', width: '100%', borderWidth: '1.5px' }} />
        {/* <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          alignItems:'center'
        }}>
          <Typography variant="body1" sx={{ marginTop:'35px', paddingRight:'15px', fontSize: isMobile?'12px':'18px', marginBottom:'0'}}>
            Showing ({displayedRangeStart}-{displayedRangeEnd}) out  of {totalJobs} Results
          </Typography>

        </Box> */}
        <Typography variant='h1' textAlign='center' sx={{
          fontFamily: 'inherit',
          color: 'white',
          fontSize: '40px',
          margin: '25px 0',

        }}>
          {
            totalJobs === 0 ?
              'No Job Found' :
              `${totalJobs} Results`

          }

        </Typography>


        <AccordionUsage jobDetails={displayedJobs} />
        <Pagination color='primary'
          sx={{
            margin: '40px 0'
          }}
          count={Math.ceil(determineDisplayedJobs().length / jobsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />

      </Box>

    </JobDetailsWrapper>
  );
}
export default JobDetails;