import { useState, useEffect } from "react";
import { Box, Chip } from "@mui/material";
import stepsData from "../components/steps.json";
import { useMediaQuery, useTheme } from "@mui/material";
import { useJobContext } from "../context/FormDataContext";
import CustomizedDialogs from "./Modal";
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
interface Cleared {
  cleared: boolean;
}

const FilterItems = ({ cleared }: Cleared) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { jobFormData, setJobFormData } = useJobContext();
  const [open, setOpen] = useState({
    cityState: false,
    practiceArea: false,
    specialties: false,
  });

  const handleClickOpen = (modalType: keyof typeof open) => {
    setOpen({ ...open, [modalType]: true });
  };

  const handleClose = (modalType: keyof typeof open) => {
    setOpen({ ...open, [modalType]: false });
  };

  const [formData, setFormData] = useState<FormData>({
    State: jobFormData.State,
    City: jobFormData.City,
    practiceArea: jobFormData["practiceArea"],
    specialties: jobFormData["specialties"],
  });

  const [steps] = useState<Step[]>(stepsData.steps);

  useEffect(() => {
    setJobFormData({
      State: formData.State,
      City: formData.City,
      practiceArea: formData.practiceArea,
      specialties: formData.specialties,
    });
  }, [formData]);

  useEffect(() => {
    if (cleared) {
      setFormData({
        State: "",
        City: "",
        practiceArea: [],
        specialties: [],
      });
      setJobFormData({
        State: "",
        City: "",
        practiceArea: [],
        specialties: [],
      });
    }
  }, [cleared]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          margin: "20px 0",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Chip
          onClick={() => handleClickOpen("cityState")}
          sx={{
            border: "1px solid white",
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "700",
            width: "auto",
            padding: isMobile ? "" : "20px 10px",
            cursor: "pointer",
          }}
          label="Edit City & State"
        />

        <Chip
          onClick={() => handleClickOpen("practiceArea")}
          label="Edit Practice Area"
          sx={{
            border: "1px solid white",
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px",
            fontSize: "14px",
            fontFamily: "Inter",
            padding: isMobile ? "" : "20px 10px",

            fontWeight: "700",
            width: "auto",
            cursor: "pointer",
          }}
        />
        <Chip
          onClick={() => handleClickOpen("specialties")}
          label="Edit Specialties"
          sx={{
            border: "1px solid white",
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px",
            fontSize: "14px",
            fontFamily: "Inter",
            padding: isMobile ? "" : "20px 10px",

            fontWeight: "700",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </Box>

      <CustomizedDialogs
        open={open.cityState}
        handleClose={() => handleClose("cityState")}
        step={steps.filter(
          (step) => step.name === "State" || step.name === "City"
        )}
      />
      <CustomizedDialogs
        open={open.practiceArea}
        handleClose={() => handleClose("practiceArea")}
        step={steps.filter((step) => step.name === "practiceArea")}
      />
      <CustomizedDialogs
        open={open.specialties}
        handleClose={() => handleClose("specialties")}
        step={steps.filter((step) => step.name === "specialties")}
      />
    </Box>
  );
};

export default FilterItems;
