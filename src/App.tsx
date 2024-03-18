import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer";
import { Box } from "@mui/material";
import MultiSteps from './components/MultiSteps'
import Joblisting from "./components/Joblisting";

function App() {
  return (
    <Router>
      <Box sx={{minHeight:'100vh',width:'100%'}} >
        <Header />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multi" element={<MultiSteps />} />
        <Route path="/" element={<Joblisting />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
