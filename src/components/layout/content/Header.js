import { Typography } from '@mui/material';
import { ContentHeader, ContentActionBox, ContentActionButton, ContentActionDivider } from 'theme';
import { useContent } from 'context';

const Header = () => {
  const { title, actionButtons } = useContent();

  return (
    <>
    {(title || actionButtons.length > 0) && (
      <ContentHeader>
        {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
        <ContentActionBox>
          {actionButtons.map((action, index) => (
            action === 'hr' && <ContentActionDivider key={index} /> ||
            <ContentActionButton
              key={index}
              color={action.color || 'primary'}
              startIcon={action.icon ? <action.icon /> : null}
              onClick={action.onClick}
              {...action.props} // Pass any additional props
            >
              {action.label}
            </ContentActionButton>
          ))}
        </ContentActionBox>
      </ContentHeader>
    )}
    </>
  );
};

export default Header;
