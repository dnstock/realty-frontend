import { Box, TextField, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { GridPagination } from '@mui/x-data-grid';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { PaginationFooterDivider } from 'theme';

const CustomPagination = (props) => {
  const { state, dispatchers } = props;
  const totalPages = Math.ceil(state.totalCount / state.pageSize);
  const startItem = (state.page * state.pageSize) + 1;
  const endItem = Math.min((state.page + 1) * state.pageSize, state.totalCount);

  const paginationProps = {
    ...props,
    slots: {
      ...props.slots,
      displayedRows: () => null,
      actions: {
        previousButton: () => null,
        nextButton: () => null,
      },
    },
    slotProps: {
      ...props.slotProps,
      select: {
        'aria-label': 'rows per page'
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const page = parseInt(event.target.value) - 1;
      if (page >= 0 && page < totalPages) {
        dispatchers.setPage(page);
      }
    }
  };

  const goToFirst = () => dispatchers.setPage(0);
  const goToLast = () => dispatchers.setPage(totalPages - 1);

  const goToPrev = () => dispatchers.setPage(state.page - 1);
  const goToNext = () => dispatchers.setPage(state.page + 1);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <GridPagination {...paginationProps} />

      <PaginationFooterDivider/>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 1 }}>
        <TextField
          size="small"
          type="number"
          label="Page"
          slotProps={{
            input: {
              min: 1,
              max: totalPages,
              'aria-label': 'Page number'
            }
          }}
          defaultValue={state.page + 1}
          onKeyDown={handleKeyDown}
          sx={{ width: 60 }}
        />
        <span>of {totalPages}</span>
      </Box>

      <PaginationFooterDivider/>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <Tooltip title="First page">
          <span> {/* Workaround for tooltip positioning */}
          <IconButton onClick={goToFirst} disabled={state.page === 0}>
            <FirstPage />
          </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Previous page">
          <span>
          <IconButton onClick={goToPrev} disabled={state.page === 0}>
            <NavigateBefore />
          </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Next page">
          <span>
          <IconButton onClick={goToNext} disabled={state.page === totalPages - 1}>
            <NavigateNext />
          </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Last page">
          <span>
          <IconButton onClick={goToLast} disabled={state.page === totalPages - 1}>
            <LastPage />
          </IconButton>
          </span>
        </Tooltip>
      </Box>

      <PaginationFooterDivider/>

      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 1 }}>
        {state.loading ? (
          <CircularProgress size={16} />
        ) : (
          `Showing ${startItem}-${endItem} of ${state.totalCount} items`
        )}
      </Typography>
    </Box>
  );
};

export default CustomPagination;
