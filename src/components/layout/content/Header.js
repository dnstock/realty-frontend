import { Typography } from '@mui/material';
import { ContentHeader, ContentTitleBox, ContentActionBox, ContentActionButton, ContentIconButton, ContentActionDivider } from 'theme';
import { useContent } from 'context';
import { useDeviceType } from 'hooks';

const Header = () => {
  const { isMobile } = useDeviceType();
  const { title, titleIcon: TitleIcon, actionButtons } = useContent();

  const actionButton = (action, index) => (
    <ContentActionButton
      key={(action.key || '') + index}
      color={action.color || 'primary'}
      startIcon={action.icon ? <action.icon /> : null}
      onClick={action.onClick}
      {...action.props} // Pass any additional props
    >
      {action.label}
    </ContentActionButton>
  );

  const actionIcon = (action, index) => (
    <ContentIconButton
      key={(action.key || '') + index}
      color={action.color || 'primary'}
      onClick={action.onClick}
      size={isMobile ? 'medium' : 'large'}
      {...action.props} // Pass any additional props
    >
      <action.icon fontSize='inherit' />
    </ContentIconButton>
  );

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
            action === 'divider' ? <ContentActionDivider key={index} /> :
            isMobile ? actionIcon(action, index) :
              (!action.label ? actionIcon(action, index) : actionButton(action, index))
          ))}
        </ContentActionBox>
      </ContentHeader>
    )}
    </>
  );
};

export default Header;
