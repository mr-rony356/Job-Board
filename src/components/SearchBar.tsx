import React, { createContext, useContext, useState } from 'react';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, autocompleteClasses, styled } from '@mui/material';

const SelectedValuesContext = createContext<string[]>([]);
const useSelectedValues = () => useContext(SelectedValuesContext);

const Root = styled('div')(({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;
`);

const InputWrapper = styled('div')(({ theme }) => `
  width: 300px;
  border: 1px solid #1c663f;
  background-color: #1c663f;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#1c663f'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#1c663f'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`);

const Listbox = styled('ul')(({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`);

interface JobDetail {
  JobID: number;
  FirmID: string;
  Firm: string;
  City: string;
  State: string;
  JobDescription: string;
  JobPostTitle: string;
  PracticeArea: string;
  length: string;
}

interface CustomizedHookProps {
  jobDetails: JobDetail[];
}

const CustomizedHook: React.FC<CustomizedHookProps> = ({ jobDetails }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const citySet = new Set();

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    multiple: true,
    options: jobDetails || [],
    getOptionLabel: (option: JobDetail) => option.JobPostTitle, // Modify this function to display JobPostTitle
    onChange: (event, value) => {
      setSelectedValues(value.map(option => option.JobPostTitle));
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== '' && !selectedValues.includes(trimmedValue)) {
        setSelectedValues([...selectedValues, trimmedValue]);
        setInputValue(''); // Clear input field after adding the value
      }
    }
  };

  return (
    <Root>
      <SelectedValuesContext.Provider value={selectedValues}>
        <div {...getRootProps()} style={{ position: 'relative' }}>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
            <SearchIcon
              sx={{ paddingTop: '10px', position: 'absolute', top: '-5px', right: '10px', color: 'white' }}
              onClick={() => {
                const trimmedValue = inputValue.trim();
                if (trimmedValue !== '' && !selectedValues.includes(trimmedValue)) {
                  setSelectedValues([...selectedValues, trimmedValue]);
                  setInputValue(''); // Clear input field after adding the value
                }
              }}
            />
            <span />
            <input
              {...getInputProps()}
              id="customized-hook-demo-input"
              placeholder='Keyword Search'
              style={{ background: 'black', color: 'white' }}
              onKeyDown={handleKeyDown}
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
            />
          </InputWrapper>
        </div>
        {selectedValues.map((value, index) => (
          <Chip key={index} label={value} sx={{ background:'white', color:'black', margin:'10px', fontSize:'10px' }} onDelete={() => setSelectedValues(selectedValues.filter(item => item !== value))} />
        ))}
        {focused && inputValue && groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as JobDetail[]).map((option: JobDetail, index: number) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.JobPostTitle}</span>
              </li>
            ))}
          </Listbox>
        ) : null}
      </SelectedValuesContext.Provider>
    </Root>
  );
}

export default CustomizedHook;
