import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditorPage = () => {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);

  // Get the API URL from the environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  // On mount, load the user ID from localStorage (assumes user data is stored there)
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserId(userData.userId); // our backend returns a field named "userId"
    }
  }, []);

  // Load existing editor data for this user from the backend, if available
  useEffect(() => {
    if (userId) {
      fetch(`${apiUrl}/api/editor/${userId}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("No saved editor data");
        })
        .then((data) => {
          setContent(data.content);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [userId, apiUrl]);

  // Save the rich text content to the backend
  const handleSave = async () => {
    if (!userId) {
      alert("User ID not found. Please submit user data first.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/editor/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, content })
      });
      if (!response.ok) {
        throw new Error("Failed to save editor data");
      }
      alert("Rich text content saved to backend.");
    } catch (error) {
      console.error(error);
      alert("Error saving rich text content: " + error.message);
    }
  };

  // Define custom toolbar modules and formats for ReactQuill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Rich Text Editor
      </Typography>
      <Box sx={{ mt: 2 }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ minHeight: "200px" }}
        />
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Content
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setContent("")}>
          Clear Content
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Preview:
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, minHeight: "150px" }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Paper>
      </Box>
    </Container>
  );
};

export default RichTextEditorPage;
