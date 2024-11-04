import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchModulesByCourseId } from '../BaseAPI';
import Certificate from './Certificate';
import { Box, Typography, Button, Paper } from '@mui/material';

const ModuleDisplay = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCourseComplete, setIsCourseComplete] = useState(false);
  const [username] = useState('Your Name'); // Replace with actual username logic
  const [courseTitle] = useState('Course Title'); // Replace with actual course title logic
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetchModulesByCourseId(courseId);
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setError(error.message);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleNext = () => {
    if (currentIndex < modules.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCompleteCourse = () => {
    setIsCourseComplete(true);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      {isCourseComplete ? (
        <Certificate username={username} courseTitle={courseTitle} />
      ) : (
        <>
          {modules.length > 0 ? (
            <Paper
              elevation={3}
              sx={{ padding: 4, margin: 'auto', maxWidth: 600, textAlign: 'center' }}
            >
              <Typography variant="h4" sx={{ marginBottom: 2, color: '#1976d2' }}>
                {modules[currentIndex].title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 4 }}>
                {modules[currentIndex].description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={currentIndex >= modules.length - 1}
                  sx={{ padding: '10px 20px' }}
                >
                  Next
                </Button>

                {currentIndex === modules.length - 1 && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCompleteCourse}
                    sx={{ padding: '10px 20px' }}
                  >
                    Complete Course
                  </Button>
                )}
              </Box>
            </Paper>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No modules available for this course.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ModuleDisplay;
