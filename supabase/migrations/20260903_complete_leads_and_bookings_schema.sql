-- ==============================================================================
-- PLUMBERINDORE SUPABASE DATABASE MIGRATION
-- Migration: 20260903_complete_leads_and_bookings_schema.sql
-- Target Project: hnawwvxvfdnkmwtytwre (https://hnawwvxvfdnkmwtytwre.supabase.co)
-- Description: Complete schema for Bookings, Leads, Contact Messages, 
--              Quote Requests, and public/admin RLS policies.
-- ==============================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. UNIFIED LEADS TABLE (Captures all website inquiries, cost estimates & quotes)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_number VARCHAR(50) UNIQUE DEFAULT ('LEAD-' || LPAD(FLOOR(RANDOM() * 90000 + 10000)::TEXT, 5, '0')),
    source VARCHAR(50) NOT NULL DEFAULT 'website', -- 'booking_form', 'contact_desk', 'cost_calculator', 'whatsapp', 'call'
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    service_category VARCHAR(100),
    service_name VARCHAR(255),
    issue_description TEXT,
    service_address TEXT,
    pincode VARCHAR(10),
    estimated_price NUMERIC(10, 2),
    status VARCHAR(50) NOT NULL DEFAULT 'new' 
        CHECK (status IN ('new', 'contacted', 'assigned', 'converted', 'closed', 'junk')),
    notes TEXT,
    raw_payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- ==============================================================================
-- 2. CUSTOMER BOOKINGS & BOOKING ITEMS TABLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. IND-84920
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    address_id UUID REFERENCES public.customer_addresses(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    service_address TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    scheduled_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    package_title VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'Technician Assigned' 
        CHECK (status IN ('Technician Assigned', 'On The Way (45-Min)', 'In Progress', 'Payment Verified & Completed', 'Rescheduled', 'Cancelled')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending (Pay on Completion)' 
        CHECK (payment_status IN ('Pending (Pay on Completion)', 'Paid', 'Refunded', 'Failed')),
    payment_method VARCHAR(50) DEFAULT 'Cash / UPI on Doorstep',
    payment_ref VARCHAR(100),
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    parts_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_bookings_number ON public.bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON public.bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(scheduled_date);

CREATE TABLE IF NOT EXISTS public.booking_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name VARCHAR(200) NOT NULL,
    package_title VARCHAR(200) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_booking_items_booking_id ON public.booking_items(booking_id);

-- ==============================================================================
-- 3. CONTACT DESK MESSAGES & QUOTE REQUESTS TABLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new' 
        CHECK (status IN ('new', 'in_progress', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_contact_phone ON public.contact_messages(phone);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_messages(status);

CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    model_type VARCHAR(100),
    issue TEXT NOT NULL,
    estimated_price NUMERIC(10, 2),
    customer_name VARCHAR(150),
    customer_phone VARCHAR(20),
    customer_pincode VARCHAR(10),
    remarks TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'contacted', 'booked', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_quote_phone ON public.quote_requests(customer_phone);
CREATE INDEX IF NOT EXISTS idx_quote_category ON public.quote_requests(category);

-- ==============================================================================
-- 4. AUTOMATIC TRIGGERS & PROCEDURES
-- ==============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-generate booking number if empty
CREATE OR REPLACE FUNCTION public.handle_booking_number_generation()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
        NEW.booking_number := 'IND-' || LPAD(FLOOR(RANDOM() * 90000 + 10000)::TEXT, 5, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_booking_number ON public.bookings;
CREATE TRIGGER trg_generate_booking_number
BEFORE INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.handle_booking_number_generation();

-- Auto-sync new booking into unified leads table
CREATE OR REPLACE FUNCTION public.sync_booking_to_leads()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.leads (
        source,
        name,
        phone,
        email,
        service_category,
        service_name,
        issue_description,
        service_address,
        pincode,
        estimated_price,
        status,
        notes
    ) VALUES (
        'booking_form',
        NEW.customer_name,
        NEW.customer_phone,
        NEW.customer_email,
        NEW.service_name,
        NEW.service_name || ' - ' || COALESCE(NEW.package_title, 'Standard'),
        COALESCE(NEW.notes, 'Direct Doorstep Booking #' || NEW.booking_number),
        NEW.service_address,
        NEW.pincode,
        NEW.total_amount,
        'assigned',
        'Auto-synced from booking ' || NEW.booking_number
    );
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Prevent trigger errors from blocking booking insert
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_booking_to_leads ON public.bookings;
CREATE TRIGGER trg_sync_booking_to_leads
AFTER INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.sync_booking_to_leads();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all lead and booking tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Helper admin checker function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PUBLIC INSERT POLICIES (Allow public/anonymous form submissions)
DROP POLICY IF EXISTS "Allow public insert leads" ON public.leads;
CREATE POLICY "Allow public insert leads" 
ON public.leads FOR INSERT 
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow public insert bookings" ON public.bookings;
CREATE POLICY "Allow public insert bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow public insert booking items" ON public.booking_items;
CREATE POLICY "Allow public insert booking items" 
ON public.booking_items FOR INSERT 
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow public insert contact messages" ON public.contact_messages;
CREATE POLICY "Allow public insert contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Allow public insert quote requests" ON public.quote_requests;
CREATE POLICY "Allow public insert quote requests" 
ON public.quote_requests FOR INSERT 
WITH CHECK (TRUE);

-- 2. CUSTOMER READ POLICIES (Allow customers to read their own bookings)
DROP POLICY IF EXISTS "Customers can view own bookings" ON public.bookings;
CREATE POLICY "Customers can view own bookings" 
ON public.bookings FOR SELECT 
USING (
    customer_phone = current_setting('request.jwt.claims', true)::json->>'phone'
    OR (customer_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.customers c 
        WHERE c.id = customer_id AND c.profile_id = auth.uid()
    ))
    OR public.is_admin()
);

-- 3. ADMIN FULL ACCESS POLICIES
DROP POLICY IF EXISTS "Admins full access leads" ON public.leads;
CREATE POLICY "Admins full access leads" 
ON public.leads FOR ALL 
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access bookings" ON public.bookings;
CREATE POLICY "Admins full access bookings" 
ON public.bookings FOR ALL 
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access booking_items" ON public.booking_items;
CREATE POLICY "Admins full access booking_items" 
ON public.booking_items FOR ALL 
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access contact_messages" ON public.contact_messages;
CREATE POLICY "Admins full access contact_messages" 
ON public.contact_messages FOR ALL 
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access quote_requests" ON public.quote_requests;
CREATE POLICY "Admins full access quote_requests" 
ON public.quote_requests FOR ALL 
USING (public.is_admin());
