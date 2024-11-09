import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { useToast } from 'hooks';
import { CardBox, PaddedButton } from 'theme';
import { useAuth, useContent } from 'context';

const Login = () => {
  const { setTitle } = useContent();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: null, password: null, general: null });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: null, password: null, general: null });
    setLoading(true);

    try {
      await login(credentials);
      showSuccess('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setErrors({
        email: errorMessage.toLowerCase().includes('email') ? errorMessage : null,
        password: errorMessage.toLowerCase().includes('password') ? errorMessage : null,
        general: errorMessage,
      });
      showError('Login failed');
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setTitle('Login to Your Account');
  }, []);

  return (
    <>
      <CardBox>
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
              autoComplete='email'
              error={!!errors.email}
              // helperText={errors.email}
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
              error={!!errors.password}
              // helperText={errors.password}
            />
          </Box>

          {errors.general && (
            <Typography variant='body2' color='error' sx={{ mt: 2 }}>
              {errors.general}
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
    </>
  );
};

export default Login;
