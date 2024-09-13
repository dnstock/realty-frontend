import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Grid } from '@mui/material';
import { FlexBox, CardGrid, PaddedButton, SecondaryButton } from '../theme/styledComponents';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <FlexBox>
      <CardGrid container spacing={3} direction='column' justifyContent='center' alignItems='center'>
        <Grid item>
          <Typography variant='h4' component='h1' gutterBottom>
            {isAuthenticated() ? 'Welcome back!' : 'Welcome to Realty App'}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {isAuthenticated()
              ? 'Access your dashboard or log out below.'
              : 'Please log in to access your dashboard.'}
          </Typography>
        </Grid>

        <Grid item>
          {isAuthenticated() ? (
            <>
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
            </>
          ) : (
            <PaddedButton
              variant='contained'
              color='primary'
              onClick={() => navigate('/login')}
            >
              Log in
            </PaddedButton>
          )}
        </Grid>
      </CardGrid>
    </FlexBox>
  );
};

export default Home;
