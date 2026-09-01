-- ==============================================================================
-- PLUMBERINDORE SUPABASE STORAGE BUCKETS & POLICIES
-- Migration: 20260901_storage_buckets.sql
-- ==============================================================================

-- 1. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('technician-photos', 'technician-photos', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('service-images', 'service-images', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('invoices', 'invoices', FALSE, 10485760, ARRAY['application/pdf']),
    ('customer-documents', 'customer-documents', FALSE, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO UPDATE SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage RLS Policies

-- Public Read for technician photos & service images
CREATE POLICY "Public read technician photos" ON storage.objects
FOR SELECT USING (bucket_id = 'technician-photos');

CREATE POLICY "Public read service images" ON storage.objects
FOR SELECT USING (bucket_id = 'service-images');

-- Authenticated Users can upload technician photos
CREATE POLICY "Technicians and admins upload photos" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'technician-photos' AND 
    (auth.role() = 'authenticated' OR public.is_admin())
);

-- Admin Full Access to all buckets
CREATE POLICY "Admin full access storage" ON storage.objects
FOR ALL USING (public.is_admin());

-- Private Invoices Read Policy (Customers can access own invoices, Admin can access all)
CREATE POLICY "Customer read own invoice PDFs" ON storage.objects
FOR SELECT USING (
    bucket_id = 'invoices' AND (
        public.is_admin() OR 
        (auth.uid() IS NOT NULL AND (storage.foldername(name))[1] = auth.uid()::text)
    )
);
