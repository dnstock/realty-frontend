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
import { toast } from 'sonner';

const useToast = () => {
  return {
    showSuccess: (message) => toast.success(message),
    showError: (message) => toast.error(message),
    showInfo: (message) => toast.info(message),
    showWarning: (message) => toast.warning(message),
    closeNotification: toast.dismiss
  };
};

export default useToast;
