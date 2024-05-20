import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';

const JobSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        color: 'white',
        padding: isMobile ? '2%' : '2% 10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          width: '200px',
          padding: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '10px',
          marginTop: '25px',
          marginBottom: '40px',
        }}
        >
            <Skeleton variant="text" height={30} sx={{ bgcolor: 'grey.900' }}  />
        </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          gap: 2,
          color: 'white',
          justifyContent: 'center',
          minWidth: isMobile ? '100%' : '1200px',
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: isMobile ? '2%' : '2% 10%',
              borderRadius: '10px',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="rectangular" width={80} height={80} sx={{ bgcolor: 'grey.900' }} animation="wave" />
            <Box sx={{ flex: 1 }} >
              <Skeleton width="50%" sx={{ bgcolor: 'grey.900' }} />
              <Skeleton sx={{ bgcolor: 'grey.900' }} />
              <Skeleton width="70%" sx={{ bgcolor: 'grey.900' }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default JobSkeleton;