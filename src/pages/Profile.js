import { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { FlexBox, CardGrid } from '../theme/styledComponents';
import useToast from '../components/ToastNotification';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';

const Profile = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const [profileData, setProfileData] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!profileData.email || !profileData.name) {
      setError('Both name and email are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await ApiService.updateProfile(profileData);
      showSuccess('Profile updated successfully');
    } catch (error) {
      showError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox>
      <CardGrid container spacing={2} direction='column'>
        <Grid item>
          <Typography variant='h4' gutterBottom>
            Profile
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Email'
            value={profileData.email || ''}
            name='email'
            onChange={handleChange}
            required
            error={!profileData.email}
            helperText={!profileData.email && 'Email is required'}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Name'
            value={profileData.name || ''}
            name='name'
            onChange={handleChange}
            required
            error={!profileData.name}
            helperText={!profileData.name && 'Name is required'}
          />
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography variant='body2' color='error'>
              {error}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button onClick={handleSave} variant='contained' disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Grid>
      </CardGrid>
    </FlexBox>
  );
};

export default Profile;
