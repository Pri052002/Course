import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseList from './CourseList';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Alert,
  CssBaseline,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  // Fetch studentId from localStorage
  const studentId = localStorage.getItem('studentId');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) {
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5033/api/Student/courses/${studentId}`);
        setEnrolledCourses(response.data.enrolledCourses);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, [studentId]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Student Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Welcome, {localStorage.getItem('username') || 'Student'}!
          </Typography>

          <Typography variant="h5" gutterBottom>
            Enrolled Courses
          </Typography>
          {enrolledCourses.length === 0 ? (
            <Typography>No enrolled courses.</Typography>
          ) : (
            <Grid container spacing={2}>
              {enrolledCourses.map((course) => (
                <Grid item xs={12} md={6} lg={4} key={course.courseId}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography variant="body2">{course.description}</Typography>
                    <Typography variant="body2">Price: ${course.price}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {/* You can keep your CourseList component here if needed */}
          <CourseList studentId={studentId} />
        </Container>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
