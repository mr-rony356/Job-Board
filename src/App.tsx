import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Box } from "@mui/material";
import MultiSteps from './pages/MultiSteps'
import Joblisting from "./components/Home";
import { JobProvider } from "./context/FormDataContext";
import JobDetails from "./pages/JobDetails";
import { FilteredResultsProvider } from './components/JobSearch'; // Import FilteredResultsProvider
import ThankYou  from "./pages/ThankYou";
import { useEffect, useState } from "react";

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
}

function App() {
  const [jobDetails, setJobDetails] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw1SN4piHUBeojsDzm-T-hRYg75sYuW2jb6a-jGCdEGz9tJo6RC8turfrcYuLs2mhCw/exec');
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

console.log(jobDetails)
  return (
    <Router>
      <Box sx={{minHeight:'100vh',width:'100%'}} >
        <Header />
        <JobProvider> 
          <FilteredResultsProvider>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multi" element={<MultiSteps />} />
        <Route path="/" element={<Joblisting />} />
        <Route path="/job-details" element={< JobDetails jobDetails={jobDetails} />} />
        <Route path="/thank-you" element={< ThankYou />} />
        </Routes>
        </FilteredResultsProvider>

        </JobProvider>
      </Box>
    </Router>
  );
}

export default App;
