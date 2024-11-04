import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  CssBaseline,
} from '@mui/material';
import './RegistrarDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const RegistrarDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('Pending Users'); // Manage view state

  const API_URL = 'http://localhost:5033/api/registrar'; // Replace with your actual API URL

  useEffect(() => {
    fetchPendingUsers();
    fetchStudents();
    fetchProfessors();
    fetchPendingCourses();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/pending-users`);
      setPendingUsers(response.data);
    } catch (error) {
      setError('Error fetching pending users.');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      setError('Error fetching students.');
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await axios.get(`${API_URL}/professors`);
      setProfessors(response.data);
    } catch (error) {
      setError('Error fetching professors.');
    }
  };

  const fetchPendingCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/pending-courses`);
      setPendingCourses(response.data);
    } catch (error) {
      setError('Error fetching pending courses.');
    }
  };

  const approveUser = async (userId) => {
    try {
      await axios.post(`${API_URL}/approve/${userId}`);
      fetchPendingUsers();
      alert('User approved successfully.');
    } catch (error) {
      setError('Error approving user.');
    }
  };

  const rejectUser = async (userId) => {
    try {
      await axios.post(`${API_URL}/reject/${userId}`);
      fetchPendingUsers();
      alert('User rejected successfully.');
    } catch (error) {
      setError('Error rejecting user.');
    }
  };

  const suspendProfessor = async (userId) => {
    try {
      await axios.post(`${API_URL}/suspend-professor/${userId}`);
      fetchProfessors();
      alert('Professor suspended successfully.');
    } catch (error) {
      setError('Error suspending professor.');
    }
  };

  const deleteStudent = async (userId) => {
    try {
      await axios.delete(`${API_URL}/delete-student/${userId}`);
      fetchStudents();
      alert('Student deleted successfully.');
    } catch (error) {
      setError('Error deleting student.');
    }
  };

  const approveCourse = async (courseId) => {
    try {
      await axios.post(`${API_URL}/approve-course/${courseId}`);
      fetchPendingCourses();
      alert('Course approved successfully.');
    } catch (error) {
      setError('Error approving course.');
    }
  };

  const rejectCourse = async (courseId) => {
    try {
      await axios.post(`${API_URL}/reject-course/${courseId}`);
      fetchPendingCourses();
      alert('Course rejected successfully.');
    } catch (error) {
      setError('Error rejecting course.');
    }
  };

  const menuItems = ['Pending Users', 'Approved Students', 'Approved Professors', 'Pending Courses'];

  return (
    <Box sx={{ display: 'flex', fontFamily: 'Poppins' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Registrar Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((text) => (
            <ListItem button key={text} onClick={() => setCurrentView(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Registrar Dashboard - {currentView}
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />
        {error && <Typography color="error">{error}</Typography>}

        <div className="container-fluid mt-5">
          {currentView === 'Pending Users' && (
            <>
              <Typography variant="h4" className="text-primary mb-4">Pending Users</Typography>
              {pendingUsers.length ? (
                pendingUsers.map((user) => (
                  <Box key={user.userId} className="mb-3">
                    <Typography>
                      {user.username} - {user.email}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => approveUser(user.userId)} sx={{ marginRight: 2 }}>
                      Approve
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => rejectUser(user.userId)}>
                      Reject
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No pending users</Typography>
              )}
            </>
          )}

          {currentView === 'Approved Students' && (
            <>
              <Typography variant="h4" className="text-primary mb-4">Approved Students</Typography>
              {students.map((student) => (
                <Box key={student.userId} className="mb-3">
                  <Typography>
                    {student.username} - {student.email}
                  </Typography>
                  <Button variant="contained" color="error" onClick={() => deleteStudent(student.userId)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </>
          )}

          {currentView === 'Approved Professors' && (
            <>
              <Typography variant="h4" className="text-primary mb-4">Approved Professors</Typography>
              {professors.map((professor) => (
                <Box key={professor.userId} className="mb-3">
                  <Typography>
                    {professor.username} - {professor.email}
                  </Typography>
                  <Button variant="contained" color="error" onClick={() => suspendProfessor(professor.userId)}>
                    Suspend
                  </Button>
                </Box>
              ))}
            </>
          )}

          {currentView === 'Pending Courses' && (
            <>
              <Typography variant="h4" className="text-primary mb-4">Pending Courses</Typography>
              {pendingCourses.length > 0 ? (
                pendingCourses.map((course) => (
                  <Box key={course.courseId} className="mb-3">
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography>
                      {course.description} <br />
                      Start Date: {new Date(course.startDate).toLocaleDateString()}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => approveCourse(course.courseId)} sx={{ marginRight: 2 }}>
                      Approve
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => rejectCourse(course.courseId)}>
                      Reject
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography>No pending courses</Typography>
              )}
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default RegistrarDashboard;
