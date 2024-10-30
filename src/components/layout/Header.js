import { AppBar, Toolbar, Typography } from '@mui/material';
import { HeaderButton, HeaderIconButton, HeaderBox, Icons } from 'theme';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { isMobile } = useDeviceType();

  const getHeaderButton = (text, to, icon) => {
    to = to || '/' + text.toLowerCase();
    const IconComponent = icon || Icons[text];
    return isMobile ? (
      <HeaderIconButton key={text} to={to}>
        <IconComponent />
      </HeaderIconButton>
    ) : (
      <HeaderButton key={text} to={to} startIcon={<IconComponent />}>
        {text}
      </HeaderButton>
    );
  };

  const navigation = isAuthenticated
    ? ['Dashboard', 'Profile', 'Logout']
    : ['Login'];

  return (
    <AppBar position='static' color='primary' aria-label='Main navigation'>
      <Toolbar disableGutters={isMobile}>
        {isMobile && (
          <HeaderIconButton aria-label='menu' onClick={toggleSidebar}>
            <Icons.Menu />
          </HeaderIconButton>
        )}
        <Icons.LogoV1 sx={{ marginRight: 1 }} color='inherit' />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Realty App
        </Typography>
        <HeaderBox>
          {getHeaderButton('Home', '/')}
          {navigation.map((text) => getHeaderButton(text))}
        </HeaderBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
