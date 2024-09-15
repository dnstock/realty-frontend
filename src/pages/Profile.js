import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Stack } from '@mui/material';
import useToast from '../components/ToastNotification';
import { FlexBox, CardBox } from '../theme/styledComponents';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/ApiService';

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
      await apiService.updateUserProfile(profileData);
      showSuccess('Profile updated successfully');
    } catch (error) {
      showError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox>
      <CardBox minWidth='400px'>
        <Typography variant='h4' gutterBottom>
          Profile
        </Typography>

        <Stack spacing={2}>
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

          {error && (
            <Typography variant='body2' color='error'>
              {error}
            </Typography>
          )}

          <Box display='flex' justifyContent='flex-end'>
            <Button onClick={handleSave} variant='contained' disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Stack>
      </CardBox>
    </FlexBox>
  );
};

export default Profile;
