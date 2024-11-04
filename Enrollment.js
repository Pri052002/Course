import React, { useState } from 'react';
import { enrollInCourse } from '../BaseAPI';
import Payment from './Payment';
import {
  Button,
  Typography,
  Alert,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const Enrollment = ({ courseId, studentId, courseTitle, coursePrice }) => {
  const [enrollment, setEnrollment] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  const handleEnroll = () => {
    enrollInCourse(studentId, courseId)
      .then(response => {
        console.log('Enrollment response:', response.data); // Log response
        setEnrollment(response.data);
        setError(null); // Clear error if enrollment was successful
      })
      .catch(error => {
        console.error('Error enrolling in course:', error);
        setError(error.response?.data || 'Enrollment failed.'); // Capture error message
      });
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )} {/* Display error if it exists */}
      
      {!enrollment ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleEnroll}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Enroll Now
        </Button>
      ) : (
        <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Enrolled in {courseTitle}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Price: ${coursePrice}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Payment
              enrollmentId={enrollment.enrollmentId}
              courseId={enrollment.courseId}
            />
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default Enrollment;
