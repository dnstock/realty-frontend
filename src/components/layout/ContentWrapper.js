import { Typography } from '@mui/material'
import { MainContainer, ContentHeader } from 'theme';
import ActionBar from './ActionBar';

const ContentWrapper = ({ title, actionButtons, children }) => {
  return (
    <MainContainer component='main'>
      {(title || actionButtons) && (
        <ContentHeader>
          {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
          {actionButtons && <ActionBar actionButtons={actionButtons} />}
        </ContentHeader>
      )}
      {children}
    </MainContainer>
  );
}

export default ContentWrapper;
