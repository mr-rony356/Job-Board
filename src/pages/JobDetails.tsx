import React, { useState, useMemo } from "react";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import JobDetailsWrapper from "../Wrapper/JobDetailsWrapper";
import FilterItems from "../components/FiltersOption";
import AccordionUsage from "../components/job-details/JobResult";
import Pagination from "@mui/material/Pagination";
import { useJobContext } from "../context/FormDataContext";
import { useFilteredResultsContext } from "../components/JobSearch";
import JobSearchSection from "../components/job-details/JobSearch";
import DateFilter from "../components/job-details/DateFilter";

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

interface JobDetailsProps {
  jobDetails: Job[]; // Accept jobDetails as prop
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobDetails }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { jobFormData, setJobFormData } = useJobContext();
  const { filteredResults, setFilteredResults } = useFilteredResultsContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 20;
  const [cleared, setCleared] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>(""); // State to track selected date filter

  // Memoized filtered jobs
  const filteredJobDetails = useMemo(() => {
    return jobDetails.filter((job) => {
      // Filter based on city, state, practice area, and specialties
      const cityMatch = !jobFormData.City || jobFormData.City === job.City;
      const stateMatch = job.State.includes(jobFormData.State);
      let practiceAreaMatch = true;
      if (jobFormData.practiceArea && jobFormData.practiceArea.length > 0) {
        practiceAreaMatch = jobFormData.practiceArea.some((area) =>
          job.PracticeArea.includes(area.toUpperCase())
        );
      }
      let specialtyMatch = true;
      if (jobFormData.specialties && jobFormData.specialties.length > 0) {
        specialtyMatch = jobFormData.specialties.some((specialty) =>
          job.Cases.some(
            (caseValue) => caseValue.toUpperCase() === specialty.toUpperCase()
          )
        );
      }
      // Filter based on date
      const dateUpdated = new Date(job.DateUpdated);
      const currentDate = new Date();
      const oneWeekAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const oneMonthAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
      const oneYearAgo = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      switch (dateFilter) {
        case "Today":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated.toDateString() === currentDate.toDateString()
          );
        case "This week":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated >= oneWeekAgo
          );
        case "This month":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated >= oneMonthAgo
          );
        case "This year":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated.getFullYear() === currentDate.getFullYear()
          );
        case "Last 6 months":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated >=
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 6,
                currentDate.getDate()
              )
          );
        case "Last 12 months":
          return (
            cityMatch &&
            stateMatch &&
            practiceAreaMatch &&
            specialtyMatch &&
            dateUpdated >= oneYearAgo
          );
        case "All":
          return cityMatch && stateMatch && practiceAreaMatch && specialtyMatch;
        default:
          return false;
      }
    });
  }, [jobDetails, jobFormData, dateFilter]);

  // Paginate filtered jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // Change page
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    console.log(event);
  };
  console.log(filteredJobDetails);
  // Clear all filters
  const handleClearFilters = () => {
    setJobFormData({
      State: "",
      City: "",
      practiceArea: [],
      specialties: [],
    });
    setSearchQuery("");
    setFilteredResults([]);
    setCurrentPage(1);
    setCleared(true);
    setDateFilter("All");
  };

  // Determine which jobs to display based on filters and search
  const determineDisplayedJobs = () => {
    // If filters are applied or search results exist, show the appropriate jobs
    if (filteredResults.length > 0) {
      // Filter the search results based on the date filter
      const filteredSearchResults = filteredResults.filter((job) => {
        const dateUpdated = new Date(job.DateUpdated);
        const currentDate = new Date();
        const oneWeekAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        const oneMonthAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        const oneYearAgo = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        switch (dateFilter) {
          case "Today":
            return dateUpdated.toDateString() === currentDate.toDateString();
          case "This week":
            return dateUpdated >= oneWeekAgo;
          case "This month":
            return dateUpdated >= oneMonthAgo;
          case "This year":
            return dateUpdated.getFullYear() === currentDate.getFullYear();
          case "Last 6 months":
            return (
              dateUpdated >=
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 6,
                currentDate.getDate()
              )
            );
          case "Last 12 months":
            return dateUpdated >= oneYearAgo;
          case "All":
            return true;
          default:
            return false;
        }
      });
      return filteredSearchResults;
    }
    if (!jobFormData.State && !jobFormData.City && searchQuery) {
      return [];
    }
    if (
      filteredJobDetails.length > 0 ||
      jobFormData.State ||
      (jobFormData.City && jobFormData.State) ||
      (jobFormData.City &&
        jobFormData.State &&
        jobFormData.practiceArea?.length) ||
      (jobFormData.City &&
        jobFormData.State &&
        jobFormData.practiceArea?.length &&
        jobFormData.specialties?.length) ||
      dateFilter
    ) {
      return filteredJobDetails;
    }
    // If no filters are applied and no search results exist, show all jobs
    else if (!jobFormData.State && !jobFormData.City && !searchQuery) {
      return jobDetails;
    }
    // If no jobs are found, return an empty array
    else {
      return [];
    }
  };
  // Paginate the displayed jobs
  const totalJobs = determineDisplayedJobs().length;
  const displayedJobs = determineDisplayedJobs().slice(
    indexOfFirstJob,
    indexOfLastJob
  );

  return (
    <JobDetailsWrapper>
      <Box
        sx={{
          display: "flex",
          maxWidth: isMobile ? "98%" : "80%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontSize: "3rem",
              fontFamily: "inherit",
            }}
          >
            Search Filters
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FilterItems cleared={cleared} />
        </Box>

        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "20px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <JobSearchSection
            jobDetails={jobDetails}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClearFilters={handleClearFilters}
            isMobile={isMobile}
          />
        </Box>
        <Divider
          sx={{ borderColor: "#19ff85", width: "100%", borderWidth: "1.5px" }}
        />

        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />

        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            fontFamily: "inherit",
            color: "white",
            fontSize: "40px",
            margin: "25px 0",
          }}
        >
          {totalJobs === 0 ? "No Job Found" : `${totalJobs} Results`}
        </Typography>
        <AccordionUsage jobDetails={displayedJobs} />
        <Pagination
          color="primary"
          sx={{
            margin: "40px 0",
          }}
          count={Math.ceil(determineDisplayedJobs().length / jobsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Box>
    </JobDetailsWrapper>
  );
};
export default JobDetails;
