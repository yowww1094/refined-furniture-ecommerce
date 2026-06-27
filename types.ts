export type SidebarNavigation = {
  title: string;
  href: string;
  icon: keyof typeof IconMap;
};

const IconMap = {
  Home: 'Home',
  List: 'List',
  Upload: 'Upload',
  Heart: 'Heart',
  User: 'User',
  MapPin: 'MapPin',
  Bell: 'Bell',
  // Add more icons as needed
} as const;