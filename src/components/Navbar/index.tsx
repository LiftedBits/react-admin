import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#4487AD',
        width: '100%',
      }}
    >
      <Toolbar sx={{ minHeight: 60 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#E1E1E1' }}>
          Django administration
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body1"
            sx={{ color: '#E1E1E1', marginRight: 2 }}
          >
            Welcome, UPAYAA-ADMIN.
          </Typography>
          <Button color="inherit">View Site</Button>
          <Button color="inherit">Change Password</Button>
          <Button color="inherit">Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;