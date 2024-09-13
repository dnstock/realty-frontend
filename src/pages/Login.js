import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Typography, Grid, CircularProgress } from '@mui/material';
import { FlexBox, CardGrid, PaddedButton } from '../theme/styledComponents';
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
      <CardGrid container spacing={2} direction='column' justifyContent='center' alignItems='center' maxWidth='400px'>
        <Grid item>
          <Typography variant='h5' component='h2' gutterBottom>
            Login
          </Typography>
        </Grid>

        <Grid item>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>

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
        </Grid>
      </CardGrid>
    </FlexBox>
  );
};

export default Login;
