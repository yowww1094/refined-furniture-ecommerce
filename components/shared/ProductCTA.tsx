'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ShoppingCart, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import { useWishlist } from '@/lib/wishlist';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // Add other fields as needed
}

interface ProductCTAProps {
  product: Product;
  className?: string;
}

export function ProductCTA({ product, className }: ProductCTAProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCartStore();
  const { openCartDrawer } = useUIStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    openCartDrawer();
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now (could go to checkout with this item)
    alert(`Proceeding to checkout for ${product.name}`);
  };

  const handleWishlist = () => {
    toggleItem(product.id);
    alert(
      isInWishlist(product.id)
        ? `${product.name} added to wishlist!`
        : `${product.name} removed from wishlist!`
    );
  };

  const handleWhatsApp = () => {
    // In a real app, we would use the product URL
    const productUrl = `/product/${product.id}`;
    const whatsappUrl = getProductWhatsAppUrl(product.name, productUrl);
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomize = () => {
    // Link to custom furniture page with pre-filled data? For now, just go to the custom-furniture page
    alert('Customize feature coming soon!');
  };

  return (
    <div className={`${className} space-y-4`}>
      <div className="flex flex-col sm:flex-row sm:space-x-3">
        <Button
          onClick={handleAddToCart}
          className="flex-1 items-center justify-center"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleBuyNow}
          className="flex-1 items-center justify-center"
        >
          Buy Now
        </Button>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={handleWishlist}
          className="flex-1 items-center justify-center"
        >
          <Heart className="mr-2 h-4 w-4" />
          {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
        </Button>
        <Button
          variant="outline"
          onClick={handleWhatsApp}
          className="flex-1 items-center justify-center"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          onClick={handleCustomize}
          className="flex-1 items-center justify-center"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </div>
    </div>
  );
}