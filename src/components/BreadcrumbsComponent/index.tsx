import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {Box} from '@mui/material';

const BreadcrumbsComponent: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#3E7B9D', padding: 2, marginTop: 0}}>
    
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: '#E1E1E1', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Link color="inherit" href="/" sx={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link color="inherit" href="/app" sx={{ textDecoration: 'none' }}>
            App
          </Link>
          <Link color="inherit" href="/blogs" sx={{ textDecoration: 'none' }}>
            Blogs
          </Link>
        </Breadcrumbs>
   
    </Box>
  );
};

export default BreadcrumbsComponent;