import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectLabelsProps {
  values: { value: string; label: string }[]; // Array of values
  initialValue: string; // Initial value
}

export default function SelectLabels({ values, initialValue }: SelectLabelsProps) {
  const [age, setAge] = React.useState(initialValue);
  console.log(initialValue)

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl 
        sx={{ 
          m: 1, 
          minWidth: 120,
          '& .MuiOutlinedInput-root': { // styles for the outlined input
            marginTop: 0, // Remove the gap between the upper border and the component
            '& fieldset': {
              borderColor: 'white', // border color
            },
            '&:hover fieldset': {
              borderColor: 'white', // border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // border color when focused
            },
          },
        }}
        size='small'
      >
        <Select
           value={age}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ 
            color: 'white', // Text color
            marginTop: 0, // Remove the gap between the upper border and the component
            '& .MuiSelect-icon': { 
                display:'none'
            }
          }}
          MenuProps={{ 
            PaperProps: { 
              sx: { 
                backgroundColor: 'black', // Background color
                color: 'white' // Text color inside menu
              } 
            } 
          }}
        >
          {values.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ color: 'white',textAlign:'center' }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
