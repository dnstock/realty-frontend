import { createContext, useContext, useState, useCallback, Suspense, lazy } from 'react';

const DialogContext = createContext();

export const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    type: null,
    data: null,
    handlers: {}, // Holds dialog-specific handlers
  });

  const openDialog = useCallback((type, data, handlers = {}) => {
    setDialogState({ open: true, type, data, handlers });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState({ open: false, type: null, data: null, handlers: {} });
  }, []);

  // Dynamically import the dialog component based on `type`
  const DialogComponent = dialogState.type
    ? lazy(() => import(`components/dialogs/${dialogState.type.charAt(0).toUpperCase() + dialogState.type.slice(1)}Dialog`))
    : null;

  return (
    <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}

      {DialogComponent && (
        <Suspense fallback={null}>
          <DialogComponent
            open={dialogState.open}
            onClose={closeDialog}
            row={dialogState.data}
            {...dialogState.handlers} // Spread any specific handlers provided
          />
        </Suspense>
      )}
    </DialogContext.Provider>
  );
};
