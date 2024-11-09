import { useState, useEffect } from 'react';
import { useContent } from 'context';
import { Icons, StyledDataGrid } from 'theme';
import withRowActions from './withRowActions';

const ResourceTable = ({ columns, state, dispatch, handlers }) => {
  const { addActions, updateActions } = useContent();
  const [selectedRows, setSelectedRows] = useState([]);

  // Add buttons to the toolbar
  useEffect(() => {
    addActions([
      { label: 'Flag', icon: Icons.FlagOn, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      { label: 'Unflag', icon: Icons.FlagOff, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      { label: 'Add Note', icon: Icons.NoteAdd, color: 'secondary', onClick: () => {},
        props: { disabled: selectedRows.length === 0 },
      },
      'hr',
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
      columns={columns}
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
        dispatch({ type: 'SET_PAGE', payload: params.page });
        dispatch({ type: 'SET_PAGE_SIZE', payload: params.pageSize });
      }}
      onRowSelectionModelChange={handleSelectionChange}
      onRowClick={handleRowClick}
    />
  );
};

export default withRowActions(ResourceTable);
