import {
  Domain as DomainIcon, // Same as Business icon
  LocationCity as LocationCityIcon,

  Home as HomeIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  HomeWork as HomeWorkIcon,
  Apartment as ApartmentIcon,
  MeetingRoom as MeetingRoomIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

const Icons = {
  // Base Icons
  LogoV1: DomainIcon,
  LogoV2: LocationCityIcon,

  Home: HomeIcon,
  Menu: MenuIcon,
  Login: LoginIcon,
  Logout: LogoutIcon,

  // User Icons
  Dashboard: DashboardIcon,
  Profile: AccountCircleIcon,
  Settings: SettingsIcon, 

  // Platform Icons
  Properties: HomeWorkIcon,
  Buildings: ApartmentIcon,
  Units: MeetingRoomIcon,
  Tenants: GroupIcon,
  Leases: DescriptionIcon,
  Insurance: VerifiedUserIcon,
};

export default Icons;
