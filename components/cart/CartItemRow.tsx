import { useCartStore } from '@/stores/cart';
import { X } from 'lucide-react';

interface CartItemRowProps {
  item: ReturnType<typeof useCartStore>['items'][0];
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrease = () => {
    const newQty = item.quantity - 1;
    if (newQty <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQty);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex h-16 w-full items-center gap-4">
      <div className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold line-clamp-1">{item.name}</h3>
          <button onClick={handleRemove} className="text-muted-foreground hover:text-destructive">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">${item.price.toFixed(
          2
        )}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="flex h-9 w-9 items-center justify-center rounded-md border px-2 py-1.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-md border px-2 py-1.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
        >
          +
        </button>
      </div>
    </div>
  );
}