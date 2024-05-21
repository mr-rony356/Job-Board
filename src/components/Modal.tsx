import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useJobContext } from "../context/FormDataContext";
import ChipButton from "./ChipButton";

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
  [key: string]: any; // Add this line
}
interface CustomizedDialogsProps {
  open: boolean;
  handleClose: () => void;
  step: Step[];
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({
  open,
  handleClose,
  step,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { jobFormData, setJobFormData } = useJobContext();
  const [formData, setFormData] = useState<FormData>({
    State: jobFormData.State,
    City: jobFormData.City,
    practiceArea: jobFormData["practiceArea"],
    specialties: jobFormData["specialties"],
  });

  useEffect(() => {
    setFormData(jobFormData);
  }, [jobFormData]);

  const handleChange = (field: keyof FormData, value: string) => {
    if (field === "specialties" || field === "practiceArea") {
      setFormData((prevData) => ({
        ...prevData,
        [field]: prevData[field].includes(value)
          ? prevData[field].filter((item) => item !== value)
          : [...prevData[field], value],
      }));
    } else if (field === "State") {
      setFormData({
        ...formData,
        State: value,
        City: "", // Reset City when a new State is selected
      });
    } else if (field === "City") {
      setFormData({
        ...formData,
        City: value,
      });
    }
  };
  const handleSave = () => {
    setJobFormData({
      ...jobFormData,
      ...formData,
    });
    handleClose();
  };
  // Helper function to get all cities from all states
  const getAllCities = (options: { [key: string]: string[] }) => {
    return Object.values(options).flat();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="modal-mobile"
        fullScreen={isMobile}
        fullWidth={true}
        sx={{
          padding: isMobile ? "0" : "2% 4%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DialogTitle
          textAlign="center"
          sx={{
            m: 0,
            pt: 4,
            background: "black",
            color: "white",
            fontSize: isMobile ? "18px" : "25px",
          }}
          id="customized-dialog-title"
        >
          {step[0].question}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: isMobile ? 0 : 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ background: "black" }} dividers>
          {step.map((stepData, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                  marginLeft: "10px",
                }}
              >
                {Array.isArray(stepData.options) && stepData.name !== "City"
                  ? stepData.options.map((option, optionIndex) => (
                      <ChipButton
                        key={optionIndex}
                        label={option}
                        isSelected={formData[stepData.name].includes(option)}
                        onClick={() =>
                          handleChange(stepData.name as keyof FormData, option)
                        }
                        isMobile={isMobile}
                      />
                    ))
                  : ""}
              </Box>
              {stepData.name === "City" && (
                <Box>
                  <h5
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: isMobile ? "18px" : "24px",
                    }}
                  >
                    What City are you looking in?{" "}
                  </h5>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      flexWrap: "wrap",
                      gap: "5px",
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {typeof stepData.options === "object" &&
                    !Array.isArray(stepData.options)
                      ? (formData.State
                          ? stepData.options[formData.State] || []
                          : getAllCities(
                              stepData.options as { [key: string]: string[] }
                            )
                        ).map((city, cityIndex) => (
                          <ChipButton
                            key={cityIndex}
                            label={city}
                            isSelected={formData.City === city}
                            onClick={() =>
                              handleChange(
                                stepData.name as keyof FormData,
                                city
                              )
                            }
                            isMobile={isMobile}
                          />
                        ))
                      : null}
                  </Box>
                </Box>
              )}{" "}
            </Box>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            background: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            autoFocus
            onClick={handleSave}
            sx={{
              backgroundColor: "#19ff85",
              color: "black",
              fontWeight: "900",
              fontSize: isMobile ? "1.5rem" : "2rem",
              padding: "5px 100px",
              fontFamily: "sans-serif",
              width: isMobile ? "50vw" : "20vw",
              lineHeight: "1.5",
              border: "1px solid #19ff85",
              "&:hover": {
                backgroundColor: "black",
                color: "#19ff85",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomizedDialogs;
