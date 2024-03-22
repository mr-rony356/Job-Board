import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import JobDetailsWrapper from '../Wrapper/JobDetailsWrapper';
import { useJobContext } from '../context/FormDataContext';
import YourComponent from '../components/FiltersOption';
import AccordionUsage from '../components/JobResult';
import CustomizedHook from '../components/SearchBar';

// Define the Job interface
interface Job {
  JobID: number;
  FirmID: string;
  Firm: string;
  City: string;
  State: string;
  JobDescription: string;
  JobPostTitle: string;
  PracticeArea: string
  length:string

}


const JobDetails: React.FC<{ }> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData } = useJobContext();
  const [jobDetails, setJobDetails] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=e_kWJNhagdSoWdoDoC_dwmYl2X-LpNbx91RDBWXUAVxMjpsQSmmt7r99kmzhukS9ccuWisz01gC7hjG7-pVB3-c7J7mjSbTcm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBHyk-764z3OSXfpHv_ICmO8Wb2zMieASf4Uetz0VM81calDyvifEPZEXN7Vqw2ypPurgu5dQp2l95ojsNBKmvtmiJj_Ks8krg&lib=MwqUBDoCocygC8J6JdyePRxDjpZDpCpHQ');
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("Context data:", jobFormData);
  // console.log("All Jobs array:", jobDetails);

  return (
    <JobDetailsWrapper>
      <Box sx={{
        display: 'flex',
        maxWidth: isMobile?'100%': '80%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-evenly',

      }}>
        <Box>
          <Typography variant='h1' sx={{
            textAlign: 'center',
            fontSize: '3rem',
            fontFamily: 'inherit'
          }}>
            Search Jobs
          </Typography>
          {/* <Typography variant='h5' sx={{
            textAlign: 'center',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}>
            Filters
          </Typography> */}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <YourComponent>
          </YourComponent>
        </Box>
        <Box sx={{
          margin:'20px 0',
          display:'flex',
          justifyContent:'space-around',
          alignItems:'center',
          gap:'20px',
          flexDirection:isMobile?"column":'row'
        }}>
          <CustomizedHook></CustomizedHook>
          <Typography padding={1}  fontSize={12} sx={{
            background:'black',
            border:'1px solid white',
            cursor:'pointer',
            padding:'5px'
          }} > Clear All Filers</Typography>
        </Box>
        <Divider sx={{ borderColor: '#19ff85', width:'100%', borderWidth:'1.5px'}} />
        <Box>
        {jobDetails && <AccordionUsage jobDetails={jobDetails} />}

        </Box>
      </Box>
    </JobDetailsWrapper>
  );
};

export default JobDetails;
