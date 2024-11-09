import { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [actionButtons, setActionButtons] = useState([]);

  const clearActions = () => setActionButtons([]);

  const addActions = (actions, position) => {
    setActionButtons((prev) => {
      // Remove actions that already exist
      const newActions = actions.filter((action) => !prev.some((btn) => btn.label === action.label));
      return position === 'start' ? [...newActions, ...prev] : [...prev, ...newActions];
    });
  }

  const removeActions = (indicesOrLabels) =>
    setActionButtons((prev) => prev.filter((btn, i) =>
      !indicesOrLabels.includes(i) && !indicesOrLabels.includes(btn.label)
    ));

  // Example usage:
  //  updateActions([0, 1], { disabled: true });
  //  updateActions(['Add', 'Edit'], { color: 'secondary' });
  const updateActions = (indicesOrLabels, updatedAction) =>
    setActionButtons((prev) =>
      prev.map((btn, i) => (
        indicesOrLabels.includes(i) || indicesOrLabels.includes(btn.label)
          ? { ...btn, ...updatedAction }
          : btn
      ))
    );

  const value = {
    title,
    setTitle,
    actionButtons,
    clearActions,
    addActions,
    removeActions,
    updateActions,
    actions: {
      add: addActions,
      remove: removeActions,
      update: updateActions,
    },
  };

  return (
    // Reset context on route change
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
