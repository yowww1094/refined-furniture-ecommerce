# CLAUDE.md

# Premium Moroccan Furniture Platform

## Project Overview

This repository contains a production-ready furniture ecommerce and custom furniture platform for a Moroccan furniture manufacturer.

The business operates through two primary models:

### Ready-Made Furniture

Customers browse products and place Cash On Delivery orders.

### Custom Furniture Atelier

Customers submit furniture requests with dimensions, images, inspiration references, materials, and budgets.

The company reviews requests, sends quotations, manufactures furniture, and delivers completed projects.

The platform includes:

* Public Website
* Ecommerce Store
* Custom Furniture Request System
* Customer Portal
* Admin Dashboard
* Inventory Management
* Material Tracking
* Content Management
* Analytics

---

# Core Business Rules

## Payment Model

Cash On Delivery only.

Do not implement:

* Stripe
* PayPal
* Credit Card Processing
* Online Payment Gateways

Orders are confirmed manually by the business.

---

## Custom Furniture Requests

Custom requests are a first-class feature.

Treat them with the same importance as ecommerce.

Every request must support:

* Images
* File Attachments
* Material Selection
* Budget Range
* Dimensions
* Description

---

## WhatsApp First

The business relies heavily on WhatsApp communication.

Always prioritize WhatsApp integration opportunities.

Examples:

* Contact buttons
* Product inquiries
* Custom project inquiries
* Order support

---

# Tech Stack

## Frontend

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

## Backend

Use Next.js only.

Use:

* Server Components
* Server Actions
* Route Handlers

Do not create a separate backend.

Do not introduce:

* Express
* NestJS
* Microservices

## Database

Supabase PostgreSQL

## Authentication

Supabase Auth

Roles:

* Admin
* Customer

## Storage

Supabase Storage

Used for:

* Product Images
* Project Images
* Customer Uploads
* Custom Request Files

## Forms

* React Hook Form
* Zod

## Charts

* Recharts

## Deployment

Frontend:
Vercel

Backend:
Next.js

Database:
Supabase

Storage:
Supabase Storage

Authentication:
Supabase Auth

The entire application must be deployable on:

* Vercel Free Tier
* Supabase Free Tier

---

# Architecture Principles

## Keep It Simple

Prefer simple solutions.

Avoid enterprise complexity.

Avoid over-engineering.

Avoid premature optimization.

---

## Single Application

Everything lives inside the Next.js application.

Do not create:

* Separate APIs
* Separate Admin App
* Separate Backend Services

Use route groups.

Example:

app/
(public)
(account)
(admin)

---

## Component Driven

Build reusable UI components.

Examples:

components/ui
components/layout
components/shop
components/custom-furniture
components/dashboard

Avoid duplicate code.

---

# Internationalization

Supported Languages:

* English
* French
* Arabic

Requirements:

* Full RTL support
* Locale-aware routing
* Translatable content

Every feature must work in Arabic RTL mode.

---

# Design System

Style:

Modern Moroccan Luxury

Characteristics:

* Large whitespace
* Premium typography
* Warm neutral colors
* Editorial layouts
* Sophisticated product presentation

Colors:

Primary:
#6B4F3A

Secondary:
#E8DCCF

Background:
#F8F6F3

Accent:
#C96F4A

Text:
#1F1F1F

Success:
#68735B

Typography:

Manrope

Fallback:

Inter

No serif fonts.

---

# Public Routes

/

/shop

/shop/category/[slug]

/product/[slug]

/wishlist

/cart

/checkout

/order-confirmation

/custom-furniture

/projects

/projects/[slug]

/about

/contact

/search

/faq

---

# Customer Routes

/account

/account/orders

/account/custom-requests

/account/wishlist

/account/profile

/account/addresses

/account/notifications

---

# Admin Routes

/admin

/admin/orders

/admin/products

/admin/categories

/admin/inventory

/admin/materials

/admin/custom-requests

/admin/customers

/admin/projects

/admin/content

/admin/analytics

/admin/settings

/admin/notifications

---

# Database Tables

profiles

addresses

categories

products

product_images

wishlist_items

orders

order_items

custom_requests

custom_request_files

projects

project_images

materials

suppliers

inventory_movements

testimonials

faqs

notifications

settings

analytics_events

---

# Security Rules

Use Supabase RLS.

Customers may only access:

* Their own profile
* Their own orders
* Their own custom requests
* Their own wishlist

Admins may access everything.

Protect all admin routes.

Validate all user input.

Sanitize uploads.

---

# Development Workflow

Before implementing any feature:

1. Understand requirements.
2. Review existing architecture.
3. Reuse existing components.
4. Create clean types.
5. Implement feature.
6. Verify responsive behavior.
7. Verify RTL compatibility.
8. Verify accessibility.
9. Verify TypeScript correctness.

---

# Code Standards

## TypeScript

Always use strict typing.

Avoid any.

Create proper interfaces and types.

---

## Components

Keep components focused.

Extract reusable patterns.

Avoid giant components.

---

## Styling

Use Tailwind CSS.

Prefer reusable component variants.

Avoid inline styles.

---

## Data Fetching

Prefer:

Server Components

Server Actions

Only use client-side fetching when necessary.

---

## Forms

Always use:

React Hook Form

Zod Validation

Server-side validation

---

# Ecommerce Requirements

## Product Page

Must support:

* Gallery
* Specifications
* Materials
* Dimensions
* Reviews
* Related Products
* Wishlist
* Add To Cart
* Buy Now
* WhatsApp Inquiry
* Customize This Design

---

## Cart

Support:

* Quantity Updates
* Remove Item
* Order Summary

---

## Checkout

Collect:

* Full Name
* Phone
* Email
* City
* Address
* Notes

Display:

Cash On Delivery Notice

---

# Custom Furniture Requirements

Custom requests are a primary business feature.

Each request should support:

* Furniture Type
* Dimensions
* Material Preference
* Budget
* Description
* Multiple Images
* Multiple Attachments
* Pinterest References

Statuses:

Received

Reviewing

Quotation Sent

Negotiation

Accepted

In Production

Completed

Rejected

---

# Admin Dashboard Requirements

## Dashboard

Display:

* Revenue
* Orders
* Inventory Value
* Custom Requests
* KPIs
* Charts

## Orders

Manage order lifecycle.

## Products

Manage catalog.

## Inventory

Manage stock.

## Materials

Manage raw materials.

## Custom Requests

Manage quotations and production.

## Analytics

Business insights and reporting.

---

# Performance Requirements

Use:

* Next.js Image
* Dynamic Imports
* Lazy Loading
* Route Segmentation
* Server Components

Optimize for Core Web Vitals.

---

# SEO Requirements

Implement:

* Metadata
* Open Graph
* Sitemap
* Structured Data
* Product SEO
* Project SEO
* Localized SEO

---

# MVP Priorities

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

Do not skip steps.

Complete one phase before moving to the next.

---

# Success Criteria

The final product should function as:

* Premium Furniture Brand Website
* Ecommerce Store
* Custom Furniture Platform
* Portfolio Showcase
* Customer Portal
* Inventory Management System
* CRM
* Admin Dashboard
* Analytics Platform

The solution should remain simple, maintainable, scalable, and deployable on Vercel + Supabase free tiers.
