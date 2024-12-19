import { useState, useEffect } from 'react';
import { useContent } from 'context';
import { Icons, StyledDataGrid } from 'theme';
import withRowActions from './withRowActions';

const ResourceDataGrid = ({ columnsWithActions, resource, state, dispatchers, handlers }) => {
  const { addActions, updateActions } = useContent();
  const [selectedRows, setSelectedRows] = useState([]);

  // Add buttons to the toolbar
  useEffect(() => {
    addActions([
      { label: 'Flag', icon: Icons.Flag, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      { label: 'Unflag', icon: Icons.FlagOff, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      { label: 'Add Note', icon: Icons.NoteAdd, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      'divider',
    ], 'start');
  }, []);

  // Update button state when selected rows change
  useEffect(() => {
    updateActions(
      ['Flag', 'Unflag', 'Add Note'],
      { props: { disabled: selectedRows.length === 0 }}
    );
  }, [selectedRows]);

  const handleRowClick = (params) => {
    handlers?.handleView && handlers.handleView(params.row.id);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  return (
    <StyledDataGrid
      rows={state.data}
      columns={columnsWithActions}
      checkboxSelection
      disableRowSelectionOnClick
      loading={state.loading}
      autoHeight
      pagination
      pageSizeOptions={[10, 25, 50, 100]}
      paginationModel={{
        page: state.page,
        pageSize: state.pageSize,
        rowCount: state.totalCount,
      }}
      onPaginationModelChange={(params) => {
        dispatchers.setPage(params.page);
        dispatchers.setPageSize(params.pageSize);
      }}
      onRowSelectionModelChange={handleSelectionChange}
      onRowClick={handleRowClick}
    />
  );
};

export default withRowActions(ResourceDataGrid);
