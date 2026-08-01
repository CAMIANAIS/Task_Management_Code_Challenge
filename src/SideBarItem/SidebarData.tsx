// sidebarData.ts
export interface NavItem {
  icon: string;
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { icon: '/sideBarIcons/dashboard.svg', label: 'Dashboard', path: '/' },
  { icon: '/sideBarIcons/task.svg', label: 'My Task', path: '/tasks' },
  { icon: '/sideBarIcons/projects.svg', label: 'Projects', path: '/projects' },
  { icon: '/sideBarIcons/calendar.svg', label: 'Calendar', path: '/calendar' },
  { icon: '/sideBarIcons/time.svg', label: 'Time Manage', path: '/time-management' },
  { icon: '/sideBarIcons/reports.svg', label: 'Reports', path: '/reports' },
  { icon: '/sideBarIcons/settings.svg', label: 'Settings', path: '/settings' },
];