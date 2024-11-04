import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import './Homepage.css';

const Homepage = () => {
    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'url(https://source.unsplash.com/random/1600x900) no-repeat center center',
                backgroundSize: 'cover',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Kinston University
                </Typography>
                <Typography variant="h6" paragraph>
                    Manage your academic journey easily with our platform.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" size="large">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary" size="large">
                            Register
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default Homepage;
