import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Paper,
    Grid
} from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedbackMessage('');
        setErrorMessage('');

        try {
            await axios.post('http://localhost:5033/api/User/register', {
                username,
                email,
                password,
                role,
            });

            setFeedbackMessage('Registration successful! Waiting for approval.');
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('Student');
        } catch (error) {
            const errorMsg = error.response?.data || 'Registration failed. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>

                {feedbackMessage && (
                    <Typography variant="body1" color="success" align="center">
                        {feedbackMessage}
                    </Typography>
                )}
                {errorMessage && (
                    <Typography variant="body1" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Email"
                                type="email"
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
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    label="Role"
                                >
                                    <MenuItem value="Student">Student</MenuItem>
                                    <MenuItem value="Professor">Professor</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
