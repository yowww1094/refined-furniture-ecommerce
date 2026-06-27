import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SidebarNavProps {
  items: {
    title: string;
    href: string;
    icon: string;
  }[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="flex-shrink-0 w-64 border-r border-border/50 bg-background">
      <ul className="flex flex-col space-y-1 pt-6">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium
                hover:bg-primary/10 hover:text-primary
                ${window.location.pathname.startsWith(item.href) ? 'bg-primary/20 text-primary' : ''}`}
            >
              {/* This is a placeholder for the icon - in a real implementation,
                  you would map the icon string to an actual Lucide icon */}
              <div className="flex h-5 w-5 items-center justify-center shrink-0">
                {/* Icon would go here */}
                <span className="text-primary">{getIconLetter(item.icon)}</span>
              </div>
              <span className="truncate">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Helper function to get a representative letter for icon names
// In a real implementation, you would import and use actual Lucide icons
function getIconLetter(iconName: string): string {
  const iconMap: Record<string, string> = {
    Home: 'H',
    List: 'L',
    Upload: 'U',
    Heart: '♥',
    User: 'U',
    MapPin: '📍',
    Bell: '🔔',
  };

  return iconMap[iconName] || '?';
}