import { useState, useEffect } from 'react';
import { useContent } from 'context';
import { Icons, StyledDataGrid, StyledDataGridContainer } from 'theme';
import withRowActions from './withRowActions';
import CustomPagination from './CustomPagination';

const ResourceDataGrid = ({ columnsWithActions, state, dispatchers, handlers, bulkActions }) => {
  const { addActions, updateActions } = useContent();
  const [selectedRows, setSelectedRows] = useState([]);

  // Add buttons to the page content toolbar
  useEffect(() => {
    if(bulkActions) {
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
    }
  }, []);

  // Update state of page content buttons when selected rows change
  useEffect(() => {
    if(bulkActions) {
      updateActions(
        ['Flag', 'Unflag', 'Add Note'],
        { props: { disabled: selectedRows.length === 0 }}
      );
    }
  }, [selectedRows]);

  const handleRowClick = (params) => {
    handlers?.handleView && handlers.handleView(params.row.id);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  return (
    <StyledDataGridContainer>
      <StyledDataGrid
        rows={state.data}
        columns={columnsWithActions}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        loading={state.loading}
        pagination
        paginationMode='server'
        rowCount={state.totalCount}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={{
          page: state.page,
          pageSize: state.pageSize,
        }}
        onPaginationModelChange={(params) => {
          dispatchers.setPage(params.page);
          dispatchers.setPageSize(params.pageSize);
        }}
        checkboxSelection={!!bulkActions}
        onRowSelectionModelChange={bulkActions && handleSelectionChange}
        slots={{
          pagination: () => <CustomPagination state={state} dispatchers={dispatchers} />
        }}
      />
    </StyledDataGridContainer>
  );
};

export default withRowActions(ResourceDataGrid);
