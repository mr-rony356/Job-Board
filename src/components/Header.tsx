import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'black' }}> {/* Change background color to black */}
          <IconButton
            edge="start"
            size="large"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#4caf50', fontSize: '2.5rem' }} // Apply green color here
          >
            <Link to='/'>
            <MenuIcon sx={{ fontSize: '2.5rem' ,color:'#4caf50'}} // Apply green color here
            />
            </Link>
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Job Listing
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
