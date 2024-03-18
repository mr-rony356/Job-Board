import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for primary
    },
    secondary: {
      main: green[500], // Custom green color for secondary
    },
  },
  typography: {
    fontFamily: 'Times New Roman, Times, serif', // Set the font family to Times New Roman
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}></ThemeProvider>
    <App />
  </React.StrictMode>,
)
