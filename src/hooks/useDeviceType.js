import { useTheme, useMediaQuery } from '@mui/material';

const useDeviceType = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm: 600px by default
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // sm (600px) to md (960px)
  const isLargeMobile = useMediaQuery('(min-width: 600px) and (max-width: 767px)'); // Handle larger mobile devices like iPhone Plus
  const isSmallTablet = useMediaQuery('(min-width: 768px) and (max-width: 960px)'); // Handle small tablets
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // md: 960px and above
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')); // lg: 1280px and above

  let deviceType = null;
  if (isMobile) deviceType = 'mobile';
  if (isLargeMobile) deviceType = 'largeMobile';
  if (isTablet) deviceType = 'tablet';
  if (isSmallTablet) deviceType = 'smallTablet';
  if (isDesktop) deviceType = 'desktop';
  if (isLargeDesktop) deviceType = 'largeDesktop';

  return {
    deviceType,
    isMobile,
    isLargeMobile,
    isTablet,
    isSmallTablet,
    isDesktop,
    isLargeDesktop,
  };
};

export default useDeviceType;
