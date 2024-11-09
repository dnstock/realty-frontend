import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { retryOperation } from 'utils';
import { useToast } from 'hooks';

const ConfirmDeleteDialog = ({ open, onClose, row, onConfirmDelete }) => {
  const { showError, showSuccess, closeNotification } = useToast();
  const [deletedRow, setDeletedRow] = useState(null);

  const handleConfirmDelete = async () => {
    try {
      setDeletedRow(row);
      await retryOperation(() => onConfirmDelete(row.id), { retries: 3, delay: 1000 });
      onClose(); // Close dialog

      showSuccess(`Row with ID ${row.id} deleted`, {
        action: (key) => (
          <Button onClick={() => handleUndoDelete(key)}>Undo</Button>
        ),
      });
    } catch (error) {
      showError(error.response?.status === 400
        ? 'Cannot delete: Validation error.'
        : `Failed to delete row with ID ${row.id}. Please try again later.`
      );
    }
  };

  const handleUndoDelete = (notificationKey) => {
    if (deletedRow) {
      // dispatch({ type: 'ADD_ROW', payload: deletedRow });
      showSuccess(`Deletion of row with ID ${deletedRow.id} undone`);
      setDeletedRow(null);
    }
    closeNotification(notificationKey);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the row with ID: {row?.id}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleConfirmDelete(row)} color="secondary">Confirm Delete</Button>
      </DialogActions>
    </Dialog>
  )
};

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  onConfirmDelete: PropTypes.func,
};

export default ConfirmDeleteDialog;
