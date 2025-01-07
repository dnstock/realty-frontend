import { capitalize } from '@mui/material/utils';
import { IconButton } from '@mui/material';
import { Icons } from 'theme';
import { useDialog } from 'context';
import { apiService } from 'services';

const withRowActions = (WrappedComponent) => {
  return function _({ state, flaggable, noteable, ...props }) {
    const { columns } = state.resource;
    const { openDialog } = useDialog();

    // Define row actions and their configurations.
    const rowActionsConfig = {
      noteable: {
        key: 'note',
        isActionOn: (row) => {
          return row.notes?.length > 0;
        },
        handler: async (params, isActionOn) => {
          try {
            const { api: grid, row } = params;
            openDialog('QuickNotes', row);

            const updatedStatus = isActionOn(row);
          } catch (error) {
            console.error('Failed to toggle notes icon:', error);
          }
        },
      },
      flaggable: {
        key: 'flag',
        color: 'warning',
        isActionOn: (row) => {
          return row.is_flagged;
        },
        handler: async (params, isActionOn) => {
          try {
            const { api: grid, row } = params;
            const updatedStatus = !isActionOn(row);
            await apiService.resourceUpdate(state.resource, row.id, { is_flagged: updatedStatus });
            grid.updateRows([{ ...row, is_flagged: updatedStatus }]);
          } catch (error) {
            console.error('Failed to toggle flag icon:', error);
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
      isActionOn = () => true, // always "on" if undefined in row action config
      Icon = Icons[header],
      color = 'primary',
      IconOff = Icons[header+'Off'],
      colorOff = 'disabled',
      props = {}
    }) => {
      if (!columnsWithActions.find((c) => c.field === key)) {
        columnsWithActions.push({
          cellClassName: 'row-action-cell',
          field: key,
          headerName: header,
          align: 'center',
          headerAlign: 'center',
          flex: props.flex || 0.5,
          minWidth: props.minWidth || 50,
          renderCell: (params) => (
            <IconButton
              color={isActionOn(params.row) ? color : colorOff}
              onClick={(e) => {
                e.stopPropagation();
                handler(params, isActionOn);
              }}
            >
              {isActionOn(params.row) ? <Icon /> : <IconOff />}
            </IconButton>
          ),
        });
      }
    });

    return <WrappedComponent columnsWithActions={columnsWithActions} state={state} {...props} />;
  };
};

export default withRowActions;
