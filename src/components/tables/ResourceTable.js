import { useState } from 'react';
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

const ResourceTable = ({ columns, state, dispatch, onEdit, onDelete }) => {
  // Use custom hooks for each dialog state management
  const viewDialog = useDialog();
  const editDialog = useDialog();
  const deleteDialog = useDialog();
  
  const [deletedRow, setDeletedRow] = useState(null);
  const { showError, showSuccess, closeNotification } = useToast();

  const handleConfirmDelete = () => {
    const rowToDelete = deleteDialog.data;
    setDeletedRow(rowToDelete);
    onDelete(rowToDelete.id);
    deleteDialog.closeDialog();

    showError(`Row with ID ${rowToDelete.id} deleted`, {
      action: (key) => (
        <Button onClick={() => handleUndoDelete(key)}>Undo</Button>
      ),
    });
  };

  const handleUndoDelete = (notificationKey) => {
    if (deletedRow) {
      dispatch({ type: 'ADD_ROW', payload: deletedRow });
      showSuccess(`Deletion of row with ID ${deletedRow.id} undone`);
      setDeletedRow(null);
    }
    closeNotification(notificationKey);
  };

  const updatedColumns = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 172,
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
  ];

  return (
    <>
      <StyledDataGrid
        rows={state.data}
        columns={updatedColumns}
        checkboxSelection
        disableSelectionOnClick
        disableRowSelectionOnClick
        loading={state.loading}
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
