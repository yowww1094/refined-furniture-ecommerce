import * as lucide from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  /**
   * Icon name from lucide-react (case-sensitive, e.g., "Menu", "Search", "ShoppingCart")
   */
  name: keyof typeof lucide;
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * Universal Icon component using lucide-react icons
 */
export function Icon({
  name,
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  // Get the icon component using bracket notation with type assertion
  const Icon = lucide[name] as typeof lucide.Menu;

  return (
    <Icon
      size={size}
      color={color}
      className={cn("flex-shrink-0 stroke-current", className)}
    />
  );
}

/**
 * Optional: Icon mapper for common Figma/iconly names to lucide equivalents
 * Use this if your Figma design uses different naming conventions
 */
export function FigmaIcon({
  name,
  size = 24,
  color = "currentColor",
  className,
}: Omit<IconProps, "name"> & { name: string }) {
  // Map common Figma/iconly names to lucide icon names
  // Using only verified lucide-react icon names
  const figmaToLucide: Record<string, keyof typeof lucide> = {
    // Navigation
    menu: "Menu",
    hamburger: "Menu",
    close: "X",
    search: "Search",
    arrowLeft: "ArrowLeft",
    arrowRight: "ArrowRight",
    arrowUp: "ArrowUp",
    arrowDown: "ArrowDown",
    chevronLeft: "ChevronLeft",
    chevronRight: "ChevronRight",
    chevronUp: "ChevronUp",
    chevronDown: "ChevronDown",

    // E-commerce
    cart: "ShoppingCart",
    shoppingCart: "ShoppingCart",
    basket: "ShoppingBasket",
    wishlist: "Heart",
    heart: "Heart",
    user: "User",
    profile: "User",
    home: "Home",

    // Actions
    plus: "Plus",
    add: "Plus",
    minus: "Minus",
    remove: "Minus",
    check: "Check",
    x: "X",
    delete: "Trash2",
    trash: "Trash2",
    edit: "Edit",
    pencil: "Edit",
    save: "Save",
    upload: "Upload",
    download: "Download",
    share: "Share2",
    copy: "Copy",
    print: "Printer",

    // Communication
    phone: "Phone",
    phoneCall: "Phone",
    message: "MessageCircle",
    comment: "MessageCircle",
    email: "Mail",
    mail: "Mail",
    whatsapp: "Mail", // WhatsApp often uses mail/message icon

    // Layout
    sidebar: "Menu",
    navigationOpen: "Menu",
    navigationClose: "X",

    // Document & File
    file: "File",
    fileText: "FileText",
    pdf: "FileText",
    image: "Image",
    images: "Images",
    photo: "Image",
    photos: "Images",

    // Status & Feedback
    alertTriangle: "AlertTriangle",
    alertCircle: "AlertCircle",
    info: "Info",
    helpCircle: "HelpCircle",
    checkCircle: "CheckCircle",
    xCircle: "XCircle",

    // Miscellaneous
    calendar: "Calendar",
    clock: "Clock",
    star: "Star",
    bookmark: "Bookmark",
  };

  // Get the lucide icon name from mapping or use a fallback
  const lucideName = figmaToLucide[name] || "Menu";

  // Get the icon component using bracket notation with type assertion
  const Icon = lucide[lucideName as keyof typeof lucide] as typeof lucide.Menu;

  return (
    <Icon
      size={size}
      color={color}
      className={cn("flex-shrink-0 stroke-current", className)}
    />
  );
}