import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseService from './CourseService'; // API service for backend interaction
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Icon for create button

const ProfessorDashboard = () => {
  const [professorId, setProfessorId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Store selected course
  const navigate = useNavigate(); // Initialize navigate

  // Fetch ProfessorId from localStorage
  useEffect(() => {
    const storedProfessorId = localStorage.getItem('professorId');
    if (storedProfessorId) {
      setProfessorId(parseInt(storedProfessorId));
      fetchCourses(); // Fetch courses once professorId is set
    }
  }, []);

  // Fetch courses related to the professorId
  const fetchCourses = async () => {
    try {
      const storedProfessorId = localStorage.getItem('professorId');
      if (storedProfessorId) {
        const response = await axios.get(
          `http://localhost:5033/api/Courses/courses/${storedProfessorId}`
        );
        setCourses(response.data);
      } else {
        console.error('Professor ID not found in local storage.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch all modules for a given course
  const fetchModules = async (courseId) => {
    try {
      const data = await CourseService.getModulesByCourseId(courseId);
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  // Handle course selection
  const handleCourseSelection = (course) => {
    setSelectedCourse(course); // Set the selected course
    fetchModules(course.courseId); // Fetch modules for the selected course
  };

  const handleCreateModule = () => {
    navigate('/create-module'); // Redirect to CreateModule.js page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* AppBar with Welcome Message */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Welcome, {localStorage.getItem('username')}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar for Course List */}
        <Box
          sx={{
            width: { xs: '100%', sm: '25%' },
            padding: 2,
            backgroundColor: '#f0f2f5',
            borderRight: '1px solid #e0e0e0',
            overflowY: 'auto',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3 }}
          >
            Your Courses
          </Typography>
          <List>
            {courses.map((course) => (
              <Card
                key={course.courseId}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 4,
                  '&:hover': {
                    boxShadow: 8,
                    backgroundColor: '#e0f7fa',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleCourseSelection(course)} // Select course on click
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>

        {/* Main Course and Module Display */}
        <Box sx={{ flexGrow: 1, padding: 4 }}>
          {selectedCourse ? (
            <>
              {/* Selected Course Information */}
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 3 }}
              >
                {selectedCourse.title}
              </Typography>
              <Typography variant="body1" gutterBottom color="textSecondary">
                {selectedCourse.description}
              </Typography>

              {/* Modules List */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
                Modules for this Course:
              </Typography>
              <Grid container spacing={2}>
                {modules.length > 0 ? (
                  modules.map((module) => (
                    <Grid item xs={12} sm={6} md={4} key={module.moduleId}>
                      <Card
                        sx={{
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #ddd',
                          boxShadow: 2,
                          padding: 2,
                        }}
                      >
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {module.title}
                              </Typography>
                            }
                            secondary={`Order: ${module.order}`}
                          />
                        </ListItem>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No modules available for this course.
                  </Typography>
                )}
              </Grid>
            </>
          ) : (
            <Typography variant="h5" color="textSecondary" align="center">
              Select a course to view its modules
            </Typography>
          )}
        </Box>
      </Box>

      {/* Fixed "Create New Course" Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateModule}
        startIcon={<AddIcon />}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          padding: '12px 24px',
          boxShadow: 6,
        }}
      >
        Create New Course
      </Button>
    </Box>
  );
};

export default ProfessorDashboard;
