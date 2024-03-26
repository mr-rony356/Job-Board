import { Box, Typography } from '@mui/material';
import JobDetailsWrapper from '../Wrapper/JobDetailsWrapper';

const styles = {
  container: {
    backgroundColor: '#000',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    color: '#fff',
    fontSize: '16px',
  },
};

const ThankYou = () => {
  return (
    <JobDetailsWrapper>
      <Box sx={styles.container

      }>
        <Typography variant='h2' style={styles.title}>Thank You for your
          submission</Typography>
        <Typography style={styles.description}> An attorney placement professional will reach out to you shortly</Typography>
      </Box>
    </JobDetailsWrapper>
  );
};

export default ThankYou;
