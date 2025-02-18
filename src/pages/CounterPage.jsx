import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const CounterPage = () => {
  // Initialize counter from localStorage or default to 0
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counter');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save counter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);

  // Animate background color based on count value (using a linear gradient)
  const backgroundProps = useSpring({
    background: `linear-gradient(90deg, rgba(255,${(count * 10) % 255},0,1) 0%, rgba(0,${(count * 5) % 255},${(count * 3) % 255},1) 100%)`,
    config: { tension: 170, friction: 26 }
  });

  const handleReset = () => setCount(0);

  return (
    <Container>
      <animated.div style={{ ...backgroundProps, padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
        <Typography variant="h4" align="center">
          Counter: {count}
        </Typography>
      </animated.div>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={() => setCount(count + 1)} sx={{ m: 1 }}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)} sx={{ m: 1 }}>
          Decrement
        </Button>
        <Button variant="outlined" onClick={handleReset} sx={{ m: 1 }}>
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default CounterPage;
