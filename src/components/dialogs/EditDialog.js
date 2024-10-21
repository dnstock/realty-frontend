import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'theme';
import { EditForm } from 'components';
import PropTypes from 'prop-types';

const EditDialog = ({ open, onClose, row, onEdit }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Edit Property</Typography>
        {row && row.id && (
          <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
            Property ID: {row.id}
          </Typography>
        )}
      </Box>
    </DialogTitle>
    <DialogContent>
      {row && (
        <EditForm
          initialValues={row}
          onSubmit={(values) => {
            onEdit(values);
            onClose();
          }}
        />
      )}
    </DialogContent>
    <DialogActions>
      <PrimaryButton type="submit" form="edit-form">Save</PrimaryButton>
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
    </DialogActions>
  </Dialog>
);

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
};

export default EditDialog;
