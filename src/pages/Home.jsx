import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import heroImage from '../assets/hero_img.jpg';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Hero Image */}
        <Box
          component="img"
          src={heroImage}
          alt="Hero"
          sx={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: 2,
            mb: 3
          }}
        />
        {/* Attractive Headings */}
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Your Ultimate MERN Experience!
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Explore our dynamic web application featuring interactive counters, seamless user forms, and engaging rich text editing – all powered by the latest MERN stack technologies.
        </Typography>
        <Typography variant="body1" align="center">
          Use the navigation bar to access different components and experience smooth animations, powerful dashboards, and more!
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
