import { useState } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';
import stepsData from '../components/steps.json'; // Import the JSON file directly
import { useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';
import { useJobContext } from '../context/FormDataContext';
import MainSectionWrapper from '../Wrapper/MainSectionWrapper';



interface Step {
  label: string;
  question: string;
  options: string[] | { [key: string]: string[] };
}
interface FormData {
  state: string;
  city: string;
  practiceArea: string;
  specialties: string;
  jdYear: string;
  clicked?: string; // Define clicked property as optional
}

const JobSearchForm = () => {
  const { jobFormData, setJobFormData } = useJobContext();

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile or tablet

  const [step, setStep] = useState(1);
  const [state, setState] = useState('');
  const [formData, setFormData] = useState<FormData>({
    state: jobFormData.state,
    city: jobFormData.city,
    practiceArea: jobFormData.practiceArea,
    specialties: jobFormData.specialties,
    jdYear: jobFormData.jdYear,
  });
  const [steps] = useState<Step[]>(stepsData.steps); // Use directly imported data

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
      clicked: value, // Add the clicked value to the state
    });
    if (
      step === 1
    ) {
      setState({ [field]: value }.state);

    }

    console.log({ [field]: value }.state)
  };

  const handleNext = () => {
    
    if (state === "Remote" && step === 1) {
      setStep(step + 2); // Skip to the step after the city step
    } else {
      setStep(step + 1);
    }
    if (state === '') {
      setStep(step); // Skip to the step after the city step
      alert('Please Select One')
    }
  };
  const handlePrevious = () => {
    if (state === "Remote" && step === 3) {
      setStep(step - 2); // Skip to the step after the city step
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    setJobFormData(formData)
    // Implement logic to show qualified opportunities
  };

  const renderOptions = (stepItem: Step) => {
    const { question, options } = stepItem;

    return (
      <Box>
        <Typography variant="h2" style={{
          color: 'white',
          marginBottom: '50px',
          fontFamily: 'inherit',
          textAlign: 'center',
          fontSize: isMobile ? '2.2rem' : '3rem',
          letterSpacing: '5px'
        }}>
          {question}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.isArray(options)
            ? options.map((option) => (
              <Button
                key={option}
                onClick={() => handleChange(stepItem.label.toLowerCase(), option)}
                variant="outlined"
                className={formData.clicked === option ? 'clicked' : ''}
                style={{
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: '2px',
                  margin: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  borderRadius: '0px',
                  fontSize: isMobile ? '16px ' : '18px',
                  fontFamily: "inherit",
                  padding: '0 15px',
                  textTransform: 'capitalize',
                  letterSpacing: '3px'
                }}
              >
                {option}
              </Button>
            ))
            : Object.entries(options).map(([key, value]) => {

              if (key === state) {
                return (

                  <Box key={key} sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {value.map((option) => (
                      <Button
                        key={option}
                        onClick={() => handleChange(stepItem.label.toLowerCase(), option)}
                        variant="outlined"
                        className={formData.clicked === option ? 'clicked' : ''}

                        style={{
                          color: 'white',
                          borderColor: 'white',
                          borderWidth: '2px',
                          margin: '5px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          borderRadius: '0px',
                          fontSize: isMobile ? '16px ' : '18px',
                          fontFamily: "inherit",
                          padding: '0 15px',
                          textTransform: 'capitalize',
                          letterSpacing: '3px'


                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Box>
                )
              }

            })}
        </Box>
      </Box>
    );
  };

  const renderStep = () => {
    if (steps.length === 0) {
      return <Typography>Loading steps...</Typography>;
    }

    return (
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', marginBottom: '50px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: '20px 5px' }}>
              <Typography variant="h2" style={{ color: step === index + 1 ? '#4caf50' : 'white', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', letterSpacing: '2px', }}>
                {stepItem.label + ' >'}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Render steps */}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: isMobile ? '20px 0px' : '20px 5px' }}>
              {step === index + 1 && (
                <Box sx={{ color: 'white' }}>
                  {renderOptions(stepItem)}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <MainSectionWrapper>


    <Paper elevation={3} style={{
      padding: isMobile ? '5px':'20px',
      maxWidth: '100%',
      margin: 'auto',
      background:'none',
      display: 'flex',
      justifyContent: isMobile ? 'start' : 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {renderStep()}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {step < steps.length ?
            (
              <Button 
                onClick={handleNext}
                sx={{
                  backgroundColor: '#19ff85',
                  color: 'black',
                  fontWeight: '900',
                  fontSize: '2.5rem',
                  padding: '5px 10px',
                  fontFamily: 'sans-serif',
                  width: isMobile ? '80vw' : '20vw',
                  lineHeight: '1.2',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: '#19ff85',
                    border: '1px solid #19ff85',
                  },
                }}
              >
                Next
              </Button>

            ) :
            (
              <Link to='/job-details'>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: '#19ff85',
                    color: 'black',
                    fontWeight: '900',
                    fontSize: '1.5rem',
                    padding: '5px 10px',
                    fontFamily: 'sans-serif',
                    width: isMobile ? '80vw' : '20vw',
                    lineHeight: '1.2',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: '#19ff85',
                      border: '1px solid #19ff85',
                    },
                  }}
                >
                  Show Results
                </Button>
              </Link>

            )


          }

          {
            step != 1 &&
            <Button disabled={step === 1} onClick={handlePrevious} sx={{
              fontSize: '12px', color: '#19ff85', fontWeight: 'bold', padding: '10px', '&:hover': {
                border: '1px solid #19ff85 '
              }
            }}>
              Go Back
            </Button>
          }

        </Box>
      </Box>
    </Paper>
    </MainSectionWrapper>


  );
};

export default JobSearchForm;
