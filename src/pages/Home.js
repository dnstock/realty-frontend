import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';
import { CardBox, PaddedButton, SecondaryButton } from 'theme';
import { useAuth, useContent } from 'context';

const Home = () => {
  const { setTitle } = useContent();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Realty Platform');
  }, []);

  return (
    <>
      <CardBox>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography variant='h2' component='h1' gutterBottom>
            {isAuthenticated ? `Hi ${user.name}, welcome back!` : 'The #1 property management solution.'}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {isAuthenticated
              ? 'Access your dashboard or log out below.'
              : 'Please log in to access your account.'}
          </Typography>
          {isAuthenticated ? (
            <Stack direction="row" spacing={2}>
              <PaddedButton
                variant='contained'
                color='primary'
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </PaddedButton>
              <SecondaryButton onClick={() => navigate('/logout')}>
                Log out
              </SecondaryButton>
            </Stack>
          ) : (
            <PaddedButton
              variant='contained'
              color='primary'
              onClick={() => navigate('/login')}
            >
              Log in
            </PaddedButton>
          )}
        </Stack>
      </CardBox>
    </>
  );
};

export default Home;
