import { useNavigate } from 'react-router-dom';
import { useDialog, useContent } from 'context';
import { Icons } from 'theme';
import { ResourceDataGrid } from 'components';

const ResourceIndex = ({ resource }) => {
  const navigate = useNavigate();
  const { openDialog } = useDialog();

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
    <ResourceDataGrid
      resource={resource}
      handlers={{
        handleView: (id) => navigate(resource.routes.viewPath({ id })),
        handleEdit: (id) => navigate(resource.routes.editPath({ id })),
        handleDelete: ({ row }) => openDialog('ConfirmDelete', row),
      }}
      bulkActions
      flaggable
      noteable
    />
  );
};

export default ResourceIndex;
