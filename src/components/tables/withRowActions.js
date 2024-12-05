import { capitalize } from '@mui/material/utils';
import { IconButton } from '@mui/material';
import { Icons } from 'theme';
import { useDialog } from 'context';

const withRowActions = (WrappedComponent) => {
  return function _({ columns, flaggable, noteable, ...props }) {
    const { openDialog } = useDialog();

    // Define row actions and their configurations.
    const rowActionsConfig = {
      noteable: {
        key: 'note',
        toggleable: true,
        handler: async (row) => {
          openDialog('QuickNotes', row);
        },
      },
      flaggable: {
        key: 'flag',
        toggleable: true,
        handler: async (row) => {
          try {
            const updatedStatus = !row.isFlagged; // Toggle status
            // await api.updateRowActionStatus('flag', row.id, updatedStatus);

            // Optimistically update the row in state or re-fetch data if necessary
            // setSelectedRows((prevRows) =>
            //   prevRows.map((r) => (r.id === row.id ? { ...r, isFlagged: updatedFlagStatus } : r))
            // );
          } catch (error) {
            console.error('Failed to toggle flag:', error);
          }
        },
      },
    };

    const rowActions = [
      flaggable && rowActionsConfig.flaggable,
      noteable && rowActionsConfig.noteable,
    ].filter(Boolean);

    const columnsWithActions = [...columns];

    rowActions.forEach(({
      key,
      handler,
      header = capitalize(key),
      toggleable = false,
      icon = Icons[header],
      iconActive = Icons[header+'Active'],
      iconInactive = Icons[header+'Inactive'],
      props = {}
    }) => {
      if (!columnsWithActions.find((c) => c.field === key)) {
        const IconComponent = (toggleable && iconInactive) || icon;
        columnsWithActions.push({
          cellClassName: 'row-action-cell',
          field: key,
          headerName: header,
          align: 'center',
          headerAlign: 'center',
          flex: props.flex || 0.5,
          minWidth: props.minWidth || 50,
          icons: (toggleable && { active: iconActive, inactive: iconInactive }) || {},
          renderCell: (params) => (
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click event
                handler(params.row);
              }}
            >
              <IconComponent />
            </IconButton>
          ),
        });
      }
    });

    return <WrappedComponent columns={columnsWithActions} {...props} />;
  };
};

export default withRowActions;
