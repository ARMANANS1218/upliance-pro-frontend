import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MERN Project
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/counter">Counter</Button>
        <Button color="inherit" component={Link} to="/user-form">User Form</Button>
        <Button color="inherit" component={Link} to="/rich-text-editor">Editor</Button>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        {user ? (
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
