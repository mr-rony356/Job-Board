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
          padding: '15px 0',
          background: 'gray',
          color: 'white',
          borderRadius: '10px',
          marginBottom: '50px',
        }}
        >
            <Skeleton variant="text" height={10} />
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
              backgroundColor: 'gray',
              color: 'white',
              padding: isMobile ? '2%' : '2% 10%',
              borderRadius: '10px',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="rectangular" width={80} height={80} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="50%" />
              <Skeleton />
              <Skeleton width="70%" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default JobSkeleton;