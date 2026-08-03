// sidebarData.ts
export interface NavItem {
  icon: string;
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { icon: '/sideBarIcons/dashboard.svg', label: 'DASHBOARD', path: '/' },
  { icon: '/sideBarIcons/task.svg', label: 'MY TASK', path: '/tasks' },
  { icon: '/sideBarIcons/projects.svg', label: 'PROJECTS', path: '/projects' },
  { icon: '/sideBarIcons/calendar.svg', label: 'CALENDAR', path: '/calendar' },
  { icon: '/sideBarIcons/time.svg', label: 'TIME MANAGE', path: '/time-management' },
  { icon: '/sideBarIcons/reports.svg', label: 'REPORTS', path: '/reports' },
  { icon: '/sideBarIcons/settings.svg', label: 'SETTINGS', path: '/settings' },
];