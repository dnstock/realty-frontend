import { useState } from 'react';
import { Box, TextField, Typography, IconButton, Tooltip, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useGridApiContext, useGridSelector, gridPaginationSelector, gridRowCountSelector } from '@mui/x-data-grid';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { PaginationFooterDivider } from 'theme';

const CustomPagination = (props) => {
  const { pageSizeOptions } = props;
  const apiRef = useGridApiContext();
  const pagination = useGridSelector(apiRef, gridPaginationSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);

  const page = pagination?.paginationModel?.page ?? -1;
  const pageSize = pagination?.paginationModel?.pageSize ?? -1;
  const totalRows = rowCount ?? -1;

  const totalPages = totalRows > 0 ? Math.ceil(totalRows / pageSize) : 1;
  const startItem = totalRows > 0 ? page * pageSize + 1 : 0;
  const endItem = Math.min((page + 1) * pageSize, totalRows);
  const loading = apiRef?.current?.state?.rows?.loading;
  const [tempPage, setTempPage] = useState(page + 1);
  const [pageInputWidth, setPageInputWidth] = useState(60);

  const updatePageInputWidth = (isFocused, currPage = tempPage) => {
    let width = currPage >= 1000 ? 80 : currPage >= 100 ? 70 : 60;
    setPageInputWidth(isFocused ? width + 15 : width);
  };

  // Reset the input field
  const resetTempPage = () => {
    setTempPage(page + 1);
    updatePageInputWidth(false, page + 1); // Pass newPage because setTempPage is async
  };

  const goToPage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      apiRef.current.setPage(newPage);
      setTempPage(newPage + 1);
      updatePageInputWidth(false, newPage + 1);
    } else {
      resetTempPage();
    }
  };

  const handlePageInputChange = (event) => {
    const newPage = parseInt(event.target.value, 10) - 1;
    if(!isNaN(newPage) && newPage >= 0 && newPage < totalPages) {
      setTempPage(newPage + 1);
    } else if (event.target.value === '') {
      setTempPage('');
    }
  };

  const handlePageInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newPage = parseInt(tempPage, 10) - 1;
      if(!isNaN(newPage)) goToPage(newPage);
    }
  };

  const handlePageInputBlur = () => {
    resetTempPage();
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    apiRef.current.setPageSize(newPageSize);
  };

  // Don't render initial pagination until state is ready
  if (!pagination || totalRows === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Loading page data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 60 }}>
          <InputLabel>Rows</InputLabel>
          <Select
            value={pageSize}
            label="Rows"
            onChange={handlePageSizeChange}
            disabled={loading}
          >
            {pageSizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span>per page</span>
      </Box>

      <PaginationFooterDivider />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 1 }}>
        <TextField
          size="small"
          type="number"
          label="Page"
          slotProps={{
            input: {
              min: 1,
              max: totalPages,
              'aria-label': 'Page number',
            },
          }}
          value={tempPage}
          disabled={loading}
          onChange={handlePageInputChange} // Allow typing
          onKeyDown={handlePageInputKeyDown}
          onFocus={() => updatePageInputWidth(true)}
          onBlur={handlePageInputBlur}
          sx={{
            width: pageInputWidth,
            transition: 'width 200ms ease-in-out',
          }}
        />
        <span>of {totalPages}</span>
      </Box>

      <PaginationFooterDivider />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <Tooltip title="First page">
          <span> {/* Workaround for tooltip positioning */}
            <IconButton onClick={() => goToPage(0)} disabled={loading || page === 0}>
              <FirstPage />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Previous page">
          <span>
            <IconButton onClick={() => goToPage(page - 1)} disabled={loading || page === 0}>
              <NavigateBefore />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Next page">
          <span>
            <IconButton onClick={() => goToPage(page + 1)} disabled={loading || page >= totalPages - 1}>
              <NavigateNext />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Last page">
          <span>
            <IconButton onClick={() => goToPage(totalPages - 1)} disabled={loading || page >= totalPages - 1}>
              <LastPage />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <PaginationFooterDivider />

      <Typography
        variant='body2'
        color={loading ? 'text.disabled' : 'text.primary'}
        sx={{ whiteSpace: 'nowrap', ml: 1 }}
      >
        {startItem}-{endItem} of {totalRows}
        {loading && <CircularProgress size={16} sx={{ ml: -4, position: 'absolute' }} />}
      </Typography>
    </Box>
  );
};

export default CustomPagination;
