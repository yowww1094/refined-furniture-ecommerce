import { SidebarNav } from '@/components/sidebar-nav';
import { SidebarNavigation } from '@/types';

export const metadata = {
  title: 'Account - Refined Furniture',
  description: 'Manage your profile, orders, and custom requests',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems: SidebarNavigation[] = [
    {
      title: 'Overview',
      href: '/account',
      icon: 'Home',
    },
    {
      title: 'Orders',
      href: '/account/orders',
      icon: 'List',
    },
    {
      title: 'Custom Requests',
      href: '/account/custom-requests',
      icon: 'Upload',
    },
    {
      title: 'Wishlist',
      href: '/account/wishlist',
      icon: 'Heart',
    },
    {
      title: 'Profile',
      href: '/account/profile',
      icon: 'User',
    },
    {
      title: 'Addresses',
      href: '/account/addresses',
      icon: 'MapPin',
    },
    {
      title: 'Notifications',
      href: '/account/notifications',
      icon: 'Bell',
    },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <SidebarNav items={sidebarItems} />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}