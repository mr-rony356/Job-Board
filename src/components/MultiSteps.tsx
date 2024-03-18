import React, { useState } from 'react';
import { Button, Paper, Typography, Box, Chip } from '@mui/material';
import stepsData from './steps.json'; // Import the JSON file directly

interface Step {
  label: string;
  question: string;
  options: string[] | { [key: string]: string[] };
}

const JobSearchForm = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    // Implement logic to show qualified opportunities
  };

  const renderOptions = (stepItem: Step) => {
    const { question, options } = stepItem;
  
    return (
      <>
        <Typography variant="h2" style={{ color: 'white', marginBottom: '50px', fontFamily: 'Times New Roman',textAlign:'center' }}>
          {question}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.isArray(options)
            ? options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleChange(stepItem.label.toLowerCase(), option)}
                  variant="outlined"
                  style={{
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: '2px',
                    margin: '5px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    borderRadius:'0px',
                    fontSize:'16px',
                    fontFamily: "Times New Roman",
                  }}
                >
                  {option}
                </Button>
              ))
            : Object.entries(options).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                    {key}
                  </Typography>
                  {value.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleChange(stepItem.label.toLowerCase(), option)}
                      variant="outlined"
                      style={{
                        color: 'white',
                        borderColor: 'white',
                        borderWidth: '4px',
                        margin: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontFamily: 'Arial',
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
              ))}
        </Box>
      </>
    );
  };
  
  const renderStep = () => {
    if (steps.length === 0) {
      return <Typography>Loading steps...</Typography>;
    }

    return (
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column',marginBottom:'50px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: '20px 5px' }}>
              <Typography variant="h2" style={{ color: step === index + 1 ? '#4caf50' : 'white', fontSize: '18px' ,fontFamily:'Times New Roman'}}>
                {stepItem.label}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Render steps */}
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white' }}>
          {steps.map((stepItem, index) => (
            <Box key={index} style={{ padding: '20px 5px' }}>
              {step === index + 1 && (
                <Typography sx={{ color: 'white' }}>
                  {renderOptions(stepItem)}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '100%', margin: 'auto', background: 'transparent', height: '80vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      {renderStep()}
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Button
            onClick={step < steps.length ? handleNext : handleSubmit}
            sx={{
              backgroundColor: '#19ff85',
              color: 'black',
              fontWeight: '900',
              fontSize: '25px',
              padding: '10px 100px',
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
            step !== 1 &&
            <Button disabled={step === 1} onClick={handlePrevious} sx={{ fontSize: '10px', background: 'black', color: 'white', padding: '10px', '&:hover': {
              backgroundColor: '#19ff85',
              border: '1px solid #19ff85 '
            } }}>
              Go Back
            </Button>
          }

        </Box>
      </Box>
    </Paper>
  );
};

export default JobSearchForm;
