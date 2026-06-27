import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Logs an analytics event with optional properties
 * @param eventName - The name of the event to log
 * @param properties - Additional properties to include with the event
 */
export function logEvent(eventName: string, properties: Record<string, any> = {}) {
  // In a real application, this would send data to an analytics service
  // For now, we'll log to console and store in localStorage for demo purposes

  const event = {
    eventName,
    timestamp: new Date().toISOString(),
    properties,
    // Add any contextual information that might be useful
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
  };

  // Log to console for development
  console.log('[Analytics Event]', event);

  // Store in localStorage for persistence (in a real app, this would be sent to analytics service)
  try {
    const storedEvents = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    storedEvents.push(event);
    // Keep only last 1000 events to prevent storage issues
    const limitedEvents = storedEvents.slice(-1000);
    localStorage.setItem('analyticsEvents', JSON.stringify(limitedEvents));
  } catch (error) {
    console.error('Failed to store analytics event:', error);
  }
}

/**
 * Hook to automatically track page views
 */
export function usePageViews() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      logEvent('page_view', {
        path: url,
        // Add any additional page-specific context here
      });
    };

    // Handle initial route
    const handleInitialRoute = () => {
      logEvent('page_view', {
        path: window.location.pathname,
      });
    };

    // Handle navigation events
    router.events.on('routeChangeComplete', handleRouteChange);

    // Track initial page view
    if (typeof window !== 'undefined') {
      handleInitialRoute();
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
}

/**
 * Track custom events with common e-commerce actions
 */
export const analyticsEvents = {
  // Product interactions
  productView: (productId: string, productName: string, category: string) =>
    logEvent('product_view', { product_id: productId, product_name: productName, category }),

  productAddToCart: (productId: string, productName: string, quantity: number, price: number) =>
    logEvent('add_to_cart', { product_id: productId, product_name: productName, quantity, price, value: price * quantity }),

  productRemoveFromCart: (productId: string, productName: string, quantity: number) =>
    logEvent('remove_from_cart', { product_id: productId, product_name: productName, quantity }),

  // Cart interactions
  viewCart: () => logEvent('view_cart'),
  beginCheckout: (value: number, currency: string = 'MAD') =>
    logEvent('begin_checkout', { value, currency }),

  // Purchase events
  purchaseCompleted: (
    orderId: string,
    value: number,
    currency: string = 'MAD',
    items: Array<{ id: string; name: string; quantity: number; price: number }> = []
  ) =>
    logEvent('purchase', {
      transaction_id: orderId,
      value,
      currency,
      items,
      shipping: 0, // Assuming free shipping or included in price
      tax: 0 // Would be calculated separately in real implementation
    }),

  // Wishlist interactions
  addToWishlist: (productId: string, productName: string) =>
    logEvent('add_to_wishlist', { product_id: productId, product_name: productName }),

  removeFromWishlist: (productId: string, productName: string) =>
    logEvent('remove_from_wishlist', { product_id: productId, product_name: productName }),

  // Custom requests
  customRequestStarted: () => logEvent('custom_request_start'),
  customRequestSubmitted: (
    requestId: string,
    estimatedValue: number,
    currency: string = 'MAD'
  ) =>
    logEvent('custom_request_submit', {
      request_id: requestId,
      estimated_value: estimatedValue,
      currency
    }),

  // Authentication events
  login: (method: string = 'email') =>
    logEvent('login', { method }),

  signup: (method: string = 'email') =>
    logEvent('signup', { method }),

  logout: () => logEvent('logout'),

  // Navigation & engagement
  search: (query: string, resultsCount: number) =>
    logEvent('search', { search_query: query, results_count: resultsCount }),

  whatsAppClick: (phoneNumber: string) =>
    logEvent('whatsapp_click', { phone_number: phoneNumber }),

  // Newsletter
  newsletterSignup: () => logEvent('newsletter_signup')
};