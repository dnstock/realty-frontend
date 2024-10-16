import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
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
                  <TableCell>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                  <TableCell>
                    {typeof value === 'object' && value !== null
                      ? JSON.stringify(value)
                      : value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

ViewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
};

export default ViewDialog;
