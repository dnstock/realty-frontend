import { Typography } from '@mui/material'
import { ContentHeader } from 'theme';
import ActionBar from './ActionBar';

const ContentWrapper = ({ title, actionButtons, children }) => {
  return (
    <>
      {(title || actionButtons) && (
        <ContentHeader>
          {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
          {actionButtons && <ActionBar actionButtons={actionButtons} />}
        </ContentHeader>
      )}
      {children}
    </>
  );
}

export default ContentWrapper;
