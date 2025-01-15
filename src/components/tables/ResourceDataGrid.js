import { useState, useEffect } from 'react';
import { useContent } from 'context';
import { useCaseInsensitiveSearchParams, useGridData } from 'hooks';
import { Icons, StyledDataGrid, StyledDataGridContainer } from 'theme';
import withRowActions from './withRowActions';
import CustomPagination from './CustomPagination';

const ResourceDataGrid = ({ columnsWithActions, handlers, bulkActions, resource, resourceParent, initialPage=0, initialPageSize=10, pageSizeOptions=[10, 25, 50] }) => {
  const { rows, rowCount, loading, fetchRows } = useGridData({ resource, parent: resourceParent });
  const { addActions, updateActions } = useContent();
  const [searchParams, setSearchParams] = useCaseInsensitiveSearchParams();
  const [selectedRows, setSelectedRows] = useState([]);
  const initialPagination = {
    page: Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) - 1 : initialPage, // 0-indexed
    pageSize: pageSizeOptions.includes(Number(searchParams.get('page_size'))) ? Number(searchParams.get('page_size')) : initialPageSize,
  };

  useEffect(() => {
    // Add buttons to the page content toolbar
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
    // Fetch initial data
    handlePaginationModelChange(initialPagination);
  }, []);

  // Update state of page content buttons when selected rows change
  useEffect(() => {
    if(bulkActions) {
      updateActions(
        ['flag', 'unflag', 'add-note'],
        { props: { disabled: selectedRows.length === 0 }}
      );
    }
  }, [selectedRows]);

  const handlePaginationModelChange = ({ page, pageSize }) => {
    // Validate page and page_size
    if(Number(page) < 0 || !pageSizeOptions.includes(Number(pageSize))) return;

    // Update URL first
    setSearchParams({ page: page + 1, page_size: pageSize }); // 0-indexed

    // Then update grid
    fetchRows({ page, pageSize });
  };

  const handleRowClick = (params) => handlers?.handleView?.(params.row.id);

  const handleSelectionChange = (newSelection) => setSelectedRows(newSelection);

  return (
    <StyledDataGridContainer>
      <StyledDataGrid
        rows={rows}
        columns={columnsWithActions}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        loading={loading}
        pagination
        paginationMode='server'
        // keepNonExistentRowsSelected // Prevents deselection of rows when page changes
        rowCount={rowCount}
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: { paginationModel: initialPagination }
        }}
        onPaginationModelChange={handlePaginationModelChange}
        checkboxSelection={!!bulkActions}
        onRowSelectionModelChange={bulkActions && handleSelectionChange}
        slots={{
          pagination: () => CustomPagination({ pageSizeOptions }),
        }}
      />
    </StyledDataGridContainer>
  );
};

export default withRowActions(ResourceDataGrid);
