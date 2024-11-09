/**
 * useToast.js
 *
 * Custom hook for displaying toast notifications using the notistack library. Provides
 * methods to show success, error, info, and warning messages with customizable
 * durations and additional options.
 *
 * Usage:
 * Import and initialize `useToast` within a functional component to gain access to
 * helper functions for displaying notifications.
 *
 * Methods:
 * - showSuccess: Displays a success notification with customizable message, props, and duration.
 * - showError: Displays an error notification with customizable message, props, and duration.
 * - showInfo: Displays an info notification with customizable message, props, and duration.
 * - showWarning: Displays a warning notification with customizable message, props, and duration.
 * - closeNotification: Closes the current notification.
 *
 * Parameters:
 * - message (string): The main text to display in the notification.
 * - props (object): Optional props to customize the notification further.
 * - autoHideDuration (number): Duration in milliseconds before the notification auto-hides.
 *
 * Returns:
 * - An object containing `showSuccess`, `showError`, `showInfo`, `showWarning`, and `closeNotification` functions.
 *
 * Example:
 * const { showSuccess, showError } = useToast();
 * showSuccess('Operation successful');
 * showError('An error occurred');
 */
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
