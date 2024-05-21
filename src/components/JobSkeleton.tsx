import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';

const JobSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile?'96%':'80%',
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
          padding: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '10px',
          marginTop: '20px',
          marginBottom:isMobile?'40px': '20px',
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
              gap: isMobile?4:7,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: isMobile ? '2%' : '2% 3%',
              borderRadius: '10px',
              alignItems: 'center',
              margin:isMobile?'1% 2%': '1% 1%',
            }}
          >
            <Skeleton variant="rectangular" width={isMobile?40:80} height={isMobile?40:80}sx={{ bgcolor: 'grey.900' }} animation="wave" />
            <Box sx={{ flex: 1 }} >
              <Skeleton width="40%" sx={{ bgcolor: 'grey.900' }} animation="wave" />
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