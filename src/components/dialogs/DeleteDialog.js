import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteDialog = ({ open, onClose, row, onConfirmDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete the row with ID: {row?.id}?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirmDelete} color="secondary">
        Confirm Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  onConfirmDelete: PropTypes.func.isRequired,
};

export default DeleteDialog;
