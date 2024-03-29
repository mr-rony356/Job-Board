import React from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const Joblisting: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile or tablet

  return (
    <Box
      sx={{
        padding: theme.spacing(4, 0),
        textAlign: 'center',
        color: 'white',
        minHeight: '70vh', // Set to take 80% of screen height
        overflowY: 'auto', // Add vertical scroll if content overflows
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center', // Space evenly between header, content, and footer
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1" sx={{
          fontSize: isMobile ? '1.8rem' : '3rem', // Adjust font size for mobile
          marginBottom: theme.spacing(2),
          fontFamily: 'inherit',
          color: theme.palette.primary.contrastText,
          padding:isMobile?'0':'10',
          letterSpacing:'5px',
          fontWeight:'500'
        }}>
          See Which Firms Are Hiring Attorneys Now
        </Typography>
        <Typography variant="h5" sx={{
          fontSize: isMobile ? '.9rem' : '1.3rem', // Adjust font size for mobile
          marginBottom: theme.spacing(4),
          fontFamily: 'Roboto',
          color: theme.palette.primary.contrastText,
          fontWeight: '300'

        }}>
          Filter the best attorney jobs for you by location, practice area, subject matter, firm size, and JD year.
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{
        marginTop:'50px'

      }}>
        <Typography variant="h5" sx={{
          fontSize: isMobile?'1.5rem ': '2rem',
          marginBottom: theme.spacing(2),
          fontFamily: 'inherit',
          color: theme.palette.primary.contrastText,
          letterSpacing:'3px'

        }}>
          Are you an associate?
        </Typography>
        <Link to='/multi'>
          <Button variant="contained"
            sx={{
              backgroundColor: '#19ff85',
              color: 'black',
              fontWeight: '900',
              fontSize: isMobile?'2rem':'3rem',
              padding: isMobile ? '10px 120px' : '10px 150px',
              fontFamily:'sans-serif',
              border: '1px solid #19ff85 ',
              lineHeight:'1',

              '&:hover': {
                backgroundColor: 'black',
                color: '#19ff85',
              }
            }}
          >
            YES
          </Button>
        </Link>
        <Typography variant='h5'
          sx={{
            fontSize:isMobile?'12px':'14px',
            textAlign:'center',
            marginBottom:'20px',
            fontFamily:'Roboto',
            fontWeight:'300',
             margin: isMobile ? '20px 0 50px 0' : '50px 0'

          }} >
          Hello, Chris Holtzhauer here, The Attorney Recruiter and President at Holtz & Bernard. I created this tool so you can see
          virtually every attorney opportunity
          in the market confidentially and quickly. Have a quick browse. You won’t be asked to provide your contact information to
          view. We’ll only ask if you’d like to discuss an opportunity you see. If you find something of interest or wish to know more,
          feel free to let me know. You will not be added to a marketing list.

        </Typography>
      </Container>
    </Box>
  );
};

export default Joblisting;
