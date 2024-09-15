import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Stack } from '@mui/material';
import { FlexBox, CardBox, PaddedButton, SecondaryButton } from '../theme/styledComponents';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <FlexBox>
      <CardBox minWidth='400px'>
        <Stack spacing={3} direction="column" alignItems="center">
          <Typography variant='h4' component='h1' gutterBottom>
            {isAuthenticated() ? 'Welcome back!' : 'Welcome to Realty App'}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {isAuthenticated()
              ? 'Access your dashboard or log out below.'
              : 'Please log in to access your dashboard.'}
          </Typography>
          {isAuthenticated() ? (
            <Stack direction="row" spacing={2}>
              <PaddedButton
                variant='contained'
                color='primary'
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </PaddedButton>
              <SecondaryButton
                marginTop={0}
                marginLeft={10}
                variant='outlined'
                color='secondary'
                onClick={() => navigate('/logout')}
              >
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
    </FlexBox>
  );
};

export default Home;
