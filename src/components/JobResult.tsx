import  { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Divider, Typography, useMediaQuery, useTheme, CircularProgress } from '@mui/material';

// Define the Job interface
interface Job {
    JobID: number;
    FirmID: string;
    Firm: string;
    City: string;
    State: string;
    JobDescription: string;
    JobPostTitle: string;
    PracticeArea: string;
    length: string;
    // Field representing Job Post Description
}

// Define the AccordionUsageProps interface
interface AccordionUsageProps {
    jobDetails: Job[];
}

// Define the AccordionUsage component
export default function AccordionUsage({ jobDetails }: AccordionUsageProps) {
    console.log('jobDetails from results ',jobDetails.length)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const handleChange = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        if (jobDetails.length > 0) {
            setLoading(false);
        }
    }, [jobDetails]);

    return (
        <div style={{
            margin: '25px'
        }}>
            {loading ? (
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h1' textAlign='center' sx={{
                        fontFamily: 'inherit',
                        color: 'white',
                        fontSize: '40px',
                        margin: '25px 0'
                    }}>
                        Loading Jobs...
                    </Typography>
                    <CircularProgress color="success" />
                </Box>
            ) : (
                <>
                    <Typography variant='h1' textAlign='center' sx={{
                        fontFamily: 'inherit',
                        color: 'white',
                        fontSize: '50px',
                        margin: '25px 0'
                    }}>
                        {jobDetails.length} Results
                    </Typography>

                    {jobDetails.map((job, index) => (
                        <Box key={index}>
                            <Accordion
                                expanded={expandedIndex === index}
                                onChange={() => handleChange(index)}
                                sx={{ backgroundColor: 'black', color: 'white' }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-${index}-content`}
                                    id={`panel-${index}-header`}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                    }} >
                                        <Box sx={{
                                            display: 'flex',
                                            gap: '15px',
                                            alignItems: 'center',
                                            maxWidth: isMobile ? '40%' : '30%'
                                        }} >
                                            <Typography variant='h5' fontSize='xl'>
                                                GT
                                            </Typography>
                                            <Typography variant='h1' sx={{
                                                fontSize: isMobile ? '10px' : '14px'
                                            }} >
                                                {job.JobPostTitle}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='body1'
                                                sx={{
                                                    fontSize: isMobile ? '12px' : '16px'
                                                }}>
                                                {job.PracticeArea}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='body1'
                                                sx={{
                                                    fontSize: isMobile ? '12px' : '16px'
                                                }}>
                                                {job.City}, {job.State}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '50px'
                                    }}>
                                        <Typography>
                                            Details: {job.JobDescription}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            gap: '25px'
                                        }}>
                                            <Typography textAlign='center' margin={2} sx={{
                                                fontSize: '1rem'
                                            }}>
                                                Interested in discussing this opportunity? Have Chris, Attorney Refruiter &amp; President @ Holtz & Bernard
                                            </Typography>
                                            <Button
                                                sx={{
                                                    backgroundColor: '#19ff85',
                                                    color: 'black',
                                                    fontWeight: '900',
                                                    fontSize: '1rem',
                                                    padding: '5px 10px',
                                                    fontFamily: 'sans-serif',
                                                    width: '20vw',
                                                    lineHeight: '1.2',
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        color: '#19ff85',
                                                        border: '1px solid #19ff85',
                                                    },
                                                }}
                                            >
                                                I Want To Learn More
                                            </Button>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Divider sx={{ borderColor: 'white', }} />
                        </Box>
                    ))}
                </>
            )}
        </div>
    );
}
