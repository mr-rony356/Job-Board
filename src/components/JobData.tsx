import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface JobDetailsProps {
  jobId: string; // Assuming jobId is used to fetch job details via API
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobDetails) {
    return <p>Job details not found.</p>;
  }

  return (
      <Box>
        <Typography variant="h1">{jobDetails.JobPostTitle}</Typography>
        <Typography variant="h5">Firm: {jobDetails.Firm}</Typography>
        <Typography variant="body1">Job Description: {jobDetails.JobPostDescription}</Typography>
        <Typography variant="body1">Location: {jobDetails.City}, {jobDetails.State}</Typography>
        <Typography variant="body1">Practice Area: {jobDetails.practiceArea}</Typography>
        {/* Render other fields as needed */}
      </Box>
  );
};

export default JobDetails;
