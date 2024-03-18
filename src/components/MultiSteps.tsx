import { useState } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';
import stepsData from './steps.json'; // Import the JSON file directly
import {  useMediaQuery, useTheme } from '@mui/material'



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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile or tablet

  const [step, setStep] = useState(1);
  const [state, setState] = useState('');
  const [formData, setFormData] = useState<FormData>({
    state: '',
    city: '',
    practiceArea: '',
    specialties: '',
    jdYear: '',
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
    // Implement logic to show qualified opportunities
  };

  const renderOptions = (stepItem: Step) => {
    const { question, options } = stepItem;

    return (
      <Box>
        <Typography variant="h2" style={{
          color: 'white',
          marginBottom: '50px',
          fontFamily: 'Times New Roman',
          textAlign: 'center',
          fontSize:isMobile?'2.2rem':'3rem',
          letterSpacing:'5px'
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
                  fontSize: '16px',
                  fontFamily: "Times New Roman",
                  padding:'0 15px',
                  textTransform:'capitalize',
                  letterSpacing:'3px'
                }}
              >
                {option}
              </Button>
            ))
            : Object.entries(options).map(([key, value]) => {

              if (key === state) {
                return (

                  <Box key={key} sx={{ display: 'flex', alignItems: 'center',flexWrap:'wrap', justifyContent:'center'}}>
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
                          fontSize: '16px',
                          fontFamily: "Times New Roman",
                          padding:'0 15px',
                          textTransform:'capitalize',
                          letterSpacing:'3px'
        

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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: '20px 5px' }}>
              <Typography variant="h2" style={{ color: step === index + 1 ? '#4caf50' : 'white', fontWeight:'500', fontSize: isMobile?'10px':'18px',letterSpacing:'3px' ,fontFamily: 'Times New Roman' }}>
                {stepItem.label +'>' }
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Render steps */}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding:isMobile?'20px 0px':'20px 5px' }}>
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
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '100%', margin: 'auto', background: 'transparent', height:isMobile?'100vh' :'80vh', display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'center' }}>
      {renderStep()}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button disabled={state === ""}
            onClick={step < steps.length ? handleNext : handleSubmit}
            sx={{
              backgroundColor: '#19ff85',
              color: 'black',
              fontWeight:'900',
              fontSize: '25px',
              padding: '5px 10px',
              fontFamily:'Times New Roman',
              width:isMobile?'80vw':'20vw',
              '&:hover': {
                backgroundColor: 'black',
                color: '#19ff85',
                border: '1px solid #19ff85',
              },
            }}
          >
            {step < steps.length ? 'Next' : 'Show Qualified Opportunities'}
          </Button>

          {
            step != 1 &&
            <Button disabled={step === 1} onClick={handlePrevious} sx={{
              fontSize: '12px',  color: '#19ff85', fontWeight:'bold', padding: '10px', '&:hover': {
                border: '1px solid #19ff85 '
              }
            }}>
              Go Back
            </Button>
          }

        </Box>
      </Box>
    </Paper>
  );
};

export default JobSearchForm;
