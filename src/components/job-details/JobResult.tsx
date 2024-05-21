import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import JobApplicationModal from "../FormModal";

// Define the Job interface
interface Job {
  JobID: number;
  FirmID: string;
  Firm: string;
  City: string;
  State: string;
  JobDescription: string;
  JobPostTitle: string;
  PracticeArea: string;
  Cases: string[];
  length: string;
  DateUpdated: string;
}

// Define the AccordionUsageProps interface
interface AccordionUsageProps {
  jobDetails: Job[];
}

// Define the AccordionUsage component
export default function AccordionUsage({ jobDetails }: AccordionUsageProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div>
      {jobDetails.map((job, index) => (
        <Box key={index}>
          <Accordion
            expanded={expandedIndex === index}
            onChange={() => handleChange(index)}
            sx={{ backgroundColor: "black", color: "white" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: isMobile ? "30px" : "50px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/logo.png" // Replace "/path/to/your/logo.png" with the actual path to your logo file
                    alt="GT Logo" // Add an alt attribute for accessibility
                    style={{
                      width: isMobile ? "40px" : "80px", // Adjust the width based on whether it's mobile or not
                      height: isMobile ? "40px" : "80px",
                    }}
                  />
                </Box>
                <Box>
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: isMobile ? "12px" : "18px",
                        margin: "10px 0",
                        fontFamily: "inherit",
                      }}
                    >
                      {job.JobPostTitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: isMobile ? "50px" : "150px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: isMobile ? "11px" : "14px",
                      }}
                    >
                      {job.Firm}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: isMobile ? "10px" : "14px",
                      }}
                    >
                      {job.City} , {job.State}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <Box>
                  {job.JobDescription.split(". ").map(
                    (sentence, index, array) => {
                      // Trim whitespace from the beginning and end of the sentence
                      const paragraph = sentence.trim();
                      // Check if the paragraph has more than one word to consider it as a sentence
                      if (paragraph) {
                        // Add period only if there are more sentences in the array
                        const paragraphWithPeriod =
                          index !== array.length - 1
                            ? `${paragraph}.`
                            : paragraph;
                        return (
                          <Typography
                            key={index}
                            textAlign="justify"
                            sx={{
                              fontSize: isMobile ? "14px" : "18px",
                              fontFamily: "inherit",
                              marginTop: "10px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: paragraphWithPeriod,
                            }}
                          />
                        );
                      }
                      // Return null if the paragraph is empty
                      return null;
                    }
                  )}

                  <Typography variant="body1" marginTop={4}>
                    <strong>Date posted : </strong>
                    <span style={{ fontWeight: "400", fontSize: "14px" }}>
                      {new Date(job.DateUpdated).toLocaleDateString()}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "25px",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: isMobile ? "14px" : "18px",
                    }}
                  >
                    Interested in discussing this opportunity? Have Chris
                    Holtzhauer, Attorney Recruiter & President at Holtz &
                    Bernard call me about this opportunity.{" "}
                  </Typography>
                  <>
                    <Button
                      onClick={handleModalOpen}
                      sx={{
                        backgroundColor: "#19ff85",
                        color: "black",
                        fontWeight: "900",
                        fontSize: isMobile ? "1rem" : "1.5rem",
                        padding: "20px 10px",
                        fontFamily: "sans-serif",
                        width: isMobile ? "90vw" : "40vw",
                        lineHeight: "1.2",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "#19ff85",
                          border: "1px solid #19ff85",
                        },
                      }}
                    >
                      I Want To Learn More
                    </Button>
                    <JobApplicationModal
                      open={modalOpen}
                      jobDetails={jobDetails}
                      onClose={handleModalClose}
                    />
                  </>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ borderColor: "white" }} />
        </Box>
      ))}
    </div>
  );
}
