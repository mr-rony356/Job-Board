import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box,Divider, useMediaQuery, useTheme } from "@mui/material";
import { JobProvider } from "./context/FormDataContext";
import JobDetails from "./pages/JobDetails";
import { FilteredResultsProvider } from "./components/JobSearch";
import ThankYou from "./pages/ThankYou";
import { useEffect, useState } from "react";
import JobSkeleton from "./components/JobSkeleton";
import JobFilters from "./components/job-details/JobFilters";
import JobSearchSection from "./components/job-details/JobSearch";
import JobDetailsWrapper from "./Wrapper/JobDetailsWrapper";
import DateFilter from "./components/job-details/DateFilter";

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

function App() {
  const [jobDetails, setJobDetails] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbw1SN4piHUBeojsDzm-T-hRYg75sYuW2jb6a-jGCdEGz9tJo6RC8turfrcYuLs2mhCw/exec"
        );
        const data = await response.json();
        setJobDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        <Header />
        <JobProvider>
          <FilteredResultsProvider>
            {isLoading ? (
              <JobDetailsWrapper>
                <JobFilters cleared={true} />
                <DateFilter  dateFilter={"intial"}  setDateFilter={() => {}} />

                <br />
                <JobSearchSection 
                  jobDetails={jobDetails}
                  searchQuery={""}
                  setSearchQuery={() => {}}
                  handleClearFilters={() => {}}
                  isMobile={false}
                />
                <Divider
                  sx={{
                    borderColor: "#19ff85",
                    width: isMobile?"98%":"80%",
                    borderWidth: "1.5px",
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "end", width: isMobile?"95%":"80%"}}>

                </Box>

                <JobSkeleton />
              </JobDetailsWrapper>

            ) : (
              <Routes>
                <Route
                  path="/"
                  element={<JobDetails jobDetails={jobDetails} />}
                />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            )}
          </FilteredResultsProvider>
        </JobProvider>
      </Box>
    </Router>
  );
}

export default App;
