# Refined Furniture E-commerce

A production-ready furniture ecommerce and custom furniture platform for a Moroccan furniture manufacturer.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js (Server Components, Server Actions, Route Handlers)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Internationalization**: next-intl (EN/FR/AR with RTL)
- **Deployment**: Vercel (frontend), Supabase (backend/storage/auth)

## Features

- Public Website & Ecommerce Store
- Custom Furniture Request System
- Customer Portal
- Admin Dashboard
- Inventory Management
- Material Tracking
- Content Management
- Analytics
- WhatsApp Integration
- Multi-language Support (English, French, Arabic)
- RTL Layout Support

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials.

3. Run development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## Project Structure

- `app/` - Next.js app router with route groups: `(public)`, `(account)`, `(admin)`
- `components/` - Reusable UI components
- `lib/` - Utilities, Supabase client, types
- `stores/` - Zustand stores
- `designs/` - Figma design reference

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for server-side operations) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number |

## Development Guidelines

- Follow the architecture principles in CLAUDE.md
- Use Supabase RLS for security
- Implement Cash On Delivery only (no online payment gateways)
- Prioritize WhatsApp integration opportunities
- Ensure full RTL support for Arabic
- Keep components focused and reusable
- Validate all user input with Zod
- Sanitize uploads
- Use server components and server actions preferentially

## MVP Priorities

Build in this order:
1. Project Setup
2. Supabase Setup
3. Authentication
4. Public Website
5. Product Catalog
6. Cart
7. Checkout
8. Custom Furniture Requests
9. Customer Portal
10. Admin Dashboard
11. Inventory
12. Analytics
13. RTL Support
14. SEO
15. Production Deployment

Do not skip steps. Complete one phase before moving to the next.

## License

MIT
