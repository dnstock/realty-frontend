import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { retryOperation } from 'utils';
import { useToast } from 'hooks';

const QuickNotesDialog = ({ open, onClose, row }) => {
  const { showError, showSuccess } = useToast();

  const handleSaveNote = async () => {
    try {
      // await retryOperation(() =>
      //   api.updateRecord({table: tableName, id: row.id, notes: quickNotes}),
      //   { retries: 3, delay: 1000 }
      // );
      onClose(); // Close dialog
      showSuccess('Note saved!');
    } catch (error) {
      showError(error.response?.status === 400
        ? 'Cannot save note: Validation error.'
        : 'Failed to save note. Please try again later.'
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Quick Notes</DialogTitle>
      <DialogContent>
        <Typography>
          Add some notes for {row?.name}.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSaveNote(row)} color='secondary'>Save</Button>
      </DialogActions>
    </Dialog>
  )
};

QuickNotesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
};

export default QuickNotesDialog;
