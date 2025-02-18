import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// Custom styles for white text and borders
const textFieldStyles = {
  input: { color: 'white' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  },
  '& .MuiInputLabel-root': {
    color: 'white'
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'white',
    opacity: 1
  }
};

const SignInPage = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // For mock authentication, we use a dummy user
      const dummyUser = {
        email: formData.email,
        name: "Mock User",
        id: "user123"
      };
      signIn(dummyUser);
      navigate("/");
    } else {
      setError("Please enter email and password");
    }
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign in with a dummy user
    const dummyUser = {
      email: "googleuser@example.com",
      name: "Google User",
      id: "google123"
    };
    signIn(dummyUser);
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, color: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom color="white">
        Sign In
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          sx={textFieldStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          sx={textFieldStyles}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button variant="outlined" onClick={handleGoogleSignIn}>
          Sign In with Google
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="white">
          Don't have an account? <Link to="/signup" style={{ color: 'white' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignInPage;
