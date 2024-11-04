import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../BaseAPI'; // Ensure the path is correct
import Enrollment from './Enrollment';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const CourseList = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // State to capture any errors
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        console.log('Courses Response:', response.data); // Debugging response
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    getCourses();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Available Courses
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {courses.length > 0 ? (
            courses.map(course => (
              <Card
                key={course.courseId}
                variant="outlined"
                sx={{
                  marginBottom: 2,
                  backgroundColor: '#fff',
                  boxShadow: 1,
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6, // Slightly elevate the card on hover
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    {course.description}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 1, color: '#2e7d32' }}>
                    Price: ${course.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start Date: {new Date(course.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End Date: {new Date(course.endDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 2 }}>
                  <Enrollment
                    courseId={course.courseId}
                    studentId={studentId}
                    courseTitle={course.title} // Pass title
                    coursePrice={course.price} // Pass price
                  />
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', color: '#999' }}>
              No courses available at the moment.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CourseList;
