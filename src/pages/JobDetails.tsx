import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import JobDetailsWrapper from '../Wrapper/JobDetailsWrapper';
import SelectItem from '../components/SelectItem'
interface JobDetailsProps {
  jobData: {
    Cases: string;
    City: string;
    ContactInfo: string;
    DateUpdated: string;
    Firm: string;
    FirmID: string;
    FirmSize: string;
    JobID: number;
    JobPostDescription: string;
    JobPostTitle: string;
    JobTitle: string;
    MaxSalary: number;
    MaxJDYear: string;
    MinSalary: number;
    MinJDYear: number;
    PracticeArea: string;
    State: string;
  };
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobData }) => {
  const [jobDetails, setJobDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=e_kWJNhagdSoWdoDoC_dwmYl2X-LpNbx91RDBWXUAVxMjpsQSmmt7r99kmzhukS9ccuWisz01gC7hjG7-pVB3-c7J7mjSbTcm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBHyk-764z3OSXfpHv_ICmO8Wb2zMieASf4Uetz0VM81calDyvifEPZEXN7Vqw2ypPurgu5dQp2l95ojsNBKmvtmiJj_Ks8krg&lib=MwqUBDoCocygC8J6JdyePRxDjpZDpCpHQ');
        const data = await response.json();
        setJobDetails(data); // Store retrieved data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const values = [
    { value: 'State', label: 'State' }, // Initial value included as an option
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
  ]; return (
    <JobDetailsWrapper>
      <Box>

      <Box>
        {/* {jobDetails && jobDetails.map((job: any, index: number) => (
          <Typography key={index} variant="body1">
            City: {job.JobID}
          </Typography>
        ))} */}
        <Typography variant='h1' sx={
          {
            textAlign: 'center',
            fontSize: '3rem',
            fontFamily: 'inherit'
          }
        }>
          Search Jobs
        </Typography>
        <Typography variant='h5' sx={
          {
            textAlign: 'center',
            fontSize: '2rem',
            fontFamily: 'inherit'
          }
        }>
          Filters
        </Typography>

      </Box>
      <Box sx={
        {
          display:'flex',
          flexWrap:'wrap'
          
        }
      }>
        <SelectItem initialValue='State' values={values} >

        </SelectItem>
        <SelectItem initialValue='State' values={values} >

        </SelectItem>
        <SelectItem initialValue='State' values={values} >

        </SelectItem>
        <SelectItem initialValue='State' values={values} >

        </SelectItem>
      </Box>
      </Box>

    </JobDetailsWrapper>
  );
};

export default JobDetails;
