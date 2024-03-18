import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Joblisting: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: theme.spacing(8, 0),
        textAlign: 'center',
        color: 'white',
        minHeight: '70vh', // Set to take 80% of screen height
        overflowY: 'auto', // Add vertical scroll if content overflows
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly', // Space evenly between header, content, and footer
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1" sx={{
          fontSize: '3rem',
          marginBottom: theme.spacing(2),
          fontFamily: 'inherit',
          color: theme.palette.primary.contrastText,
        }}>
          See Which Firms Are Hiring Attorneys Now?
        </Typography>
        <Typography variant="h3" sx={{
          fontSize: '1.5rem',
          marginBottom: theme.spacing(4),
          fontFamily: 'inherit',
          color: theme.palette.primary.contrastText,
        }}>
          Filter the best attorney jobs for you by location, practice area, subject matter, firm size, and JD year.
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{
          fontSize: '2rem',
          marginBottom: theme.spacing(2),
          fontFamily: 'inherit',
          color: theme.palette.primary.contrastText,
        }}>
          Are you an associate?
        </Typography>
        <Link to='/multi'>
        <Button variant="contained"
          sx={{
            backgroundColor: '#19ff85',
            color: 'black',
            fontWeight: '600',
            fontSize: '30px',
            padding: '10px 150px',
            fontFamily:'inherit',
            '&:hover': {
              backgroundColor: 'black',
              color: '#4caf50',
              border:'1px solid #19ff85 '
            }
          }}
        >
           YES
        </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Joblisting;
