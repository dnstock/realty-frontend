import { Typography } from '@mui/material';
import { ContentHeader, ContentTitleBox, ContentActionBox, ContentActionButton, ContentActionDivider } from 'theme';
import { useContent } from 'context';

const Header = () => {
  const { title, titleIcon: TitleIcon, actionButtons } = useContent();

  return (
    <>
    {(title || actionButtons.length > 0) && (
      <ContentHeader>
        {title && (
          <ContentTitleBox>
            {TitleIcon && <TitleIcon />}
            <Typography variant="h4">{title}</Typography>
          </ContentTitleBox>
        )}
        <ContentActionBox>
          {actionButtons.map((action, index) => (
            action === 'divider' && <ContentActionDivider key={index} /> ||
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
