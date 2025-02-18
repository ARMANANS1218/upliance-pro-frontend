import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend 
} from 'recharts';

// Sample data for monthly users
const monthlyData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 200 },
  { name: 'May', users: 278 },
  { name: 'Jun', users: 189 }
];

// Sample data for device usage distribution
const deviceData = [
  { name: 'Desktop', value: 60 },
  { name: 'Mobile', value: 30 },
  { name: 'Tablet', value: 10 }
];

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Flex container to hold both charts side by side */}
      <Box 
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 4,
          mb: 4
        }}
      >
        {/* Line Chart Box */}
        <Box sx={{ flex: "1 1 45%", minWidth: "300px", height: "300px" }}>
          <Typography variant="h6" align="center" gutterBottom>
            Monthly Users Statistics
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart Box */}
        <Box sx={{ flex: "1 1 45%", minWidth: "300px", height: "300px" }}>
          <Typography variant="h6" align="center" gutterBottom>
            Device Usage Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={deviceData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                fill="#82ca9d" 
                label 
              />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
