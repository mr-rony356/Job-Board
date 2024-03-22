import { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import stepsData from '../components/steps.json';
import { useMediaQuery, useTheme } from '@mui/material';
import { useJobContext } from '../context/FormDataContext';
import CustomizedDialogs from './Modal';
import { produce } from 'immer';
type FormDataKeys = keyof FormData;
interface Step {
    label: string;
    name: string;
    question: string;
    options: string[] | { [key: string]: string[] };
}

interface FormData {
    state: string;
    city: string;
    practiceArea: string[];
    specialties: string[];
}

const FilterItems: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { jobFormData, setJobFormData } = useJobContext();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [specialties, setSpecialties] = useState<string[]>(jobFormData.specialties);

    const [formData, setFormData] = useState<FormData>({
        state: jobFormData.state,
        city: jobFormData.city,
        practiceArea: jobFormData['practiceArea'],
        specialties: jobFormData['specialties'],
    });
    const [steps] = useState<Step[]>(stepsData.steps);
    useEffect(() => {
        console.log(' calleddddddddddddddd:');
        setJobFormData(formData)

    }, [formData]);

    const handleChange = (field: keyof FormData, value: string) => {
        let updatedValue: string[] = [];
        if (field === 'specialties') {
            setSpecialties(
                produce(specialties, (draftSpecialties) => {
                  if (draftSpecialties.includes(value)) {
                    // If the value exists, remove it
                    const index = draftSpecialties.indexOf(value);
                    draftSpecialties.splice(index, 1);
                  } else {
                    // If the value doesn't exist, add it
                    draftSpecialties.push(value);
                  }
                })
              );
            
              setJobFormData({
                ...jobFormData,
                specialties, // Use the updated specialties directly
              });

            handleClickOpen()

        }
        if (field === 'state') {
            updatedValue = [value];
            setFormData({
                ...formData,
                state: value,
                city: '', // Reset city when a new state is selected
            });
            // console.log('data after click', formData); // Log the formData after it has been updated
        } else if (field === 'city') {
            updatedValue = [value];
            setFormData({
                ...formData,
                city: value,
            });
        } else {
            updatedValue = formData[field].includes(value)
                ? formData[field].filter(option => option !== value)
                : [...formData[field], value];
            setFormData({
                ...formData,
                [field]: updatedValue
            });
        }

    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'radial-gradient(ellipse at center,#1c663f 0%,#000 60%)',
            backgroundSize: 'cover'

        }}>
            {steps.map((step, index) => (
                <Box key={index} sx={{
                    display: 'flex',
                    maxWidth: isMobile ? '98%' : '70%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                }}>
                    <Typography variant="h5" style={{
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        letterSpacing: '2px',
                        margin: '5px 0'
                    }}>
                        {step.label}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginLeft: '10px'
                    }}>
                        {Array.isArray(step.options) && step.name === 'specialties' // Checking if step is 'specialties'
                            ? step.options.slice(0, 5).map((option, optionIndex) => ( // Only rendering the first 5 options
                                <Chip
                                    key={optionIndex}
                                    label={option.toUpperCase()}
                                    onClick={() => handleChange(step.name as FormDataKeys, option)}
                                    sx={{
                                        border: '1px solid white',
                                        backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : 'black',
                                        color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white',
                                        margin: '3px',
                                        borderRadius: '0px',
                                        fontSize:'12px',
                                        fontFamily:'inherit',
                                        padding:'5px !important',

                                        '&:hover': {
                                            backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : '#444', // Change background color on hover
                                            color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on hover
                                        },
                                        '&:focus': {
                                            backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : '#666', // Change background color on focus
                                            color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on focus
                                            boxShadow: '0 0 0 2px #ffffff', // Add box shadow on focus
                                            outline: 'none', // Remove default focus outline
                                        }
                                    }}
                                />
                            ))
                            : step.name === 'city' // Check if step is 'city'
                                ? Object.entries(step.options).map(([state, cities]) =>
                                    Array.isArray(cities) ? ( // Check if cities is an array
                                        cities.map((city, cityIndex) => (
                                            <Chip
                                                key={cityIndex}
                                                label={city === '' ? "No City " : city.toUpperCase()}
                                                onClick={() => handleChange(step.name as FormDataKeys, city)}
                                                sx={{
                                                    border: '1px solid white',
                                                    backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'white' : 'black',
                                                    color: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'black' : 'white',
                                                    margin: '3px',
                                                    borderRadius: '0px',
                                                    fontSize: '12px',
                                                    fontFamily: 'inherit',

                                                    '&:hover': {
                                                        backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'white' : '#444',
                                                        color: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'black' : 'white',
                                                    },
                                                    '&:focus': {
                                                        backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'white' : '#666',
                                                        color: jobFormData[step.name as FormDataKeys]?.includes(city) ? 'black' : 'white',
                                                        boxShadow: '0 0 0 2px #ffffff',
                                                        outline: 'none',
                                                    },
                                                    display: formData.city[0] === city || formData.state === state || formData.state === '' ? '' : 'none'
                                                }}
                                            />
                                        ))
                                    ) : null // If cities is not an array, return null
                                )
                                : // For other steps
                                Array.isArray(step.options) ? (
                                    step.options.map((option, optionIndex) => (
                                        <Chip
                                            key={optionIndex}
                                            label={option.toUpperCase()}
                                            onClick={() => handleChange(step.name as FormDataKeys, option)}
                                            sx={{
                                                border: '1px solid white',
                                                backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : 'black',
                                                color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white',
                                                margin: '3px',
                                                borderRadius: '0px',
                                                fontSize: '12px',
                                                fontFamily: 'inherit',
                                                padding: '5px !important',

                                                '&:hover': {
                                                    backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : '#444', // Change background color on hover
                                                    color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on hover
                                                },
                                                '&:focus': {
                                                    backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'white' : '#666', // Change background color on focus
                                                    color: jobFormData[step.name as FormDataKeys]?.includes(option) ? 'black' : 'white', // Change text color on focus
                                                    boxShadow: '0 0 0 2px #ffffff', // Add box shadow on focus
                                                    outline: 'none', // Remove default focus outline
                                                }
                                            }}
                                        />
                                    ))
                                ) : null // If options are not an array, return null
                        }
                    </Box>
                    {/* {step.name === 'specialties' && step.options.length > 5 && ( // Conditionally rendering 'See More' button
                <Button variant="outlined" onClick={() => handleSeeMore(step)}>See More</Button>
            )} */}
                </Box>

            ))}
            <CustomizedDialogs open={open} handleClose={handleClose} />
        </Box>
    );
};

export default FilterItems;
