import Link from 'next/link';
import { WhatsAppButton } from '@/components/shared';
import { GitHub, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Refined Furniture</h3>
            <p className="text-muted-foreground">
              Premium Moroccan furniture handcrafted with elegance and care.
            </p>
            <div className="mt-4 flex space-x-3">
              <a href="#" aria-label="Instagram">
                {/* Instagram icon placeholder */}
                <span className="h-4 w-4">📷</span>
              </a>
              <a href="#" aria-label="Facebook">
                {/* Facebook icon placeholder */}
                <span className="h-4 w-4">📘</span>
              </a>
              <a href="#" aria-label="Pinterest">
                {/* Pinterest icon placeholder */}
                <span className="h-4 w-4">📌</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/custom-furniture" className="text-muted-foreground hover:text-foreground">
                  Custom Furniture
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Contact Us</h4>
            <p className="mb-2 text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" /> 123 Artisan Street, Marrakech, Morocco
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              <Phone className="mr-2 h-4 w-4" /> +212 5XX-XX-XX-XX
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" /> info@refinedfurniture.ma
            </p>
            <div className="mt-2">
              {/* WhatsApp button using our component */}
              <WhatsAppButton
                variant="outline"
                size="sm"
                className="w-full"
              >
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Refined Furniture. All rights reserved.
        </div>
      </div>
    </footer>
  );
}