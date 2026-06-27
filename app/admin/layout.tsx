import { SidebarNav } from '@/components/sidebar-nav';
import { SidebarNavigation } from '@/types';

export const metadata = {
  title: 'Admin - Refined Furniture',
  description: 'Administrative dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems: SidebarNavigation[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: 'Home',
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: 'List',
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: 'List',
    },
    {
      title: 'Categories',
      href: '/admin/categories',
      icon: 'List',
    },
    {
      title: 'Materials',
      href: '/admin/materials',
      icon: 'List',
    },
    {
      title: 'Suppliers',
      href: '/admin/suppliers',
      icon: 'List',
    },
    {
      title: 'Custom Requests',
      href: '/admin/custom-requests',
      icon: 'Upload',
    },
    {
      title: 'Customers',
      href: '/admin/customers',
      icon: 'User',
    },
    {
      title: 'Projects',
      href: '/admin/projects',
      icon: 'List',
    },
    {
      title: 'Content',
      href: '/admin/content',
      icon: 'List',
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: 'BarChart',
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: 'Settings',
    },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <aside className="hidden w-64 block lg:flex-shrink-0 lg:block border-r border-border/50 bg-background">
          <SidebarNav items={sidebarItems} />
        </aside>
        <main className="flex-1 flex flex-col">
          <header className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-border/50">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <button className="btn btn-outline">
                <Bell className="h-4 w-4" />
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  5
                </span>
              </button>
              <button className="btn btn-outline">
                <UserPlus className="h-4 w-4" />
                Admin
              </button>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-y-auto lg:pl-64">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

// Import for search icon (we'll use a simple placeholder)
function Search() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>;
}