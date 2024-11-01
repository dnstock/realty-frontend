import {
  Domain, // Same as Business icon
  LocationCity,

  Menu,
  MenuOpen,
  ChevronLeft,
  ChevronRight,
  ViewSidebar,
  More,
  MoreHoriz,
  MoreVert,

  Home,
  Dashboard,
  AccountCircle,
  Settings,
  Login,
  Logout,
  HomeWork,
  Apartment,
  MeetingRoom,
  Group,
  Description,
  VerifiedUser,
  Insights,
  BarChart,
  Assessment,
  AccountBox,
} from '@mui/icons-material';

const Icons = {
  // Base Icons
  LogoV1: Domain,
  LogoV2: LocationCity,

  Home: Home,
  SidebarOpened: MenuOpen,
  SidebarClosed: Menu,
  SidebarExtended: MenuOpen,  // Alt: ChevronLeft
  SidebarCollapsed: Menu,     // Alt: ChevronRight
  Login: Login,
  Logout: Logout,

  // User Icons
  Dashboard: Dashboard,
  Reports: BarChart,          // Alt: Assessment
  Analytics: Insights,
  Profile: AccountBox,        // Alt: AccountCircle
  Account: Settings,

  // Platform Icons
  Properties: HomeWork,
  Buildings: Apartment,
  Units: MeetingRoom,
  Tenants: Group,
  Leases: Description,
  Insurance: VerifiedUser,
};

export default Icons;
