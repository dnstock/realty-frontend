import { useTheme, useMediaQuery } from '@mui/material';

const useDeviceType = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 600px and below
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px to 960px
  const isLargeMobile = useMediaQuery('(min-width: 600px) and (max-width: 767px)'); // Larger mobile devices like iPhone Plus
  const isSmallTablet = useMediaQuery('(min-width: 768px) and (max-width: 960px)'); // Small tablets
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 960px and above
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')); // 1280px and above

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
