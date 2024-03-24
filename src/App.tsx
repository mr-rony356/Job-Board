import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Box } from "@mui/material";
import MultiSteps from './pages/MultiSteps'
import Joblisting from "./components/Home";
import { JobProvider } from "./context/FormDataContext";
import JobDetails from "./pages/JobDetails";
import { FilteredResultsProvider } from './components/JobSearch'; // Import FilteredResultsProvider


function App() {


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
        <Route path="/job-details" element={< JobDetails />} />
        </Routes>
        </FilteredResultsProvider>

        </JobProvider>
      </Box>
    </Router>
  );
}

export default App;
