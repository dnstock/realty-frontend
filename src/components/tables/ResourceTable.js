import { useState, useEffect } from 'react';
import { StyledDataGrid } from 'theme';
import { Button } from '@mui/material';
import { useDialog } from 'hooks';
import { 
  useToast, 
  ViewDialog, 
  EditDialog, 
  DeleteDialog, 
  ActionButtons 
} from 'components';
import { useDeviceType } from 'hooks';
import { retryOperation } from 'utils';

const ResourceTable = ({ baseColumns, state, dispatch, onEdit, onDelete }) => {
  const { isMobile, isTablet } = useDeviceType();
  
  // Use custom hooks for each dialog state management
  const viewDialog = useDialog();
  const editDialog = useDialog();
  const deleteDialog = useDialog();
  
  const [deletedRow, setDeletedRow] = useState(null);
  const { showError, showSuccess, closeNotification } = useToast();

  const handleConfirmDelete = async () => {
    const rowToDelete = deleteDialog.data;
    try {
      setDeletedRow(rowToDelete);
      await retryOperation(() => onDelete(rowToDelete.id), { retries: 3, delay: 1000 });
      deleteDialog.closeDialog();

      showSuccess(`Row with ID ${rowToDelete.id} deleted`, {
        action: (key) => (
          <Button onClick={() => handleUndoDelete(key)}>Undo</Button>
        ),
      });
    } catch (error) {
      showError(error.response?.status === 400
        ? 'Cannot delete: Validation error.'
        : `Failed to delete row with ID ${rowToDelete.id}. Please try again later.`
      );
    }
  };

  const handleUndoDelete = (notificationKey) => {
    if (deletedRow) {
      dispatch({ type: 'ADD_ROW', payload: deletedRow });
      showSuccess(`Deletion of row with ID ${deletedRow.id} undone`);
      setDeletedRow(null);
    }
    closeNotification(notificationKey);
  };

  const [columns, setColumns] = useState([
    ...baseColumns,
    {
      field: 'actions',
      headerName: 'Actions',
      // minWidth: 140,
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <ActionButtons
          row={params.row}
          onView={viewDialog.openDialog}
          onEdit={editDialog.openDialog}
          onDelete={deleteDialog.openDialog}
        />
      ),
    },
  ]);

  useEffect(() => {
    if (isMobile) {
      setColumns(columns.map(col => ({ ...col, flex: col.flex / 2 }))); // Reduce flex by half for mobile
    } else if (isTablet) {
      setColumns(columns.map(col => ({ ...col, flex: col.flex * 0.75 }))); // Slightly reduce flex for tablet
    }
  }, [isMobile, isTablet]);

  return (
    <>
      <StyledDataGrid
        rows={state.data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
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
      />
      <ViewDialog open={viewDialog.isOpen} onClose={viewDialog.closeDialog} row={viewDialog.data} />
      <EditDialog open={editDialog.isOpen} onClose={editDialog.closeDialog} row={editDialog.data} onEdit={onEdit} />
      <DeleteDialog open={deleteDialog.isOpen} onClose={deleteDialog.closeDialog} row={deleteDialog.data} onConfirmDelete={handleConfirmDelete} />
    </>
  );
};

export default ResourceTable;
