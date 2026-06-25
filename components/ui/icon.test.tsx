import { Icon } from "@/components/ui/icon";

export default function IconTest() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <Icon name="Menu" size={24} className="text-primary" />
      <Icon name="Search" size={24} className="text-secondary" />
      <Icon name="ShoppingCart" size={24} className="text-accent" />
      <Icon name="Heart" size={24} className="text-destructive" />
      <Icon name="User" size={24} className="text-muted-foreground" />
      <Icon name="Menu" size={32} className="text-primary" />
      {/* Testing mapped icons via FigmaIcon if we had it */}
    </div>
  );
}