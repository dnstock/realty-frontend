import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSuccess = useCallback(async (message, props = {}, autoHideDuration = 3000) => {
    enqueueSnackbar(message, { variant: 'success', ...props, autoHideDuration });
  }, [enqueueSnackbar]);

  const showError = useCallback(async (message, props = {}, autoHideDuration = 5000) => {
    enqueueSnackbar(message, { variant: 'error', ...props, autoHideDuration });
  }, [enqueueSnackbar]);

  const showInfo = useCallback(async (message, props = {}, autoHideDuration = 4000) => {
    enqueueSnackbar(message, { variant: 'info', ...props, autoHideDuration });
  }, [enqueueSnackbar]);

  const showWarning = useCallback(async (message, props = {}, autoHideDuration = 4000) => {
    enqueueSnackbar(message, { variant: 'warning', ...props, autoHideDuration });
  }, [enqueueSnackbar]);

  return { closeNotification: closeSnackbar, showSuccess, showError, showInfo, showWarning };
};

export default useToast;
