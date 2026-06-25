-- Supabase Migration 0003
-- Commerce + Projects: orders, order_items, custom_requests, custom_request_files, projects, project_images

-- Enums for statuses
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE custom_request_status AS ENUM ('received', 'reviewing', 'quotation_sent', 'negotiation', 'accepted', 'in_production', 'completed', 'rejected');
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'completed', 'on_hold', 'cancelled');

-- Orders table (Cash On Delivery orders)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Order items (products within an order)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL, -- price at time of purchase
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Custom furniture requests
CREATE TABLE public.custom_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
    status custom_request_status DEFAULT 'received',
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    -- Dimensions for the furniture piece
    length DECIMAL(8,2), -- in cm
    width DECIMAL(8,2), -- in cm
    height DECIMAL(8,2), -- in cm
    weight DECIMAL(8,2), -- estimated weight in kg
    materials_preference TEXT[], -- preferred materials
    -- Contact info (can be different from user profile)
    contact_name TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    -- WhatsApp integration
    whatsapp_opt_in BOOLEAN DEFAULT TRUE,
    -- Admin fields
    admin_notes TEXT,
    quoted_price DECIMAL(10,2),
    expected_delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Files attached to custom requests (images, documents, etc.)
CREATE TABLE public.custom_request_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_request_id UUID REFERENCES public.custom_requests(id) ON DELETE CASCADE NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL, -- e.g., 'image', 'pdf', 'doc'
    file_name TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Projects (approved custom requests that become projects)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_request_id UUID REFERENCES public.custom_requests(id) ON DELETE SET NULL,
    status project_status DEFAULT 'planning',
    -- Project details
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    expected_end_date DATE,
    actual_end_date DATE,
    total_cost DECIMAL(10,2),
    -- Materials used (could be copied from custom request or adjusted)
    materials_used JSONB,
    -- Dimensions final
    final_length DECIMAL(8,2),
    final_width DECIMAL(8,2),
    final_height DECIMAL(8,2),
    final_weight DECIMAL(8,2),
    -- Location for delivery/installation
    delivery_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
    -- Admin/internal notes
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Project images (progress photos, final product images)
CREATE TABLE public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable row level security (policies will be added in P2.6)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_request_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Create updated_at triggers for commerce/projects tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_orders_updated_at') THEN
        CREATE TRIGGER update_orders_updated_at BEFORE UPDATE
        ON public.orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_order_items_updated_at') THEN
        CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE
        ON public.order_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_custom_requests_updated_at') THEN
        CREATE TRIGGER update_custom_requests_updated_at BEFORE UPDATE
        ON public.custom_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_custom_request_files_updated_at') THEN
        CREATE TRIGGER update_custom_request_files_updated_at BEFORE UPDATE
        ON public.custom_request_files FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
        CREATE TRIGGER update_projects_updated_at BEFORE UPDATE
        ON public.projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_project_images_updated_at') THEN
        CREATE TRIGGER update_project_images_updated_at BEFORE UPDATE
        ON public.project_images FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END $$;