import Dashboard from 'views/Dashboard.jsx';
import UserProfile from 'views/UserProfile.jsx';
import CourseList from 'views/CourseList.jsx';
import Typography from 'views/Typography.jsx';
import Icons from 'views/Icons.jsx';
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
    path: '/typography',
    name: 'Typography',
    icon: 'pe-7s-news-paper',
    component: Typography,
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'pe-7s-science',
    component: Icons,
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
