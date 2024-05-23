import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery, useTheme } from "@mui/material";
import JobDetailsWrapper from "../Wrapper/JobDetailsWrapper";
const styles = {
  container: {
    backgroundColor: "#000",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    flexDirection: "column",
  },
  title: {
    color: "#fff",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    color: "#fff",
    fontSize: "16px",
  },
};

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
  DateUpdated: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  jobDetails: JobDetail[];
}

const CustomModal: React.FC<Props> = ({ open, onClose, jobDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cellNumber: "",
    personalEmail: "",
    State: "",
    City: "",
    Firm: "",
    PracticeArea: "",
    JobPostTitle: "",
    specialties: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

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
    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: "UTC",
    });

    try {
      setIsSubmitting(true);

      await emailjs.send(
        "service_h5aj7mu",
        "template_gk4th94",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          cellNumber: formData.cellNumber,
          personalEmail: formData.personalEmail,
          State: formData.State,
          City: formData.City,
          Firm: formData.Firm,
          jobTitle: formData.JobPostTitle,
          practiceArea: formData.PracticeArea,
          specialties: formData.specialties.join(", "),
          date: currentDate,
        },
        "s9CcYy5vclsSxAZhY"
      );

      console.log("Email sent successfully");
      setIsSubmitting(false);
      onClose();
      setShowThankYouModal(true);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              color: "black",
              borderRadius: "8px",
              padding: isMobile ? "40px" : "40px",
              display: "flex",
              minHeight: isMobile ? "80vh" : "50vh",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 9999,

              transform: "translate(-50%, -50%)",
              width: isMobile ? "90%" : "500px",
            }}
          >
            <IconButton
              aria-label="close"
              size="large"
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 16,
                color: "black",
              }}
            >
              <CloseIcon />
            </IconButton>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                paddingTop: isMobile ? "0" : "40px",
              }}
            >
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{
                  style: { color: "black", padding: "10px 0" },
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
                  style: { color: "black" },
                }}
                InputProps={{
                  style: { color: "black", padding: "10px 0" },
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
                  style: { color: "black" },
                }}
                InputProps={{
                  style: { color: "black", padding: "10px 0" },
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
                  style: { color: "black" },
                }}
                InputProps={{
                  style: { color: "black", padding: "10px 0" },
                }}
                value={formData.personalEmail}
                onChange={handleInputChange}
                required
              />{" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  margin: "25px 0",
                  background: "black",
                  width: isMobile ? "200px" : "300px",
                  fontSize: "20px",
                  padding: "10px 0",
                  marginTop: isMobile ? "50px" : "20px",
                  "&:hover": {
                    backgroundColor: "#19ff85",
                    color: "black",
                  },
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Box>
        </div>
      )}

      {showThankYouModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <JobDetailsWrapper>
            <Box sx={styles.container}>
              <Typography variant="h2" style={styles.title}>
                Thank You for your submission
              </Typography>
              <Typography style={styles.description}>
                {" "}
                An attorney placement professional will reach out to you shortly
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: "20px",
                  background: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#19ff85",
                    color: "black",
                  },
                }}
                onClick={() => setShowThankYouModal(false)}
              >
                Search Jobs
              </Button>
            </Box>
          </JobDetailsWrapper>
        </div>
      )}
    </>
  );
};

export default CustomModal;
