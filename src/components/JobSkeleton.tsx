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
          color: 'white',
          borderRadius: '10px',
          marginTop: '20px',
          marginBottom:isMobile?'40px': '30px',
        }}
        >
            <Skeleton variant="text" height={30}  sx={{ bgcolor: 'grey.900', padding:'10px'}}  />
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
              margin:isMobile?'.5% 2%': '1% 1%',
            }}
          >
            <Skeleton variant="rectangular" width={isMobile?50:80} height={isMobile?50:80}sx={{ bgcolor: 'grey.900' }}  />
            <Box sx={{ flex: 1 }} >
              <Skeleton width="40%" sx={{ bgcolor: 'grey.900' }}  />
              <Box sx={{ display: 'flex', gap: 6, marginTop: '10px' }}>
              <Skeleton width="10%" sx={{ bgcolor: 'grey.900' }} />
              <Skeleton width="50%" sx={{ bgcolor: 'grey.900' }} />

                </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default JobSkeleton;