import { Box, Typography } from "@mui/material";
import FilterItems from "../FiltersOption";

interface JobFiltersProps {
  cleared: boolean;
}

const JobFilters: React.FC<JobFiltersProps> = ({ cleared }) => {
  return (
    <Box sx={{
      background: "radial-gradient(ellipse at center,#1c663f 0%,#000 70%)",

    }}>
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <FilterItems cleared={cleared} />
      </Box>
    </Box>
  );
};

export default JobFilters;
