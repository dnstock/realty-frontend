import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from 'services';
import { useContent, useDialog } from 'context';
import { theme, Icons, ContentLoadingBox, ContentActionButton, ContentIconButton } from 'theme';
import { useFormControl, Typography, Link, Box, Paper, Stack, TextField, Button } from '@mui/material';
import { AppResources } from 'config';
import { useDeviceType, useToast } from 'hooks';
import { ResourceDataGrid } from 'components';

const NotesHelperTextWithFocus = () => {
  const formControl = useFormControl();

  return (
    <Typography
      variant='caption'
      sx={{
        position: 'absolute',
        opacity: formControl?.focused ? 1 : 0,
        transition: 'opacity 200ms ease-in-out',
        color: 'text.secondary',
      }}
    >
      Notes are private and only visible to you
    </Typography>
  );
};

const ResourceView = ({ resource }) => {
  const { id } = useParams();
  const { isMobile } = useDeviceType();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { addActions, updateActions } = useContent();
  const [data, setData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  useEffect(() => {
    let mounted = true;
    apiService.resourceRead(resource, id)
      .then(response => {
        if(!mounted) return;
        const parent_id = response.resource_info.parent ? response[response.resource_info.parent + '_id'] : null;
        const configs = {
          resource: AppResources[response.resource_info.name],
          parent: response.resource_info.parent && AppResources[response.resource_info.parent] || null,
          child: response.resource_info.child && AppResources[response.resource_info.child] || null,
        }
        setData({
          ...response,
          configs,
          parent_id,
        });
        setTempNotes(response.notes);
        addActions([
          {
            key: 'flag',
            icon: response.is_flagged ? Icons.Flag : Icons.FlagOff,
            color: response.is_flagged ? 'warning' : 'default',
            onClick: toggleFlag,
          },
          {
            label: 'Edit',
            icon: Icons.Edit,
            color: 'secondary',
            onClick: () => navigate(resource.routes.editPath({ id })),
          },
          {
            label: 'Delete',
            icon: Icons.Delete,
            color: 'secondary',
            onClick: () => openDialog('ConfirmDelete', data),
          },
          'divider',
        ], 'start');
      })
      .catch(error => {
        if(!mounted) return;
        const errorMsg = `Failed to fetch ${resource.name.singular} data`;
        setLoadingError(errorMsg);
        console.error(errorMsg + ':', error);
      });

    return () => mounted = false;
  }, [id, resource]);

  const toggleFlag = async () => {
    try {
      setData(prev => {
        const updated = {
          ...prev,
          is_flagged: !prev.is_flagged
        };
        apiService.resourceUpdate(resource, id, { is_flagged: updated.is_flagged });
        updateActions('flag', {
          icon: updated.is_flagged ? Icons.Flag : Icons.FlagOff,
          color: updated.is_flagged ? 'warning' : 'default',
        });
        showSuccess(`${resource.name.singularTitle} has been ${updated.is_flagged ? 'flagged' : 'unflagged'}`);
        return updated;
      });
    } catch (error) {
      showError('Failed to update flag status');
      console.error('Failed to update flag status:', error);
    }
  };

  useContent({
    title: resource.name.singularTitle + ' Details',
    actions: [
      {
        key: 'back',
        label: `All ${resource.name.pluralTitle}`,
        icon: Icons.Back,
        onClick: () => navigate(resource.routes.index)
      },
    ],
  });

  return (
    <>
      {!data ? (
        <ContentLoadingBox />
      ) : loadingError ? (
        <Typography color='error'>{loadingError}</Typography>
      ) : (

        <Stack
          spacing={2}
          flex={1}
          // border={'3px solid gray;'} // For Debugging
        >
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={2}
            // border={'3px solid teal;'} // For Debugging
          >
            <Stack
              spacing={1}
              // border={'3px solid red;'} // For Debugging
              flex={1}
            >
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                borderBottom={1}
                borderColor={theme.fdsGray30}
                // border={'3px solid green;'} // For Debugging
              >
                <Typography variant='h5'>
                  {data.name}
                </Typography>
                <Button
                  variant='text'
                  color='secondary'
                  size='large'
                  sx={{ minWidth: 0, height: 'fit-content', lineHeight: 'inherit' }}
                  startIcon={<Icons.Edit sx={{ width: 17, height: 17 }} />}
                >
                  Edit
                </Button>
              </Box>
              <Box
                display='flex'
                flexDirection={{ xs: 'column', md: 'row' }}
                gap={2}
                alignItems='flex-start'
                // border={'3px solid orange;'} // For Debugging
              >
                <Stack flex={1}
                  // border={'3px solid pink;'} // For Debugging
                >
                  <Stack direction='row' spacing={2}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', minWidth: 80 }}>
                      Address:
                    </Typography>
                    <Typography variant='body1'>{data.address}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', minWidth: 80 }}>
                      City:
                    </Typography>
                    <Typography variant='body1'>{data.city}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', minWidth: 80 }}>
                      State:
                    </Typography>
                    <Typography variant='body1'>{data.state}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', minWidth: 80 }}>
                      Zip:
                    </Typography>
                    <Typography variant='body1'>{data.zip_code}</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', minWidth: 80 }}>
                      Type:
                    </Typography>
                    <Typography variant='body1'>{data.type}</Typography>
                  </Stack>
                </Stack>
                <Paper
                  variant='outlined'
                  sx={{
                    display: 'flex',
                    borderRadius: .8,
                  }}
                >
                  <Stack
                    direction='row'
                    spacing={0}
                    padding={0}
                  >
                    <Box
                      sx={{
                        bgcolor: 'grey.100',
                        px: 2,
                        py: .8,
                        borderRight: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant='body1'>
                        {data.configs.parent.name.singularTitle}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 2,
                        py: .8,
                      }}
                    >
                      <Typography variant='body1'>
                        <Link href=''>
                          {data.manager.name}
                        </Link>
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
            <Stack
              spacing={2}
              flex={1}
              // border={'3px solid orange;'} // For Debugging
            >
              <TextField
                fullWidth
                multiline
                minRows={5}
                maxRows={10}
                variant='outlined'
                label='Notes'
                placeholder='Type some notes...'
                helperText={<NotesHelperTextWithFocus />}
                value={tempNotes || ''}
                onChange={(e) => setTempNotes(e.target.value)}
                onBlur={async (e) => {
                  try {
                    const notes = e.target.value.length ? e.target.value : null;
                    if(notes === data.notes) return;
                    await apiService.resourceUpdate(resource, id, { notes: notes });
                    setData(prev => ({ ...prev, notes }));
                    showSuccess('Notes saved successfully');
                  } catch (error) {
                    showError('Failed to save notes');
                    console.error('Failed to save notes:', error);
                  }
                }}
              />
            </Stack>
          </Box>
          <Stack
            spacing={1}
            flex={1}
            // border={'3px solid blue;'} // For Debugging
          >
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              // border={'3px solid green;'} // For Debugging
            >
              <Typography variant='h5'>
                {data.configs.child.name.pluralTitle}
              </Typography>
              {isMobile && (
                <ContentIconButton
                  color='primary'
                  onClick={() => navigate(data.configs.child.routes.create)}
                  sx={{ marginTop: -1 }}
                >
                  <Icons.Add />
                </ContentIconButton>
              ) || (
                <ContentActionButton
                  color='primary'
                  startIcon={<Icons.Add />}
                  onClick={() => navigate(data.configs.child.routes.create)}
                  sx={{ marginTop: -1 }}
                >
                  New {data.configs.child.name.singularTitle}
                </ContentActionButton>
              )}
            </Box>
            <ResourceDataGrid
              resource={data.configs.child}
              resourceParent={{
                name: data.configs.resource.name.plural,
                id: data.id,
              }}
              handlers={{
                handleView: (id) => navigate(data?.configs.child.routes.viewPath({ id })),
                handleEdit: (id) => navigate(data?.configs.child.routes.editPath({ id })),
                handleDelete: ({ row }) => openDialog('ConfirmDelete', row),
              }}
              flaggable
              noteable
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ResourceView;
