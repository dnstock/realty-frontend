import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper,
  Typography
} from '@mui/material';
import { SecondaryButton } from 'theme';
import PropTypes from 'prop-types';

const ViewDialog = ({ open, onClose, row }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Property Details</DialogTitle>
    <DialogContent>
      {row && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(row).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell sx={{verticalAlign: 'top'}}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                  <TableCell>
                    <Typography variant='pre'>
                    { typeof value === 'object' && value !== null
                      ? JSON.stringify(value, null, 2)
                      : value }
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DialogContent>
    <DialogActions>
      <SecondaryButton onClick={onClose}>Close</SecondaryButton>
    </DialogActions>
  </Dialog>
);

ViewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
};

export default ViewDialog;
