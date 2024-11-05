import { Typography } from '@mui/material'
import { ContentHeader, ContentActionBox, ContentActionButton } from 'theme';

const Content = ({ title, actionButtons, children }) => {
  return (
    <>
      {(title || actionButtons) && (
        <ContentHeader>
          {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
          {actionButtons && (
            <ContentActionBox>
              {actionButtons.map((action, index) => (
                <ContentActionButton
                  key={index}
                  color={action.color}
                  onClick={action.onClick}
                >
                  {action.label}
                </ContentActionButton>
              ))}
            </ContentActionBox>
          )}
        </ContentHeader>
      )}
      {children}
    </>
  );
}

export default Content;
