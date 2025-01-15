import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = (config) => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }

  useEffect(() => {
    config?.title && context.setTitle(config.title);
    config?.titleIcon && context.setTitleIcon(config.titleIcon);
    config?.actions && context.addActions(config.actions);
  }, []);

  return context;
};

export const ContentProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [titleIcon, setTitleIcon] = useState(null);
  const [actionButtons, setActionButtons] = useState([]);

  const clearActions = () => setActionButtons([]);

  // Example usage:
  //  addActions([action1, action2], 'start');
  //  addActions([action3, action4], 'end'); // Default position
  const addActions = (actions, position) =>
    setActionButtons((prev) => {
      // Omit actions that already exist
      const newActions = actions.filter((action) => !prev.some((btn) => btn.key === action.key));

      // Generate keys from labels unless set in action
      // Example: 'Add New' -> 'add-new'
      newActions.forEach((action, i) => {
        if(typeof action === 'object' && !action.key) {
          action.key = action.label ? action.label.toLowerCase().replace(/\s/g, '-') : `action-${i}`;
        }
      });

      // Insert at the start or end of existing actions
      return position === 'start' ? [...newActions, ...prev] : [...prev, ...newActions];
    });

  // Example usage:
  //  removeActions([0, 1]);
  //  removeActions(['add', 'edit']);
  const removeActions = (indicesOrKeys) =>
    setActionButtons((prev) => prev.filter((btn, i) =>
      !indicesOrKeys.includes(i) && !indicesOrKeys.includes(btn.key)
    ));

  // Example usage:
  //  updateActions([0, 1], { disabled: true });
  //  updateActions(['add', 'edit'], { color: 'secondary' });
  const updateActions = (indicesOrKeys, updatedAction) =>
    setActionButtons((prev) =>
      prev.map((btn, i) => (
        indicesOrKeys.includes(i) || indicesOrKeys.includes(btn.key)
          ? { ...btn, ...updatedAction }
          : btn
      ))
    );

  const value = {
    title,
    setTitle,
    titleIcon,
    setTitleIcon,
    actionButtons,
    clearActions,
    addActions,
    removeActions,
    updateActions,
    actions: {
      add: (action, position) => addActions([action], position),
      remove: (indexOrKey) => removeActions([indexOrKey]),
      update: (indexOrKey, updatedAction) => updateActions([indexOrKey], updatedAction),
    },
  };

  return (
    // Reset context on route change
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
