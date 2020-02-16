import Dashboard from 'views/Dashboard.jsx';
import UserProfile from 'views/UserProfile.jsx';
import CourseList from 'views/CourseList.jsx';
import Chat from 'views/Chat.jsx';
import Typography from 'views/Typography.jsx';
import Calendar from 'views/Calendar.jsx';
import Maps from 'views/Maps.jsx';
import Notifications from 'views/Notifications.jsx';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'pe-7s-graph',
    component: Dashboard,
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'pe-7s-user',
    component: UserProfile,
  },
  {
    path: '/courses',
    name: 'Courses',
    icon: 'pe-7s-note2',
    component: CourseList,
  },
  {
    path: '/chat',
    name: 'Chat',
    icon: 'pe-7s-chat',
    component: Chat,
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'pe-7s-news-paper',
    component: Typography,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'pe-7s-date',
    component: Calendar,
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'pe-7s-map-marker',
    component: Maps,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'pe-7s-bell',
    component: Notifications,
  },
];

export default dashboardRoutes;
