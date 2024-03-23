import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, useTheme, useMediaQuery } from '@mui/material';
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
  State: string;
  City: string;
  practiceArea: string[];
  specialties: string[];
}

interface CustomizedDialogsProps {
  open: boolean;
  handleClose: () => void;
  initialSpecialties?: string[]; // Optional prop to receive specialties from parent
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({
  open,
  handleClose,
  initialSpecialties,
}) => {
  console.log(initialSpecialties)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { jobFormData, setJobFormData } = useJobContext();
  const [specialties, setSpecialties] = useState<string[]>(
    initialSpecialties || jobFormData.specialties // Use initialSpecialties if provided, otherwise default to jobFormData.specialties
  );
  const initialSpecialtiesRef = useRef(initialSpecialties); // Store initialSpecialties to prevent unnecessary re-renders
  const [steps] = useState<Step[]>(stepsData.steps);
  useEffect(() => {
    if (initialSpecialtiesRef.current !== initialSpecialties) {
      // Update specialties only if initialSpecialties changes
      setSpecialties(initialSpecialties || []);
      initialSpecialtiesRef.current = initialSpecialties;
    }

  }, [initialSpecialties]);

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

  };

  const handleSave = () => {
    // Update only the specialties property of jobFormData
    setJobFormData({
      ...jobFormData,
      specialties,
    });
    handleClose();
  };
  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullScreen={true} sx={
        {
          padding: isMobile ? '0' : ' 2% 8% '
        }
      }>
        <DialogTitle textAlign='center' sx={{
          m: 0, pt: 4,
          background: 'black',
          color: 'white',
          fontSize:isMobile?'18px': '25px'
        }} id="customized-dialog-title">
          Select the types of cases you mostly work on
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top:isMobile? 0:8,
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
              <Box sx={{
                display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', gap: '5px', marginLeft: '10px'
              }}>
                {Array.isArray(steps[3].options) && steps[3].options.map((option, optionIndex) => (
                  <Chip
                    key={optionIndex}
                    label={option.toUpperCase()}
                    onClick={() => handleChange(steps[3].name as FormDataKeys, option)}
                    sx={{
                      border: '1px solid white',
                      backgroundColor: specialties.includes(option) ? 'white' : 'black',
                      color: specialties.includes(option) ? 'black' : 'white',
                      margin: '3px',
                      borderRadius: '0px',
                      fontSize: '12px',
                      fontFamily: 'inherit',
                      padding: '5px !important',
                      '&:hover': {
                        backgroundColor: specialties.includes(option) ? 'white' : '#444',
                        color: specialties.includes(option) ? 'black' : 'white',
                      },
                      '&:focus': {
                        backgroundColor: specialties.includes(option) ? 'white' : '#666',
                        color: specialties.includes(option) ? 'black' : 'white',
                        boxShadow: '0 0 0 2px #ffffff',
                        outline: 'none',
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions color='success' sx={{
          background: 'black',
          color: 'white  ',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'

        }}>
          <Button autoFocus onClick={handleSave} sx={{
            backgroundColor: '#19ff85',
            color: 'black',
            fontWeight: '900',
            fontSize: isMobile?'1.5rem':'2rem',
            padding:"5px 100px",
            fontFamily: 'sans-serif',
            width: isMobile?'50vw': '20vw',
            lineHeight: '1.2',
            '&:hover': {
              backgroundColor: 'black',
              color: '#19ff85',
              border: '1px solid #19ff85',
            },

          }}>
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default CustomizedDialogs;
