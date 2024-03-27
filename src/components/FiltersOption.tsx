import { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import stepsData from '../components/steps.json';
import { useMediaQuery, useTheme } from '@mui/material';
import { useJobContext } from '../context/FormDataContext';
import CustomizedDialogs from './Modal';
type FormDataKeys = keyof FormData;
interface Step {
    label: string;
    name: string;
    question: string;
    options: string[] | { [key: string]: string[] };
}

interface FormData {
    State: string;
    City: string;
    practiceArea: string[];
    specialties: string[];
}
interface Cleared {
    cleared: boolean;
}

const FilterItems = ({ cleared }: Cleared) => {
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

    const [formData, setFormData] = useState<FormData>({
        State: jobFormData.State,
        City: jobFormData.City,
        practiceArea: jobFormData['practiceArea'],
        specialties: jobFormData['specialties'],
    });
    const [steps] = useState<Step[]>(stepsData.steps);
    // Flag to indicate whether it's the initial render

    useEffect(() => {
        // Check if it's not the initial render
            setJobFormData({
                State: formData.State,
                City: formData.City,
                practiceArea: formData.practiceArea,
                specialties: jobFormData.specialties,
                // Add other fields as needed
            });
    }, [formData]);

    useEffect(() => {
        // Check if it's not the initial render
        if (cleared) {
            // Update only the necessary fields in formData
            setFormData({
                State: '',
                City: '',
                practiceArea: [],
                specialties: [],
            });
        }
    }, [cleared]);
     const handleChange = (field: keyof FormData, value: string) => {
        let updatedValue: string[] = [];
        if (field === 'specialties') {


            handleClickOpen()

        }
        if (field === 'State') {
            updatedValue = [value];
            setFormData({
                ...jobFormData,
                State: value,
                City: '', // Reset City when a new State is selected
            });
        } else if (field === 'City') {
            updatedValue = [value];
            setFormData({
                ...formData,
                City: value,
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
                            ? (
                                <Chip
                                    label='Edit Specialties'
                                    onClick={() => handleChange(step.name as FormDataKeys, '')}
                                    sx={{
                                        border: '1px solid white',
                                        margin: '3px',
                                        borderRadius: '0px',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontFamily: 'inherit',
                                        padding: '5px !important',
                                    }}
                                />
                            )

                            : step.name === 'City' // Check if step is 'City'
                                ? Object.entries(step.options).map(([State, cities]) =>
                                    Array.isArray(cities) ? ( // Check if cities is an array
                                        cities.map((City, cityIndex) => (
                                            <Chip
                                                key={cityIndex}
                                                label={City === '' ? "No City " : City.toUpperCase()}
                                                onClick={() => handleChange(step.name as FormDataKeys, City)}
                                                sx={{
                                                    border: '1px solid white',
                                                    backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'white' : 'black',
                                                    color: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'black' : 'white',
                                                    margin: '3px',
                                                    borderRadius: '0px',
                                                    fontSize: '12px',
                                                    fontFamily: 'inherit',

                                                    '&:hover': {
                                                        backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'white' : '#444',
                                                        color: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'black' : 'white',
                                                    },
                                                    '&:focus': {
                                                        backgroundColor: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'white' : '#666',
                                                        color: jobFormData[step.name as FormDataKeys]?.includes(City) ? 'black' : 'white',
                                                        boxShadow: '0 0 0 2px #ffffff',
                                                        outline: 'none',
                                                    },
                                                    display: formData.City[0] === City || formData.State === State || formData.State === '' ? '' : 'none'
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
