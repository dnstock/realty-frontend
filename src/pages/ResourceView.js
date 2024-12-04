import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from 'services';
import { useContent, useDialog } from 'context';
import { Icons, ContentLoadingBox } from 'theme';
import { Typography, Box, Paper, Stack, Divider, TextField, Button, IconButton, Switch, FormControlLabel } from '@mui/material';
import { ResourceDataGrid } from 'components';
import { useDemoData } from '@mui/x-data-grid-generator';

const ResourceView = ({ resource }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFlagged, setIsFlagged] = useState(data?.is_flagged || false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setData( await apiService.get(resource.routes.viewPath({ id })) );
      } catch (error) {
        const errorMsg = `Failed to fetch ${resource.model.singular} data`;
        setError(errorMsg);
        console.error(errorMsg + ':', error);
      }
    };
    fetchResource();
  }, [id]);

  useContent({
    title: resource.model.singular + ' Details',
    actions: [
      { label: `Edit ${resource.model.singular}`, icon: Icons.Edit, color: 'info', onClick: () => navigate(resource.routes.editPath({ id })) },
      { label: `Delete ${resource.model.singular}`, icon: Icons.Delete, color: 'error', onClick: () => openDialog('ConfirmDelete', data) },
      'divider',
      { label: `Back to ${resource.model.plural}`, icon: Icons.Back, onClick: () => navigate(resource.routes.index) },
    ],
  });

  // const gridFiller = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 13,
  //   maxColumns: 9,
  // });

  const toggleFlag = async () => {
    try {
      const newFlagStatus = !isFlagged;
      await apiService.patch(resource.routes.viewPath({ id }), { is_flagged: newFlagStatus });
      setIsFlagged(newFlagStatus);
      console.log(`Resource flag status updated to: ${newFlagStatus}`);
    } catch (error) {
      console.error('Failed to update flag status:', error);
    }
  };

  return (
    <>
      {!data ? (
        <ContentLoadingBox />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Box p={0} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Paper sx={{ flex: 1, padding: 2, boxShadow: 'none' }}>
              <Stack direction="row" spacing={0} justifyContent="flex-start">
                <IconButton color="primary" sx={{ marginTop: -1 }} > {/* onClick={toggleFlag} > */}
                  {isFlagged ? <Icons.FlagActive /> : <Icons.FlagInactive />}
                </IconButton>
                <Typography variant="h5" gutterBottom>
                  {data.name}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="body1">
                  <strong>Address:</strong> {data.address}
                </Typography>
                <Typography variant="body1">
                  <strong>City:</strong> {data.city}
                </Typography>
                <Typography variant="body1">
                  <strong>State:</strong> {data.state}
                </Typography>
                <Typography variant="body1">
                  <strong>Zip:</strong> {data.zip_code}
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {data.type}
                </Typography>
              </Stack>
            </Paper>
            <Divider orientation="vertical" flexItem />
            <Paper sx={{ flex: 1, padding: 2, boxShadow: 'none' }}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isFlagged}
                      onChange={toggleFlag}
                      color="primary"
                    />
                  }
                  label="Flag this record"
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  maxRows={10}
                  variant="outlined"
                  label="Your Notes"
                  value={data.notes || ''}
                  onChange={(e) => setData({ ...data, notes: e.target.value })}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      try {
                        await apiService.patch(resource.routes.viewPath({ id }), { notes: data.notes });
                        console.log('Notes updated successfully');
                      } catch (error) {
                        console.error('Failed to save notes:', error);
                      }
                    }}
                  >
                    Save Notes
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Related Data
            </Typography>
            {/* <ResourceDataGrid loading={gridFiller.loading} data={gridFiller.data} /> */}
          </Box>
        </>
      )}
    </>
  );
};

export default ResourceView;
