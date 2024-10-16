import { useState, useCallback } from 'react';

// Custom hook to manage the open/close state of dialogs
const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const openDialog = useCallback((rowData) => {
    setData(rowData);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setData(null);
  }, []);

  return {
    isOpen: open,
    data,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
