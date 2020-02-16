import Dashboard from 'views/Dashboard.jsx';
import UserProfile from 'views/UserProfile.jsx';
import CourseList from 'views/CourseList.jsx';
import Chat from 'views/Chat.jsx';
import Calendar from 'views/Calendar.jsx';

export const routes = ['/dashboard', '/user', '/courses', '/chat', '/calendar'];

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
    path: '/calendar',
    name: 'Calendar',
    icon: 'pe-7s-date',
    component: Calendar,
  },
];

export default dashboardRoutes;
