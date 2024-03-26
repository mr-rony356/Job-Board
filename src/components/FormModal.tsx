import React, { useState, useEffect } from 'react';
import { Dialog, TextField, Button, Box } from '@mui/material';
import emailjs from 'emailjs-com';

interface JobDetail {
  JobID: number;
  FirmID: string;
  Firm: string;
  City: string;
  State: string;
  JobDescription: string;
  JobPostTitle: string;
  PracticeArea: string;
  Cases: string[];

}

interface Props {
  open: boolean;
  onClose: () => void;
  jobDetails: JobDetail[];
}

const JobApplicationModal: React.FC<Props> = ({ open, onClose, jobDetails }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellNumber: '',
    personalEmail: '',
    State: '',
    City: '',
    Firm: '',
    PracticeArea:'',
    JobPostTitle:'',
    specialties: [] as string[],

  });

  useEffect(() => {
    // Set City and State from the first job detail (assuming it's available)
    if (jobDetails.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        City: jobDetails[0].City,
        State: jobDetails[0].State,
        JobPostTitle: jobDetails[0].JobPostTitle,
        Firm: jobDetails[0].Firm,
        PracticeArea: jobDetails[0].PracticeArea,
        specialties: jobDetails[0].Cases,
      }));
    }
  }, [jobDetails]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });

    try {
      await emailjs.send('service_e8j9s9a', 'template_vk7obtx', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cellNumber: formData.cellNumber,
        personalEmail: formData.personalEmail,
        State: formData.State,
        City: formData.City,
        Firm: formData.Firm,
        jobTitle: formData.JobPostTitle,
        practiceArea: formData.PracticeArea,
        specialties: formData.specialties.join(', '),
        date:currentDate
      }, 'Yt0_FXKk8p02kuzC4');

      console.log('Email sent successfully');
      onClose();
       // Redirect to /thankyou page
    window.location.href = '/thank-you';
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error sending email:', error);
    }
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
          bgcolor: 'white',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: 'white',
          color: 'black',
          borderRadius: '8px',
          padding: '20px 20px',
          margin:'50px 0',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <form onSubmit={handleSubmit} style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column',
          gap:'10px',
          width:'70%',
          position:'relative'
        }}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'black' },
            }}
            InputProps={{
              style: { color: 'black', padding:'10px 0' },
            }}
            value={formData.firstName}
            onChange={handleInputChange}
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
              style: { color: 'black' },
            }}
            InputProps={{
              style: { color: 'black', padding:'10px 0' },
            }}
            value={formData.lastName}
            onChange={handleInputChange}
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
              style: { color: 'black' },
            }}
            InputProps={{
              style: { color: 'black', padding:'10px 0' },
            }}
            value={formData.cellNumber}
            onChange={handleInputChange}
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
              style: { color: 'black' },
            }}
            InputProps={{
              style: { color: 'black', padding:'10px 0' },
            }}
            value={formData.personalEmail}
            onChange={handleInputChange}
            required
          />
          {/* Other form fields */}
          <Button type="submit" variant="contained" color="primary" sx={{
            margin:'25px 0',
            background:'black',
            width:'300px',
            fontSize:'20px'
,            padding:'15px 0',
            '&:hover': {
              backgroundColor: '#19ff85',
              color: 'black',
            }
          }}>
            Submit
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default JobApplicationModal;
