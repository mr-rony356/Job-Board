import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import JobDetailsWrapper from '../Wrapper/JobDetailsWrapper';
import { useJobContext } from '../context/FormDataContext';
import YourComponent from '../components/FiltersOption';
import AccordionUsage from '../components/JobResult';
// import CustomizedHook from '../components/SearchBar';
import JobSearch from '../components/JobSearch';
import { useFilteredResultsContext } from '../components/JobSearch'; // Import FilteredResultsProvider

// Define the Job interface
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
}

const JobDetails: React.FC<{}> = () => {
  const { filteredResults } = useFilteredResultsContext(); // Access filtered results from context
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData, setJobFormData } = useJobContext();
  const [jobDetails, setJobDetails] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzXFc9UKiEv7s20Q_ngE5HUxz-Ipb2MtBoBQZ70Gh47BtVznszGtinKZxjRBeRft5k/exec');
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter jobDetails based on jobFormData
  const filteredJobDetails = jobDetails.filter(job => {
    if (jobFormData.State === 'Remote') {
      return (
        jobFormData.practiceArea?.some(area => job.PracticeArea.includes(area.toUpperCase())) &&
        jobFormData.specialties?.every(specialty => job.Cases.some(caseValue => caseValue.toUpperCase() === specialty.toUpperCase()))
      );

    } else {
      return (
        jobFormData.City === job.City &&
        jobFormData.State === job.State &&
        jobFormData.practiceArea?.some(area => job.PracticeArea.includes(area.toUpperCase())) &&
        jobFormData.specialties?.every(specialty => job.Cases.some(caseValue => caseValue.toUpperCase() === specialty.toUpperCase()))
      );
    }
  });

  const clearFilters = () => {
    setJobFormData({
      State: '',
      City: '',
      practiceArea: [],
      specialties: [],
    });
  };

  console.log('filteredJobDetails', filteredJobDetails)

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
          <YourComponent />
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
          <JobSearch jobDetails={jobDetails} ></JobSearch>
          <Box >
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
                  color: 'black'

                }
              }}
              onClick={clearFilters}
            >
              Clear All Filers
            </Typography>

          </Box>
        </Box>
        <Divider
          sx={{ borderColor: '#19ff85', width: '100%', borderWidth: '1.5px' }}
        />
        <Box>
          {filteredJobDetails.length >0 ||jobFormData.City || jobFormData.State || jobFormData.practiceArea?.length || jobFormData.specialties?.length ? (

            <AccordionUsage jobDetails={filteredJobDetails} />


          ) :
            filteredResults.length > 0 ?
              <AccordionUsage jobDetails={filteredResults} />
              : (
                <AccordionUsage jobDetails={jobDetails} />
              )}
        </Box>

      </Box>

    </JobDetailsWrapper>

  );
};

export default JobDetails;
