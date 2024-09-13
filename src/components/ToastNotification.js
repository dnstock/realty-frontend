import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message) => enqueueSnackbar(message, { variant: 'success' });
  const showError = (message) => enqueueSnackbar(message, { variant: 'error' });

  return { showSuccess, showError };
};

export default useToast;
