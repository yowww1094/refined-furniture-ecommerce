# Implementation Plan — Premium Moroccan Furniture Platform

> Living document. Follow phases sequentially per `CLAUDE.md` MVP priorities.
> One phase = done before the next starts. No skipping.

---

## 0. Conventions

- **Working dir:** `A:\projects\Freelance\Refined Furniture ecom`
- **Package manager:** pnpm (faster, Vercel-friendly)
- **Node:** 20 LTS
- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Branching:** `main` (deploy) · `feat/*` (work) — push only at phase end
- **TypeScript:** strict mode, `noUncheckedIndexedAccess: true`. **No `any`.**
- **Imports:** absolute via `@/*` alias.
- **Naming:** components PascalCase, files kebab-case, route groups `(public)` `(account)` `(admin)`.
- **Plan tracker:** ✅ done · 🟡 in progress · ⬜ pending

---

## 1. Goals & Non-Goals

### Goals
- Dual business model: COD ecommerce **and** custom-furniture atelier, equally weighted.
- WhatsApp-first communication surface across the entire funnel.
- Arabic RTL parity with English/French.
- Premium "Modern Moroccan Luxury" design.
- Deployable on **Vercel Free + Supabase Free** tier — no paid add-ons.
- Single Next.js 15 App Router codebase — no separate backend, admin, or API service.

### Non-Goals (will not implement)
- Stripe / PayPal / card processing — **Cash on Delivery only.**
- Separate Express/Nest backend.
- Microservices.
- A separate admin app — admin lives in the same Next.js app under `(admin)`.
- Offline mode / native mobile apps (PWA only if bandwidth allows in Phase 13).

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       Next.js 15 App                         │
│                                                              │
│  (public)        /  /shop  /product  /projects  /contact      │
│                   /custom-furniture  /about  /faq  /search    │
│                                                              │
│  (account)       /account /orders /custom-requests /wishlist │
│                                                              │
│  (admin)         /admin (dashboard, orders, products,        │
│                   inventory, materials, custom-requests,     │
│                   customers, projects, content, analytics)    │
│                                                              │
│  ├── Server Components (default)                             │
│  ├── Server Actions (mutations)                              │
│  ├── Route Handlers  /api/* (webhooks, file streams)         │
│  └── Middleware (locale, auth gate, admin gate)              │
└──────────────────────────────────────────────────────────────┘
            │                                  │
            ▼                                  ▼
   ┌────────────────────┐            ┌──────────────────────┐
   │  Supabase Postgres │            │  Supabase Storage    │
   │  + RLS             │            │  (product-images,    │
   │  + Auth            │            │   request-files,     │
   │  + Edge Functions  │            │   avatars)           │
   └────────────────────┘            └──────────────────────┘
```

**Single app.** Everything above the database is one Next.js project on Vercel.

---

## 3. Directory Structure (target)

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # /
│   │   ├── shop/
│   │   ├── product/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── custom-furniture/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── wishlist/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   └── search/
│   ├── (account)/
│   │   └── account/...
│   ├── (admin)/
│   │   └── admin/...
│   ├── api/                          # route handlers only
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                           # shadcn/ui primitives
│   ├── layout/                       # Navbar, Footer, LocaleSwitcher
│   ├── shop/                         # ProductCard, Gallery, Filters
│   ├── custom-furniture/             # RequestForm, FilePicker, etc.
│   ├── dashboard/                    # Charts, KPIs, Tables
│   └── shared/                       # WhatsAppButton, WhatsAppFloater, etc.
├── lib/
│   ├── supabase/
│   │   ├── server.ts                 # server client
│   │   ├── client.ts                 # browser client
│   │   ├── middleware.ts             # session refresh
│   │   └── admin.ts                  # service-role (server-only)
│   ├── i18n/
│   │   ├── config.ts                 # {locales, default}
│   │   ├── dictionaries/{en,fr,ar}.ts
│   │   └── get-dictionary.ts
│   ├── validations/                  # zod schemas
│   ├── utils/                        # cn, formatters, currencies
│   └── types/                        # generated DB types + domain types
├── hooks/
├── stores/                           # zustand cart store (client-only)
├── messages/                         # next-intl message catalogs
├── supabase/
│   ├── migrations/                   # *.sql files (versioned)
│   ├── seed.sql
│   └── README.md
├── public/
├── middleware.ts                     # locale + auth gates
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                        # gitignored
```

---

## 4. Design System Setup (BEFORE feature work)

Hardcoded from CLAUDE.md — **no design-by-committee.**

### Tokens
| Token | Value |
|---|---|
| Primary | `#6B4F3A` |
| Secondary | `#E8DCCF` |
| Background | `#F8F6F3` |
| Accent | `#C96F4A` |
| Text | `#1F1F1F` |
| Success | `#68735B` |

### Typography
- **Manrope** (Google Fonts, self-hosted via `next/font`)
- Fallback to `Inter` (Next font default)
- **No serif fonts anywhere.**

### Spacing & Layout
- Editorial scale: 4/8/12/16/24/32/48/64/96/128
- Generous whitespace — this is the brand.

### Files
- `tailwind.config.ts` — extend theme with tokens above, font families, custom shadows.
- `app/globals.css` — CSS variables for light/dark compatible, custom utilities for RTL.
- `lib/utils/cn.ts` — Tailwind merge helper.

### Acceptance
- ✅ Tailwind config compiles.
- ✅ Brand colors render via `bg-primary`, `text-accent`, etc.
- ✅ Manrope loads without FOUT.
- ✅ RTL utilities present (`.rtl` & mirror-aware classes).

---

## 5. Phase Plan

Each phase lists: **deliverables · files · acceptance · verification**. Reuse components across phases — never duplicate.

---

### Phase 1 — Project Setup ⬜

**Deliverables**
- Next.js 15 App Router + TypeScript strict.
- Tailwind, ESLint, Prettier.
- shadcn/ui installed with config tied to tokens.
- Framer Motion, lucide-react, sonner (toasts).
- `package.json`, `tsconfig.json`, `next.config.ts` wired.
- `.env.example`, `.gitignore`, `README.md`.
- Folder structure per §3.

**Key files**
- `package.json`, `pnpm-lock.yaml`
- `tsconfig.json` (strict, path alias `@/*`)
- `next.config.ts` (image domains: Supabase storage)
- `tailwind.config.ts`, `postcss.config.mjs`
- `lib/utils/cn.ts`
- `components/ui/button.tsx` (first shadcn component to verify config)

**Acceptance**
- ✅ `pnpm dev` boots, root page renders.
- ✅ Brand colors and Manrope render correctly.
- ✅ TypeScript compiles with no `any`.

---

### Phase 2 — Supabase Setup ⬜

**Deliverables**
- Supabase project (free tier).
- All **20 tables** (CLAUDE.md §Database Tables) created via SQL migrations.
- RLS policies for every table.
- Storage buckets:
  - `product-images` (public read)
  - `project-images` (public read)
  - `request-files` (private, owner-or-admin)
  - `avatars` (public read, owner write)
- Seed script (categories, sample products, materials, FAQs, a demo admin).
- Generated TypeScript types via `supabase gen types`.

**SQL tables** (in this order, with FK constraints):
1. `profiles` (1:1 with `auth.users`, role enum)
2. `addresses`
3. `categories`
4. `products` + `product_images`
5. `wishlist_items`
6. `orders` + `order_items`
7. `custom_requests` + `custom_request_files`
8. `projects` + `project_images`
9. `materials` + `suppliers`
10. `inventory_movements`
11. `testimonials`
12. `faqs`
13. `notifications`
14. `settings` (singleton row)
15. `analytics_events`

**RLS policy matrix**
| Table | Customer (own uid) | Public read | Admin |
|---|---|---|---|
| profiles | rw | — | rw |
| addresses | rw | — | rw |
| orders | r | — | rw |
| order_items | r (via order) | — | rw |
| products | — | r | rw |
| custom_requests | rw (own) | — | rw |
| custom_request_files | rw (own) | — | rw |
| wishlist_items | rw (own) | — | rw |
| projects | — | r | rw |
| categories / materials / suppliers / faqs / testimonials | — | r | rw |

**Files**
- `supabase/migrations/0001_init.sql` … `NNNN_<topic>.sql`
- `supabase/seed.sql`
- `lib/supabase/{server,client,middleware,admin}.ts`
- `lib/types/database.ts` (generated)
- `.env.local` keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

**Acceptance**
- ✅ All migrations apply cleanly to a fresh Supabase project.
- ✅ RLS verified: anon cannot read orders; customer can read own orders; admin can read all.
- ✅ Storage buckets created; uploads via server action succeed.
- ✅ Generated types compile end-to-end.

---

### Phase 3 — Authentication ⬜

**Deliverables**
- Email/password (Supabase Auth) — free, no 3rd-party SMS needed.
- `profiles` row auto-created on sign-up via DB trigger.
- Middleware:
  - Refreshes session on every request.
  - Resolves locale.
  - Gates `(account)` and `(admin)` route groups.
- Sign in / Sign up / Forgot password pages (in 3 locales).
- `SessionProvider` for client components.
- Role-based redirect: `customer → /account`, `admin → /admin`.

**Files**
- `app/(public)/auth/sign-in/page.tsx`
- `app/(public)/auth/sign-up/page.tsx`
- `app/(public)/auth/forgot-password/page.tsx`
- `app/auth/callback/route.ts` (OAuth callback handler)
- `middleware.ts`
- `lib/supabase/middleware.ts`
- `components/forms/sign-in-form.tsx` / `sign-up-form.tsx`
- `lib/validations/auth.ts` (zod)
- SQL trigger: `on_auth_user_created → insert into profiles`

**Acceptance**
- ✅ Sign up → profile row created with role=`customer`.
- ✅ Sign in redirects to `/account` or `/admin` based on role.
- ✅ Direct visit to `/admin` as anonymous → redirected to sign-in.
- ✅ Sign-out clears session.

---

### Phase 4 — Public Website ⬜

**Deliverables**
Layout shell + static/marketing pages, all available in the public route group.

**Pages**
- `/` — Hero, featured products, featured projects, testimonials, custom-furniture CTA, WhatsApp floater.
- `/about` — Brand story, craftsmanship, materials, team.
- `/contact` — Form (name, email, phone, message) → persists to `notifications`; WhatsApp link prominent.
- `/faq` — From `faqs` table, categorized.
- `/search` — Client + server full-text over products/projects.

**Shared Components**
- `<Navbar />` (sticky, transparent on hero, solid on scroll)
- `<Footer />` (links, locale switcher, social, WhatsApp)
- `<WhatsAppFloater />` (visible everywhere, configurable per-page message)
- `<LocaleSwitcher />` (EN / FR / AR with RTL toggle)
- `<NewsletterForm />`

**Files**
- `app/(public)/layout.tsx`
- `components/layout/{navbar,footer,locale-switcher,whatsapp-floater}.tsx`
- `app/(public)/page.tsx` + section components
- `app/(public)/about/page.tsx`
- `app/(public)/contact/page.tsx` + server action
- `app/(public)/faq/page.tsx`
- `app/(public)/search/page.tsx`

**Acceptance**
- ✅ All pages render SSR with no client-side fetching unless required.
- ✅ Locale switcher updates URL & rerenders.
- ✅ RSS/structured-data OK.
- ✅ WhatsApp link works on mobile (deep link `wa.me/<number>`) and desktop (`web.whatsapp.com`).

---

### Phase 5 — Product Catalog ⬜

**Deliverables**

- **Category listing** `/shop/category/[slug]`
- **Shop** `/shop` with filters (category, price, material, color, in-stock) and sort.
- **Product detail** `/product/[slug]`
  - Gallery (Next/Image, Supabase-hosted)
  - Specs, dimensions, materials
  - Reviews (later phase hook)
  - Related products
  - Wishlist button
  - Add to cart / Buy now
  - **WhatsApp inquiry** — pre-filled with product name & SKU
  - **"Customize this design"** — opens custom-furniture form pre-seeded with product dimensions
- **Wishlist** `/wishlist` (signed-in required, otherwise localStorage fallback OR prompt to sign in)

**Files**
- `app/(public)/shop/page.tsx`
- `app/(public)/shop/category/[slug]/page.tsx`
- `app/(public)/product/[slug]/page.tsx`
- `components/shop/{product-card,product-gallery,product-specs,filter-bar,sort-select,review-list}.tsx`
- `components/shared/whatsapp-button.tsx` (with template by context)
- `lib/validations/product.ts`
- `app/(public)/wishlist/page.tsx`

**Acceptance**
- ✅ Filters update results via URL search params (no client state for query).
- ✅ Image gallery navigable via keyboard.
- ✅ "Customize this design" deep-links into `/custom-furniture?from=<slug>`.
- ✅ WhatsApp message template includes product URL.

---

### Phase 6 — Cart ⬜

**Deliverables**
- Zustand store `useCart` persisted to `localStorage` + (if signed in) mirrored to `wishlist_items` for a saved cart (optional stretch, MVP can skip server cart).
- `<CartDrawer />` (slide-over) and `/cart` page parity.
- Quantity update, remove, totals.

**Files**
- `stores/cart.ts`
- `components/shop/cart-drawer.tsx`
- `components/shop/cart-item-row.tsx`
- `components/shop/cart-summary.tsx`
- `app/(public)/cart/page.tsx`

**Acceptance**
- ✅ Cart survives refresh via localStorage.
- ✅ Add-to-cart triggers drawer auto-open from product page.
- ✅ Empty state with CTA back to `/shop`.

---

### Phase 7 — Checkout (COD) ⬜

**Deliverables**
- `/checkout` — single step (no multi-step wizard).
- Fields: **Full Name, Phone, Email, City, Address, Notes.**
- **Cash on Delivery notice** prominent.
- Server action creates `orders` + `order_items`, decrements `inventory`, sends notification.
- `/order-confirmation?order=<id>` page — shows order summary + WhatsApp "Support my order" CTA.

**Files**
- `app/(public)/checkout/page.tsx`
- `components/shop/checkout-form.tsx`
- `lib/validations/checkout.ts`
- `app/(public)/order-confirmation/page.tsx`
- Server action: `app/(public)/checkout/actions.ts`

**Acceptance**
- ✅ Submitting creates an `order` with status `pending`.
- ✅ COD notice is unmissable.
- ✅ Inventory atomically decremented (use Postgres `update ... where stock >= qty`).
- ✅ Customer gets a confirmation email (Supabase SMTP) **and** a WhatsApp message template link.

---

### Phase 8 — Custom Furniture Requests ⬜

> **First-class feature.** Equal weight to ecommerce.

**Deliverables**

- `/custom-furniture` page:
  - Marketing hero, "how it works", examples, prominent CTA.
  - Form with:
    - Furniture type (select: bench, table, bed, wardrobe, sofa, other)
    - Dimensions (L × W × H, cm)
    - Material preference (multi-select from `materials`)
    - Budget range (slider/select in MAD)
    - Description (textarea)
    - Multiple image uploads
    - Multiple file attachments (PDF/DWG/SketchUp — optional)
    - Pinterest references (URLs, optional)
    - Contact info reuse from auth or collect fresh if anonymous
- Admin route: `/admin/custom-requests` to manage lifecycle (see Phase 10).
- Server action uploads to `request-files` bucket, attaches to `custom_requests`.
- Statuses: `received → reviewing → quotation_sent → negotiation → accepted → in_production → completed` (+ `rejected`).

**Files**
- `app/(public)/custom-furniture/page.tsx`
- `components/custom-furniture/request-form.tsx`
- `components/custom-furniture/file-picker.tsx`
- `components/custom-furniture/material-selector.tsx`
- `components/custom-furniture/dimension-input.tsx`
- `lib/validations/custom-request.ts`
- `app/(public)/custom-furniture/actions.ts` (server action)
- Account view: `/account/custom-requests` (list + status timeline)

**Acceptance**
- ✅ Form persists a row + uploaded files; user sees their request in `/account/custom-requests`.
- ✅ Anonymous users can submit (captures contact fields) — flagged in admin.
- ✅ Image upload size limit + MIME validation server-side.
- ✅ Status transitions enforced server-side.
- ✅ "Notify by WhatsApp" link uses the latest status for context.

---

### Phase 9 — Customer Portal ⬜

**Deliverables — `(account)` route group, auth-gated**
- `/account` — overview cards: recent orders, recent requests, wishlist preview.
- `/account/orders` — list + detail with timeline.
- `/account/custom-requests` — list + detail with status & quotation.
- `/account/wishlist` — full list with add-to-cart.
- `/account/profile` — name, email, phone, locale.
- `/account/addresses` — CRUD.
- `/account/notifications` — in-app notifications bell + center.

**Files**
- `app/(account)/layout.tsx` (sidebar nav)
- All pages above
- `components/account/{sidebar,order-card,request-card,notification-bell}.tsx`
- Server actions for CRUD

**Acceptance**
- ✅ Customer can only see their own data (RLS verified).
- ✅ Notification badge updates when admin sends.
- ✅ All forms use React Hook Form + zod.

---

### Phase 10 — Admin Dashboard ⬜

> Admin auth via `profiles.role = 'admin'` checked in middleware.

**Deliverables — `(admin)` route group, role-gated**

- `/admin` — KPI dashboard:
  - Revenue (last 30 days)
  - Order count, conversion, AOV
  - Custom requests by status
  - Low-stock alerts
  - Recharts line + bar + donut
- `/admin/orders` — table + filters + status update drawer.
- `/admin/products` — CRUD; image manager.
- `/admin/categories`, `/admin/materials`, `/admin/suppliers` — CRUD.
- `/admin/inventory` — see Phase 11.
- `/admin/custom-requests` — see below.
- `/admin/customers` — list, view orders/requests.
- `/admin/projects`, `/admin/content` (`faqs`, `testimonials`), `/admin/settings` — CRUD.
- `/admin/notifications` — send to specific users.

### Custom Request Admin
- Kanban or table view with status pills.
- Each card shows: contact info, images, materials, budget, dimensions, description.
- Actions:
  - **Send quotation** — modal with line items + total + validity, attaches to request, status → `quotation_sent`. Optionally posts a `notifications` row + WhatsApp template link.
  - **Add internal note** — private to admins.
  - **Advance status** through lifecycle.
  - **Reject** with reason.

**Files**
- `app/(admin)/layout.tsx` (sidebar + admin guard)
- `components/dashboard/{kpi-card,revenue-chart,orders-chart,low-stock-table,status-pill}.tsx`
- All admin pages with reusable `<DataTable />` component.
- `components/custom-furniture/admin/{quotation-modal,request-detail-panel,timeline}.tsx`

**Acceptance**
- ✅ Admin gate enforced in middleware + RLS + page-level guard.
- ✅ Quotation → customer sees in `/account/custom-requests`.
- ✅ Status advances emit notifications.

---

### Phase 11 — Inventory ⬜

**Deliverables**
- `/admin/inventory`:
  - Per-product stock + warehouse value.
  - `inventory_movements` ledger (in/out, reason: order, manual, return, adjustment).
  - Low-stock threshold per product.
- `/admin/materials`:
  - Material catalog (wood type, fabric, finish).
  - Cost per unit, supplier link.
- Auto-decrement on order completion.

**Files**
- `app/(admin)/inventory/page.tsx`
- `components/dashboard/inventory-table.tsx`
- `components/dashboard/movement-form.tsx`
- Server actions + zod.

**Acceptance**
- ✅ Stock decrement is transactional (no negative stock).
- ✅ Low-stock notifications emitted when threshold breached.
- ✅ Full movement history auditable.

---

### Phase 12 — Analytics ⬜

**Deliverables**
- `/admin/analytics`:
  - Revenue over time (line)
  - Orders by city (bar)
  - Top products (bar)
  - Custom-request conversion funnel
  - Material usage (donut)
  - Traffic sources (table, captured via `analytics_events`)
- Capture pipeline: server-action `logEvent(name, props)` writing to `analytics_events`.

**Files**
- `app/(admin)/analytics/page.tsx`
- `components/dashboard/analytics/*` Recharts components.
- `lib/analytics/log-event.ts`
- Edge: include `analytics_events` insert in checkout, custom request, product view server actions.

**Acceptance**
- ✅ Analytics are correct against `orders` & `custom_requests` ground truth.
- ✅ Charts render with zero-cost loading (Recharts SSR-friendly).
- ✅ Date range picker functional.

---

### Phase 13 — RTL Support ⬜

**Deliverables**
- `next-intl` (or equivalent i18n lib) installed.
- Locale-aware middleware: `/{locale}/...` rewrites OR cookie-based locale.
- Message catalogs in `messages/{en,fr,ar}.json`.
- RTL CSS: `dir="rtl"` on `<html>`, logical Tailwind classes (`ms-4` not `ml-4`), `tailwindcss-rtl` plugin OR careful class audit.
- All hardcoded strings migrated to dictionaries.

**Files**
- `middleware.ts` (locale + auth + admin)
- `lib/i18n/{config,get-dictionary}.ts`
- `messages/{en,fr,ar}.json`
- `tailwind.config.ts` (logical-property plugin if added)
- RTL audit for every component from Phases 4–12.

**Acceptance**
- ✅ `/ar/*` renders Arabic with `dir="rtl"`, mirrored layout.
- ✅ No broken icons or off-side images.
- ✅ Form labels, placeholders, errors Arabic-correct.
- ✅ Font supports Arabic glyphs (Manrope does for Latin; consider `IBM Plex Sans Arabic` or `Noto Sans Arabic` for Arabic text — add as bilingual stack).

---

### Phase 14 — SEO ⬜

**Deliverables**
- Per-page `generateMetadata` (title, description, OG, Twitter).
- `app/sitemap.ts` — dynamic from products, projects, categories.
- `app/robots.ts`.
- JSON-LD: `Product`, `BreadcrumbList`, `Organization`, `LocalBusiness` (Morocco), `FAQ`.
- Localized SEO: `hreflang` for EN/FR/AR on every public page.
- Core Web Vitals pass: LCP < 2.5s, CLS < 0.1, INP < 200ms.

**Files**
- `app/sitemap.ts`, `app/robots.ts`
- `lib/seo/jsonld.ts` (helpers)
- Per-page metadata in each route.
- Image optimization pass (Next/Image with proper `sizes`).

**Acceptance**
- ✅ Lighthouse SEO ≥ 95 for /, /shop, /product/[slug].
- ✅ Google Rich Results test passes for a product page.
- ✅ `hreflang` cluster correct.

---

### Phase 15 — Production Deployment ⬜

**Deliverables**
- Vercel project linked.
- Env vars set in Vercel (`NEXT_PUBLIC_SUPABASE_URL`, anon, service-role).
- Supabase production branch promoted (all migrations applied).
- Domain configured (or `*.vercel.app`).
- CI: optional GitHub Action for `pnpm lint && pnpm typecheck && pnpm build`.
- Monitoring: Vercel Analytics enabled, Supabase logs reviewed weekly.

**Pre-deploy checklist**
- [ ] All budgets & limits within free tier.
- [ ] No service-role key leaked to client.
- [ ] RLS enabled on every table.
- [ ] Storage policies in place.
- [ ] 404 / 500 / not-found pages styled.

**Acceptance**
- ✅ Production build succeeds.
- ✅ Sign up → order → admin verify → analytics happy path.
- ✅ WhatsApp links verified on iOS + Android + desktop.

---

## 6. Cross-Cutting Concerns

These apply to **every** phase, not just their owning phase.

### 6.1 WhatsApp Integration (PERMANENT)
- WhatsApp number stored in `settings` (admin-editable).
- Helper `lib/utils/whatsapp.ts` → `buildWaLink(template, vars)` produces `https://wa.me/<phone>?text=<encoded>`.
- Always include contextual template per use case:
  - Product inquiry: product name, URL.
  - Custom request: request id, dimensions, budget.
  - Order support: order id, customer name.
  - Quotation follow-up: request id + quoted amount.
- `<WhatsAppButton variant context />` reusable component.

### 6.2 Forms Everywhere
- **React Hook Form** + **zod resolver** + server-side validation in server actions.
- Schema definitions in `lib/validations/*.ts`, shared client/server.

### 6.3 Performance
- Server Components by default. Only `use client` for: forms, cart store, animations, image carousels, locale switcher, charts.
- `next/dynamic` for heavy client components.
- Image optimization: `next/image` with `sizes` and Supabase loader.

### 6.4 Accessibility
- All interactive elements keyboard-visible.
- `aria-label` on icon-only buttons.
- Color contrast > 4.5 (WCAG AA).
- Form errors announced via `aria-live`.

### 6.5 Security
- No `SUPABASE_SERVICE_ROLE_KEY` on client.
- All uploads MIME-checked server-side.
- File size limits enforced.
- Quotation emails/notifications include only necessary info.

### 6.6 Cost & Free-Tier Safety
- Supabase DB size, storage, bandwidth — monitor dashboards.
- No scheduled Edge Functions (free tier limits).
- Vercel: keep serverless invocation count down via caching (`revalidateTag`).

---

## 7. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Supabase free tier limits hit | Outage | Cache aggressively, archive old `analytics_events` rows. |
| Cart without auth can't merge on sign-in | Lost carts | On sign-in, merge localStorage cart into customer record by SKU. |
| Custom request file uploads slow on poor networks | Bad UX | Client-side image compress (`browser-image-compression`) before upload. |
| RTL breaks complex layouts | Brand inconsistency | Build layout audit as part of Phase 13 with explicit checklist. |
| WhatsApp deep links open web instead of app on iOS Safari | Lower conversion | Use `wa.me` (universal). Provide fallback `<a>` and a copy-number button. |
| Order double-submit | Duplicate orders | Disable submit + idempotency key in server action. |
| Admin gate bypass via direct DB write | Data leak | RLS is the only authoritative check, not middleware. |

---

## 8. Open Questions (to answer before Phase 6/8)

1. **WhatsApp number** — primary business number (international format with country code). Where stored? (plan: `settings` table admin-editable.)
2. **Currency** — confirm MAD; display rounding rules; per-locale currency formatting.
3. **Cities served** — list of Moroccan cities for shipping + analytics by city.
4. **Languages priority at launch** — EN only first, FR second, AR third? Or all three at MVP?
5. **Sample products / projects count** — how many to seed (≥10 categories, ≥40 products, ≥8 projects).
6. **Demo admin credentials** — used in seed for first login. Must rotate after first deploy.
7. **Custom-furniture anonymous submissions** — allowed at MVP (collects email/phone) or sign-in mandatory?
8. **Quotation delivery channel** — in-app notification only, or also email/WhatsApp auto-send at MVP?
9. **Wishlist for anonymous users** — localStorage only with sign-in prompt, or sign-in mandatory?

> Default answer used when not specified: **all three locales at MVP, 40 products / 8 projects seeded, anonymous custom requests allowed, WhatsApp links provided to admin copy/paste (no auto-send at MVP), wishlist localStorage-only fallback.**

---

## 9. Verification Cadence

After **each sub-task**, verify:
- [ ] Compiles (`pnpm typecheck`)
- [ ] Lints (`pnpm lint`)
- [ ] Responsive at 360 / 768 / 1280 / 1536
- [ ] RTL renders correctly (if UI)
- [ ] Accessibility basics (keyboard, contrast)
- [ ] DevTools network: no leaked secrets

---

## 10. Out-of-Scope (for later, post-MVP)

- Loyalty / referral program
- Gift cards
- Live chat (we use WhatsApp)
- Native mobile app
- POS / in-store sync
- Multi-currency / multi-country
- Email marketing automation beyond order confirmations

---

## 11. Status Tracker

| # | Phase | Status | Notes |
|---|---|---|---|
| 1 | Project Setup | ⬜ | |
| 2 | Supabase Setup | ⬜ | |
| 3 | Authentication | ⬜ | |
| 4 | Public Website | ⬜ | |
| 5 | Product Catalog | ⬜ | |
| 6 | Cart | ⬜ | |
| 7 | Checkout (COD) | ⬜ | |
| 8 | Custom Furniture Requests | ⬜ | |
| 9 | Customer Portal | ⬜ | |
| 10 | Admin Dashboard | ⬜ | |
| 11 | Inventory | ⬜ | |
| 12 | Analytics | ⬜ | |
| 13 | RTL / i18n | ⬜ | |
| 14 | SEO | ⬜ | |
| 15 | Deployment | ⬜ | |

---

*Last updated: 2026-06-25.*
