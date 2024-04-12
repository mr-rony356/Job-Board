import { useState } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';
import stepsData from '../components/steps.json';
import { useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MainSectionWrapper from '../Wrapper/MainSectionWrapper';
import { useJobContext } from '../context/FormDataContext';
type FormDataKeys = keyof FormData;
interface Step {
  label: string;
  name: string;
  question: string;
  options: string[] | { [key: string]: string[] };
}

interface FormData {
  State: string;
  City: string;
  practiceArea: string[];
  specialties: string[];
  clicked?: string;
}

const JobSearchForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData, setJobFormData } = useJobContext();

  const [step, setStep] = useState(1);
  const [State, setState] = useState('');
  const [formData, setFormData] = useState<FormData>({
    State: jobFormData.State ? jobFormData.State[0] : '', // Assuming State is always an array with one element
    City: jobFormData.City ? jobFormData.City[0] : '', // Assuming City is always an array with one element
    practiceArea: [],
    specialties: [],
  });
  const [steps] = useState<Step[]>(stepsData.steps);

  const handleChange = (field: string, value: string) => {
    let updatedValue: string[] = [];

    if (field === 'practiceArea' || field === 'specialties') {
      updatedValue = formData[field].includes(value)
        ? formData[field].filter((option) => option !== value)
        : [...formData[field], value];
    } else {
      updatedValue = [value];
    }

    setFormData({
      ...formData,
      [field]: updatedValue
    });

    if (step === 1) {
      setState(updatedValue.length > 0 ? updatedValue[0] : '');
    }
  };

  const handleNext = () => {
    if (State === 'Remote' && step === 1) {
      setStep(step + 2);
    } else {
      setStep(step + 1);
    }

    if (State === '') {
      setStep(step);
      alert('Please Select One');
    }
  };

  const handlePrevious = () => {
    if (State === 'Remote' && step === 3) {
      setStep(step - 2);
    } else {
      setStep(step - 1);
    }
  };
  const handleSubmit = () => {
    // Converting City and State to strings before setting formData
    const updatedFormData = {
      ...formData,
      City: formData.City.toString(), // Convert to string
      State: formData.State.toString(), // Convert to string
    };

    setJobFormData(updatedFormData);
    // Implement logic to show qualified opportunities

  };
  const renderOptions = (stepItem: Step) => {
    const { question, options } = stepItem;

    return (
      <Box>
        <Typography variant="h2" style={{ color: 'white', marginBottom: '50px', fontFamily: 'inherit', textAlign: 'center', fontSize: isMobile ? '2.2rem' : '3rem', letterSpacing: '5px' }}>
          {question}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.isArray(options)
            ? options.map((option) => (
              <Button
                key={option}
                onClick={() => handleChange(stepItem.name, option)}
                variant="outlined"
                className={formData[stepItem.name as FormDataKeys]?.includes(option) ? 'clicked' : ''}
                style={{ color: 'white', borderColor: 'white', borderWidth: '2px', margin: '5px', cursor: 'pointer', fontWeight: '500', borderRadius: '0px', fontSize: isMobile ? '16px' : '18px', fontFamily: 'inherit', padding: '0 15px', textTransform: 'capitalize', letterSpacing: '3px' }}>
                {option.toUpperCase()}
              </Button>
            ))
            : Object.entries(options).map(([key, value]) => {
              if (key === State) {
                return (
                  <Box key={key} sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {value.map((option) => (
                      <Button
                        key={option}
                        onClick={() => handleChange(stepItem.name, option)}
                        variant="outlined"
                        className={formData[stepItem.name as FormDataKeys]?.includes(option) ? 'clicked' : ''}
                        style={{ color: 'white', borderColor: 'white', borderWidth: '2px', margin: '5px', cursor: 'pointer', fontWeight: '500', borderRadius: '0px', fontSize: isMobile ? '16px' : '18px', fontFamily: 'inherit', padding: '0 15px', textTransform: 'capitalize', letterSpacing: '3px' }}>
                        {option.toUpperCase()}
                      </Button>
                    ))}
                  </Box>
                );
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
              <Typography variant="h2" style={{ color: step === index + 1 ? '#4caf50' : 'white', fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', letterSpacing: '2px' }}>
                {stepItem.label}{index !== steps.length - 1 ? ' >' : ''}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: isMobile ? '20px 0px' : '20px 5px' }}>
              {step === index + 1 && <Box sx={{ color: 'white' }}>{renderOptions(stepItem)}</Box>}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
  return (
    <MainSectionWrapper>


      <Paper elevation={3} style={{
        padding: isMobile ? '5px' : '20px',
        maxWidth: '100%',
        margin: 'auto',
        background: 'none',
        display: 'flex',
        justifyContent: isMobile ? 'start' : 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {renderStep()}
        <Box>
          <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2,
            ...(step === 4 ? {
              position: 'fixed',
              bottom: '0', overflow: 'hidden',
              background: 'black', width: '100%',
              left:'0',
              justifyContent:'center',
              alignItems:'center',
              padding:'20px 0'
            } : {})
          }}>
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
