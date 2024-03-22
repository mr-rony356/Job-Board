import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Chip } from '@mui/material';
import stepsData from '../components/steps.json';
import { useJobContext } from '../context/FormDataContext';
import { produce } from 'immer';
type FormDataKeys = keyof FormData;

interface Step {
  label: string;
  name: string;
  question: string;
  options: string[] | { [key: string]: string[] };
}

interface FormData {
  state: string;
  city: string;
  practiceArea: string[];
  specialties: string[];
}

interface CustomizedDialogsProps {
  open: boolean;
  handleClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({ open, handleClose }) => {
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData, setJobFormData } = useJobContext();
  const [specialties, setSpecialties] = useState<string[]>(jobFormData.specialties);
  const [formData, setFormData] = useState<FormData>({
    state: jobFormData.state,
    city: jobFormData.city,
    practiceArea: jobFormData['practiceArea'],
    specialties: jobFormData['specialties'],
  });

  const [steps] = useState<Step[]>(stepsData.steps);

  useEffect(() => {
    console.log('calleddddddddddddddd', );
    setJobFormData({
      ...formData,
      specialties: specialties,
    });
  }, [specialties]);

  const handleChange = (field: keyof FormData, value: string) => {
    console.log(field)

    setSpecialties(
      produce(specialties, (draftSpecialties) => {
        if (draftSpecialties.includes(value)) {
          // If the value exists, remove it
          const index = draftSpecialties.indexOf(value);
          draftSpecialties.splice(index, 1);
        } else {
          // If the value doesn't exist, add it
          draftSpecialties.push(value);
        }
      })
    );
  
    setFormData({
      ...jobFormData,
      specialties, // Use the updated specialties directly
    });
  };
  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
        <DialogTitle sx={{
          m: 0, p: 1,
          background: 'black',
          color: 'white'
        }} id="customized-dialog-title">
          Select What types of cases do you mostly work on
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{
          background: 'black'

        }} dividers>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'black',
            backgroundSize: 'cover'

          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'
            }}>
              <Typography variant="h5" style={{
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '1.5rem',
                letterSpacing: '2px',
                margin: '20px 0'
              }}>
                {steps[3].label}
              </Typography>
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', gap: '5px', marginLeft: '10px'
              }}>
                {Array.isArray(steps[3].options)
                  ? steps[3].options.map((option, optionIndex) => (
                    <Chip
                      key={optionIndex}
                      label={option.toUpperCase()}
                      onClick={() => handleChange(steps[3].name as FormDataKeys, option)}

                      sx={{
                        border: '1px solid white',
                        backgroundColor: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'white' : 'black',
                        color: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'black' : 'white',
                        margin: '3px',
                        borderRadius: '0px',
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        padding: '5px !important',

                        '&:hover': {
                          backgroundColor: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'white' : '#444', // Change background color on hover
                          color: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on hover
                        },
                        '&:focus': {
                          backgroundColor: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'white' : '#666', // Change background color on focus
                          color: jobFormData[steps[3].name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on focus
                          boxShadow: '0 0 0 2px #ffffff', // Add box shadow on focus
                          outline: 'none', // Remove default focus outline
                        }
                      }}
                    />
                  ))
                  : ''
                }
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{
          background: 'black',
          color: 'white'
        }}>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default CustomizedDialogs;
