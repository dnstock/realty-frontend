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

  const addActions = (actions, position) =>
    setActionButtons((prev) => {
      // Omit actions that already exist
      const newActions = actions.filter((action) => !prev.some((btn) => btn.label === action.label));
      return position === 'start' ? [...newActions, ...prev] : [...prev, ...newActions];
    });

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
    titleIcon,
    setTitleIcon,
    actionButtons,
    clearActions,
    addActions,
    removeActions,
    updateActions,
    actions: {
      add: (action, position) => addActions([action], position),
      remove: (indexOrLabel) => removeActions([indexOrLabel]),
      update: (indexOrLabel, updatedAction) => updateActions([indexOrLabel], updatedAction),
    },
  };

  return (
    // Reset context on route change
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
