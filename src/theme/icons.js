import {
  Domain, // Same as Business icon
  LocationCity,

  Home,
  Dashboard,
  AccountCircle,
  Settings,
  Menu,
  Login,
  Logout,
  HomeWork,
  Apartment,
  MeetingRoom,
  Group,
  Description,
  VerifiedUser,
} from '@mui/icons-material';

const Icons = {
  // Base Icons
  LogoV1: Domain,
  LogoV2: LocationCity,

  Home: Home,
  Menu: Menu,
  Login: Login,
  Logout: Logout,

  // User Icons
  Dashboard: Dashboard,
  Profile: AccountCircle,
  Settings: Settings, 

  // Platform Icons
  Properties: HomeWork,
  Buildings: Apartment,
  Units: MeetingRoom,
  Tenants: Group,
  Leases: Description,
  Insurance: VerifiedUser,
};

export default Icons;
