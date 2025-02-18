import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// Reuse the same text field styles for consistency
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

const SignUpPage = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      // For mock authentication, create a dummy user and sign them in immediately
      const dummyUser = {
        email: formData.email,
        name: formData.name,
        id: "newuser" + Date.now()
      };
      signIn(dummyUser);
      navigate("/");
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, color: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom color="white">
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          sx={textFieldStyles}
        />
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
          Sign Up
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="white">
          Already have an account? <Link to="/signin" style={{ color: 'white' }}>Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpPage;
