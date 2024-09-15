import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { FlexBox, CardBox, PaddedButton } from '../theme/styledComponents';
import useToast from '../components/ToastNotification';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(credentials);
      showSuccess('Login successful');
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      showError('Login failed');
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FlexBox>
      <CardBox minWidth='400px'>
        <Typography variant='h5' component='h2' gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box mb={2}>
            <TextField
              fullWidth
              label='Email'
              type='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              required
              variant='outlined'
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label='Password'
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              required
              variant='outlined'
            />
          </Box>

          {error && (
            <Typography variant='body2' color='error' sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box mt={3}>
            <PaddedButton
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </PaddedButton>
          </Box>
        </form>
      </CardBox>
    </FlexBox>
  );
};

export default Login;
