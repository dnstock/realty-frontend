import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDialog, useContent } from 'context';
import { Icons, ContentLoadingBox } from 'theme';
import { ResourceDataGrid } from 'components';
import { useGridData } from 'hooks';

const ResourceIndex = ({ resource }) => {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { state, setPage, setPageSize } = useGridData({resource});

  useContent({
    title: resource.name.pluralTitle,
    actions: [
      {
        key: 'new',
        label: `New ${resource.name.singularTitle}`,
        icon: Icons.Add,
        onClick: () => navigate(resource.routes.create),
      },
    ],
  });

  return (
    <>
      {state.loading ? (
        <ContentLoadingBox />
      ) : state.error ? (
        <Typography color="error">{state.error}</Typography>
      ) : (
        <ResourceDataGrid
          state={state}
          dispatchers={{
            setPage,
            setPageSize,
          }}
          handlers={{
            handleView: (id) => navigate(state.resource.routes.viewPath({ id })),
            handleEdit: (id) => navigate(state.resource.routes.editPath({ id })),
            handleDelete: ({ row }) => openDialog('ConfirmDelete', row),
          }}
          bulkActions
          flaggable
          noteable
        />
      )}
    </>
  );
};

export default ResourceIndex;
