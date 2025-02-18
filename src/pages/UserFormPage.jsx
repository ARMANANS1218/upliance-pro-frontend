import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const UserFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [isDirty, setIsDirty] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const [error, setError] = useState(null);

  // Warn user if there are unsaved changes when closing the browser
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setIsDirty(true);
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Error saving user data");
      }
      const data = await response.json();
      setSavedUser(data);
      setIsDirty(false);
      // Optionally store user data locally for use in other pages:
      localStorage.setItem("userData", JSON.stringify(data));
      // Reset form fields if desired
      setFormData({
        name: "",
        address: "",
        email: "",
        phone: ""
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // Common sx styling for the TextFields
  const textFieldStyles = {
    input: { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    },
    "& .MuiInputLabel-root": {
      color: "white"
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
      opacity: 1
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        User Data Form
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          placeholder="Enter your name"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          placeholder="Enter your address"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          placeholder="Enter your email"
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          placeholder="Enter your phone number"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      {savedUser && (
        <Box mt={2}>
          <Typography variant="body1">
            User data saved successfully!
          </Typography>
          <Typography variant="body2">User ID: {savedUser.userId}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default UserFormPage;
