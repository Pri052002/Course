import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Box,
    CircularProgress
} from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // To show loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true); // Show loading spinner

        try {
            const response = await axios.post('http://localhost:5033/api/User/login', {
                email,
                password,
            });

            console.log('Login Response:', response.data);

            const { token, role, username, userId, roleSpecificIdKey } = response.data;

            // Save the JWT token, role, username, and userId in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem(roleSpecificIdKey, userId);

            // Navigate based on role
            switch (role) {
                case 'Student':
                    navigate('/student-dashboard');
                    break;
                case 'Professor':
                    navigate('/professor-dashboard');
                    break;
                case 'Registrar':
                    navigate('/registrar-dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } catch (error) {
            console.error('Login Error:', error);
            const errorMsg = error.response?.data || 'Login failed. Please try again.';
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '5rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleLogin}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} />}
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
