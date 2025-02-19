import Box from '@mui/material/Box';
import {
  Domain, // Same as Business icon
  LocationCity,

  Menu,
  MenuOpen,
  ChevronLeft,
  ChevronRight,
  ViewSidebar,
  MoreHoriz,
  MoreVert,
  Visibility,
  LockPerson,

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
  Add,
  AddCircle,
  Flag,
  FlagOutlined,
  ArrowBack,
  ArrowBackIos,
  Edit,
  Delete,
  KeyboardArrowUp,

  Note,
  NoteAdd,
  NoteAlt,
  DescriptionOutlined,
  NoteOutlined,
  AddComment,
} from '@mui/icons-material';

const NoteVert = (props) => (
  <Box sx={{ transform: 'rotate(90deg) scaleX(-1)' }}>
    <Note {...props} />
  </Box>
);

const Icons = {
  // Generic Icons
  More: MoreVert,
  MoreHoriz: MoreHoriz,
  Add: AddCircle,             // Alt: Add
  NoteAdd: NoteAdd,           // Alt: NoteAlt
  Note: DescriptionOutlined,  // Alt: NoteOutlined
  NoteOff: NoteAdd,
  Flag: Flag,
  FlagOff: FlagOutlined,
  View: Visibility,
  Back: ArrowBack,            // Alt: ArrowBackIos
  Edit: Edit,
  Delete: Delete,            // Alt: DeleteOutline
  Up: KeyboardArrowUp,

  // Interface Icons
  LogoV1: Domain,
  LogoV2: LocationCity,

  Home: Home,
  SidebarOpened: MenuOpen,
  SidebarClosed: Menu,
  SidebarExtended: MenuOpen,  // Alt: ChevronLeft
  SidebarCollapsed: Menu,     // Alt: ChevronRight
  Login: Login,
  Logout: Logout,
  Restricted: LockPerson,

  // User Icons
  Dashboard: Dashboard,
  Reports: BarChart,          // Alt: Assessment
  Analytics: Insights,
  Profile: AccountBox,        // Alt: AccountCircle
  Account: Settings,

  // Resource Icons
  Properties: HomeWork,
  Buildings: Apartment,
  Units: MeetingRoom,
  Tenants: Group,
  Leases: Description,
  Insurance: VerifiedUser,
};

export default Icons;
