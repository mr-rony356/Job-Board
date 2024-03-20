import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Box } from "@mui/material";
import MultiSteps from './pages/MultiSteps'
import Joblisting from "./components/Home";
import { JobProvider } from "./context/FormDataContext";
import JobDetails from "./pages/JobDetails";

function App() {
  const jobData ={
    Cases: 'string',
    City: 'string',
    ContactInfo: 'string',
    DateUpdated: 'string',
    Firm: 'string',
    FirmID: 'string',
    FirmSize: 'string',
    JobID: 5,
    JobPostDescription: 'string',
    JobPostTitle: 'string',
    JobTitle: 'string',
    MaxSalary: 20,
    MaxJDYear: '2',
    MinSalary: 2,
    MinJDYear: 2,
    PracticeArea: 'string',
    State: 'string',
  };

  return (
    <Router>
      <Box sx={{minHeight:'100vh',width:'100%'}} >
        <Header />
        <JobProvider> 
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multi" element={<MultiSteps />} />
        <Route path="/" element={<Joblisting />} />
        <Route path="/job-details" element={< JobDetails jobData={jobData}/>} />
        </Routes>
        </JobProvider>
      </Box>
    </Router>
  );
}

export default App;
