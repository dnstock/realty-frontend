import { useState } from 'react';
import { Box, TextField, Typography, Stack } from '@mui/material';
import { useToast } from 'hooks';
import { useAuth, useContent } from 'context';
import { apiService } from 'services';
import { ContentActionButton, ContentLoadingText } from 'theme';

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

  useContent({ title: 'Profile' });

  return (
    <>
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
          <ContentActionButton onClick={handleSave} variant='contained' disabled={loading}>
            {loading ? <ContentLoadingText /> : 'Save Changes'}
          </ContentActionButton>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
