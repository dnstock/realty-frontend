import { ActionBox, ActionButton } from 'theme';

const ActionBar = ({ actionButtons }) => {
  if (!actionButtons || actionButtons.length === 0) return null;
  
  return (
    <ActionBox>
      {actionButtons.map((action, index) => (
        <ActionButton key={index} color={action.color} onClick={action.onClick}>
          {action.label}
        </ActionButton>
      ))}
    </ActionBox>
  );
};

export default ActionBar;
