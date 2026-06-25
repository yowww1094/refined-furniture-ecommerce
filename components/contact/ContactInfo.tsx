import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Clock } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Get In Touch
        </h2>
        <p className="text-muted-foreground">
          We'd love to hear from you. Whether you have questions about our products,
          want to discuss a custom furniture project, or need assistance with an
          existing order, our team is here to help.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"/>
          <div>
            <h3 className="font-medium text-foreground">Our Showroom</h3>
            <p className="text-muted-foreground">
              123 Artisan Street, Marrakech, Morocco
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"/>
          <div>
            <h3 className="font-medium text-foreground">Call Us</h3>
            <p className="text-muted-foreground">
              <a href="tel:+212524478899" className="hover:text-accent">
                +212 524 478 899
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"/>
          <div>
            <h3 className="font-medium text-foreground">Email Us</h3>
            <p className="text-muted-foreground">
              <a href="mailto:info@refinedfurniture.ma" className="hover:text-accent">
                info@refinedfurniture.ma
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"/>
          <div>
            <h3 className="font-medium text-foreground">Opening Hours</h3>
            <p className="text-muted-foreground">
              Monday - Saturday: 9:00 AM - 7:00 PM<br />
              Sunday: 10:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border/50">
        <h3 className="font-medium text-foreground mb-4">
          WhatsApp Inquiry
        </h3>
        <p className="text-muted-foreground mb-4">
          Prefer to chat on WhatsApp? Click below to start a conversation with our team.
        </p>
        <WhatsAppButton
          message="Hello, I'm interested in your products and would like to inquire about:"
          className="w-full"
        />
      </div>
    </div>
  );
}