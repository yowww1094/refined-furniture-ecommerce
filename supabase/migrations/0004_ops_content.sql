-- Supabase Migration 0004
-- Operations & Content: inventory_movements, faqs, notifications, settings, events

-- Inventory movements (stock adjustments)
CREATE TABLE public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    quantity_change INTEGER NOT NULL, -- positive for stock in, negative for stock out
    reason TEXT NOT NULL, -- e.g., 'purchase', 'return', 'adjustment', 'damaged'
    reference_id TEXT, -- optional reference to order id, etc.
    reference_type TEXT, -- e.g., 'order', 'adjustment'
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- who made the change
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Frequently Asked Questions
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT, -- e.g., 'shipping', 'returns', 'custom_orders'
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Notifications (for users)
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'order_update', 'custom_request', 'promo', 'system'
    is_read BOOLEAN DEFAULT FALSE,
    related_id TEXT, -- optional ID of related entity (order_id, request_id)
    related_type TEXT, -- e.g., 'order', 'custom_request'
    action_url TEXT, -- URL to navigate when clicked
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Application settings (key-value store)
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB, -- flexible value storage
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Events / audit log (for tracking important actions)
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL, -- e.g., 'order_created', 'order_status_changed'
    entity_type TEXT, -- e.g., 'order', 'custom_request'
    entity_id UUID, -- ID of the entity
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- who triggered the event
    metadata JSONB, -- additional context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable row level security (policies will be added in P2.6)
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create updated_at triggers for tables that have it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_faqs_updated_at') THEN
        CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE
        ON public.faqs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_settings_updated_at') THEN
        CREATE TRIGGER update_settings_updated_at BEFORE UPDATE
        ON public.settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END $$;

-- Note: inventory_movements, notifications, events typically don't need updated_at triggers
-- as they are append-only logs.