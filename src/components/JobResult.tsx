import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import JobApplicationModal from './FormModal';

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
    Cases: string[];

    // Field representing Job Post Description
}

// Define the AccordionUsageProps interface
interface AccordionUsageProps {
    jobDetails: Job[];
}

// Define the AccordionUsage component
export default function AccordionUsage({ jobDetails }: AccordionUsageProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleChange = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };
    return (
        <div style={{
            margin: '25px'
        }}>
                <>

                    <Typography variant='h1' textAlign='center' sx={{
                        fontFamily: 'inherit',
                        color: 'white',
                        fontSize: '50px',
                        margin: '25px 0'
                    }}>
                        {jobDetails.length > 0 ?

                            `${jobDetails.length} Results`
                            :
                            'No Jobs Found '


                        }
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
                                        alignItems: 'center',
                                        width: '100%',
                                        gap:isMobile?'30px':'50px'
                                    }} >
                                        <Box sx={{
                                            display: 'flex',
                                            gap: '15px',
                                            alignItems: 'center',
                                        }} >
                                            <Typography variant='h5' sx={{
                                                fontSize:isMobile?'25px':'35px'
                                            }} >
                                                GT
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Box>
                                            <Typography variant='h1' sx={{
                                                fontSize: isMobile ? '12px' : '18px',
                                                margin:'10px 0',
                                                fontFamily:'inherit'
                                            }} >
                                                {job.JobPostTitle}
                                            </Typography>

                                            </Box>
                                            <Box sx={{
                                                display:'flex',
                                                gap:isMobile?'50px':'150px'
                                            }}>
                                            <Typography variant='body1'
                                                sx={{
                                                    fontSize: isMobile ? '12px' : '18px'
                                                }}>
                                                {job.PracticeArea}
                                            </Typography>
                                            <Typography variant='body1'
                                                sx={{
                                                    fontSize: isMobile ? '10px' : '14px'
                                                }}>
                                               {job.City} , {job.State} 
                                            </Typography>

                                            </Box>




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
                                        <Typography textAlign='justify'>
                                            {job.JobDescription}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            gap: '25px'
                                        }}>
                                            <Typography textAlign='center' sx={{
                                                fontSize: '1rem'
                                            }}>
                                                Interested in discussing this opportunity? Have Chris, Attorney Refruiter &amp; President @ Holtz & Bernard Call Me About This
                                            </Typography>
                                            <>
                                                <Button
                                                    onClick={handleModalOpen}
                                                    sx={{
                                                        backgroundColor: '#19ff85',
                                                        color: 'black',
                                                        fontWeight: '900',
                                                        fontSize:isMobile?'1rem': '1.5rem',
                                                        padding: '20px 10px',
                                                        fontFamily: 'sans-serif',
                                                        width: isMobile ? '90vw' : '40vw',
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
                                                <JobApplicationModal open={modalOpen} jobDetails={jobDetails} onClose={handleModalClose} />
                                            </>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Divider sx={{ borderColor: 'white', }} />
                        </Box>
                    ))}
                </>
        </div>
    );
}
