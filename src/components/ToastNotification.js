import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = useCallback(async (message) => { enqueueSnackbar(message, { variant: 'success' }); } , [enqueueSnackbar]);
  const showError = useCallback(async (message) => { enqueueSnackbar(message, { variant: 'error' }); } , [enqueueSnackbar]);

  return { showSuccess, showError };
};

export default useToast;
