import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';

const ActionButtons = ({ row, onView, onEdit, onDelete }) => (
  <>
    <IconButton
      title="Quick View"
      color="primary"
      onClick={() => onView(row)}
    >
      <VisibilityIcon />
    </IconButton>
    <IconButton
      title="Quick Edit"
      color="primary"
      onClick={() => onEdit(row)}
    >
      <EditIcon />
    </IconButton>
    <IconButton
      color="secondary"
      onClick={() => onDelete(row)}
    >
      <DeleteIcon />
    </IconButton>
  </>
);

ActionButtons.propTypes = {
  row: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionButtons;
