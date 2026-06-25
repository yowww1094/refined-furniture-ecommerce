-- Supabase Migration 0005
-- Row Level Security (RLS) Policies and Storage Buckets

-- First, enable RLS on all tables if not already done (should be done in previous migrations)
-- We'll enable RLS on tables that may have missed it
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.custom_request_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.events ENABLE ROW LEVEL SECURITY;

-- Create storage buckets if they don't exist
-- Note: This requires the storage extension and appropriate permissions.
-- Using the storage schema via the Supabase API would be preferable, but we can attempt SQL.

-- Insert buckets into storage.buckets table (if the schema exists)
DO $$
BEGIN
    -- Check if storage schema exists (it should if supabase_storage extension is enabled)
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
        -- Create buckets array
        INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
            ('product-images', 'product-images', true, 52428800, '{image/jpeg,image/png,image/webp,image/gif}'),
            ('project-images', 'project-images', true, 52428800, '{image/jpeg,image/png,image/webp,image/gif}'),
            ('request-files', 'request-files', false, 10485760, '{image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain}'),
            ('avatars', 'avatars', true, 5242880, '{image/jpeg,image/png,image/webp,image/gif}')
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- ======================
-- POLICIES FOR PROFILES
-- ======================
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR ADDRESSES
-- ======================
-- Users can view their own addresses
CREATE POLICY "Users can view their own addresses" ON public.addresses
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own addresses
CREATE POLICY "Users can insert their own addresses" ON public.addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own addresses
CREATE POLICY "Users can update their own addresses" ON public.addresses
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own addresses
CREATE POLICY "Users can delete their own addresses" ON public.addresses
    FOR DELETE USING (auth.uid() = user_id);

-- Admins can manage all addresses
CREATE POLICY "Admins can manage all addresses" ON public.addresses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR CATEGORIES
-- ======================
-- Everyone can view active categories
CREATE POLICY "Public can view active categories" ON public.categories
    FOR SELECT USING (is_active = true);

-- Admins can manage categories
CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR MATERIALS
-- ======================
-- Everyone can view active materials
CREATE POLICY "Public can view active materials" ON public.materials
    FOR SELECT USING (is_active = true);

-- Admins can manage materials
CREATE POLICY "Admins can manage materials" ON public.materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR SUPPLIERS
-- ======================
-- Everyone can view active suppliers
CREATE POLICY "Public can view active suppliers" ON public.suppliers
    FOR SELECT USING (is_active = true);

-- Admins can manage suppliers
CREATE POLICY "Admins can manage suppliers" ON public.suppliers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR PRODUCTS
-- ======================
-- Everyone can view active products
CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (is_active = true);

-- Admins can manage products
CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR PRODUCT_IMAGES
-- ======================
-- Everyone can view product images (linked to active products)
CREATE POLICY "Public can view product images" ON public.product_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products WHERE products.id = product_id AND products.is_active = true
        )
    );

-- Admins can manage product images
CREATE POLICY "Admins can manage product images" ON public.product_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR ORDERS
-- ======================
-- Users can view their own orders
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create orders
CREATE POLICY "Users can create orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders (limited fields maybe)
CREATE POLICY "Users can update their own orders" ON public.orders
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all orders
CREATE POLICY "Admins can manage all orders" ON public.orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR ORDER_ITEMS
-- ======================
-- Users can view order items from their orders
CREATE POLICY "Users can view their order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders WHERE orders.id = order_id AND orders.user_id = auth.uid()
        )
    );

-- Admins can manage order items
CREATE POLICY "Admins can manage order items" ON public.order_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR CUSTOM_REQUESTS
-- Users can view their customizable fields hj hx   RECEIPT
   CREATE    POLICY   ``   "Users can view their own custom requests" ON public.custom_requests
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create custom requests
CREATE POLICY "Users can create custom requests" ON public.custom_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own custom requests (while in certain statuses?)
CREATE POLICY "Users can update their own custom requests" ON public.custom_requests
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all custom requests
CREATE POLICY "Admins can manage all custom requests" ON public.custom_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR CUSTOM_REQUEST_FILES
-- ======================
-- Users can view files attached to their custom requests
CREATE POLICY "Users can view their custom request files" ON public.custom_request_files
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.custom_requests WHERE custom_requests.id = custom_request_id AND custom_requests.user_id = auth.uid()
        )
    );

-- Users can upload files to their custom requests
CREATE POLICY "Users can upload files to their custom requests" ON public.custom_request_files
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.custom_requests WHERE custom_requests.id = custom_request_id AND custom_requests.user_id = auth.uid()
        )
    );

-- Users can delete their own custom request files
CREATE POLICY "Users can delete their own custom request files" ON public.custom_request_files
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.custom_requests WHERE custom_requests.id = custom_request_id AND custom_requests.user_id = auth.uid()
        )
    );

-- Admins can manage all custom request files
CREATE POLICY "Admins can manage all custom request files" ON public.custom_request_files
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR PROJECTS
-- ======================
-- Users can view projects associated with their custom requests
CREATE POLICY "Users can view their projects" ON public.projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.custom_requests WHERE custom_requests.id = project_id AND custom_requests.user_id = auth.uid()
        )
    );

-- Admins can manage all projects
CREATE POLICY "Admins can manage all projects" ON public.projects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR PROJECT_IMAGES
-- ======================
-- Users can view project images from their projects
CREATE POLICY "Users can view their project images" ON public.project_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects WHERE projects.id = project_id AND projects.id IN (
                SELECT project_id FROM public.custom_requests WHERE user_id = auth.uid()
            )
        )
    );

-- Admins can manage all project images
CREATE POLICY "Admins can manage all project images" ON public.project_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR INVENTORY_MOVEMENTS
-- ======================
-- Admins can manage inventory movements
CREATE POLICY "Admins can manage inventory movements" ON public.inventory_movements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users can view inventory movements for products they own? Actually, inventory is admin-only typically.
-- We'll keep it admin-only for viewing as well.
CREATE POLICY "Admins can view inventory movements" ON public.inventory_movements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR FAQS
-- ======================
-- Everyone can view active FAQs
CREATE POLICY "Public can view active FAQs" ON public.faqs
    FOR SELECT USING (is_active = true);

-- Admins can manage FAQs
CREATE POLICY "Admins can manage FAQs" ON public.faqs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR NOTIFICATIONS
-- ======================
-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all notifications
CREATE POLICY "Admins can manage all notifications" ON public.notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ======================
-- POLICIES FOR SETTINGS
-- ======================
-- Admins can manage settings
CREATE POLICY "Admins can manage settings" ON public.settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Everyone can view settings (maybe)
CREATE POLICY "Public can view settings" ON public.settings
    FOR SELECT USING (true);

-- ======================
-- POLICIES FOR EVENTS
-- ======================
-- Admins can manage events (audit log)
CREATE POLICY "Admins can manage events" ON public.events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Everyone can view events (maybe for transparency)
CREATE POLICY "Public can view events" ON public.events
    FOR SELECT USING (true);

-- Note: Policies for inserting into events should be restricted to system/triggers, not users.
-- We'll leave that to be handled by service roles or triggers.