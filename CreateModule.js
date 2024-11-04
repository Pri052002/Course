import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Divider
} from '@mui/material';

const CreateCourse = () => {
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    modules: [], // Array to hold module objects
  });

  const [newModule, setNewModule] = useState({
    title: '',
    content: '',
    order: 0,
  });

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5033/api/Courses", newCourse);
      alert('Course created successfully!');
      setNewCourse({ title: '', description: '', startDate: '', endDate: '', price: 0, modules: [] }); // Reset form
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please check your input.');
    }
  };

  const handleModuleSubmit = (e) => {
    e.preventDefault();
    // Validate the module before adding it
    if (!newModule.title || !newModule.content || newModule.order <= 0) {
      alert('Please fill in all module fields correctly.');
      return;
    }

    setNewCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, { ...newModule, courseId: 0 }] // courseId is set later in the backend
    }));

    // Reset new module form
    setNewModule({ title: '', content: '', order: 0 });
  };

  return (
    <Box 
      sx={{
        maxWidth: 700,
        margin: 'auto',
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
        }}
      >
        Create New Course
      </Typography>

      <form onSubmit={handleCourseSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Course Title"
              fullWidth
              margin="normal"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Course Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              value={newCourse.startDate}
              onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              margin="normal"
              value={newCourse.endDate}
              onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Course Price"
              type="number"
              fullWidth
              margin="normal"
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>

        {/* Module Creation */}
        <Divider sx={{ marginY: 3 }} />
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Add Module
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Module Title"
              fullWidth
              margin="normal"
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Module Content"
              fullWidth
              multiline
              rows={2}
              margin="normal"
              value={newModule.content}
              onChange={(e) => setNewModule({ ...newModule, content: e.target.value })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Module Order"
              type="number"
              fullWidth
              margin="normal"
              value={newModule.order}
              onChange={(e) => setNewModule({ ...newModule, order: parseInt(e.target.value) })}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleModuleSubmit} 
            sx={{ marginRight: 1, paddingX: 4, borderRadius: 8 }}
          >
            Add Module
          </Button>

          <Button 
            type="submit" 
            variant="contained" 
            color="success" 
            sx={{ paddingX: 4, borderRadius: 8 }}
          >
            Create Course
          </Button>
        </Box>
      </form>

      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ marginTop: 4, color: '#424242', fontWeight: 'bold' }}
      >
        Added Modules:
      </Typography>

      <List>
        {newCourse.modules.map((module, index) => (
          <Paper key={index} elevation={2} sx={{ padding: 2, marginBottom: 1, borderRadius: 2 }}>
            <ListItem>
              <ListItemText 
                primary={module.title} 
                secondary={`Order: ${module.order}`} 
                sx={{ color: '#424242' }} 
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default CreateCourse;
