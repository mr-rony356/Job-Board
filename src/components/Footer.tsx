import { Typography, useMediaQuery,useTheme } from '@mui/material'

export const Footer = () => {
  const theme =useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile or tablet

  return (
    <Typography sx={{
        fontSize:isMobile?'12px':'14px',
        textAlign:'center',
        marginBottom:'20px',
        fontFamily:'Roboto',
        fontWeight:'300'
    }}>
        ©2024 Relevant Attorney Jobs - All Rights Reserved
    </Typography>
  
  )
}
