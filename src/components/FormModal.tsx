import React from 'react';
import { Dialog, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
}

const JobApplicationModal: React.FC<Props> = ({ open, onClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj: any = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log(formDataObj);
    // You can handle form submission here, e.g., send data to server
    onClose(); // Close the dialog after form submission
  };

  return (
    <Dialog
    fullScreen={false}
      open={open}
      onClose={onClose}
      aria-labelledby="job-application-dialog"
      aria-describedby="job-application-form"
      maxWidth='md'
      PaperProps={{
        sx: {
          bgcolor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
          backdropFilter: 'blur(8px)', // Blur effect
        },
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
          color: 'white',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            required
          />
          <TextField
            id="cellNumber"
            name="cellNumber"
            label="Cell Number"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            required
          />
          <TextField
            id="personalEmail"
            name="personalEmail"
            label="Personal Email"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default JobApplicationModal;
