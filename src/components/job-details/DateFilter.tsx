import React from 'react';
import { Box, FormControl, Select, MenuItem } from '@mui/material';

interface DateFilterProps {
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateFilter, setDateFilter }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        marginTop: '20px',
        width: '100%',
        marginRight: '20px',
      }}
    >
      <FormControl sx={{ minWidth: 100, background: 'black' }} size='small'>
        <Select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as string)}
          displayEmpty
          sx={{
            border: '1px solid white',
            color: 'white',
          }}
          inputProps={{ 'aria-label': 'Select Date Filter' }}
        >
          <MenuItem value="intial">Filter by Date</MenuItem>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="This week">This week</MenuItem>
          <MenuItem value="This month">This month</MenuItem>
          <MenuItem value="This year">This year</MenuItem>
          <MenuItem value="Last 6 months">Last 6 months</MenuItem>
          <MenuItem value="Last 12 months">Last 12 months</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateFilter;