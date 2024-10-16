import { useNavigate } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';
import { CardBox, PaddedButton, SecondaryButton } from 'theme';
import { ContentWrapper } from 'components';
import { useAuth } from 'context';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <ContentWrapper title='Hmmm...'>
    <CardBox>
      <Stack spacing={3} direction="column" alignItems="center">
        <Typography variant='h2' component='h1' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' gutterBottom>
          The page you are looking for does not exist.
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
  </ContentWrapper>
  );
};

export default NotFoundPage;
