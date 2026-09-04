-- ==============================================================================
-- PLUMBERINDORE DATABASE RESET & CLEAN-UP SCRIPT
-- Target: hnawwvxvfdnkmwtytwre (https://hnawwvxvfdnkmwtytwre.supabase.co)
-- Description:
--   Truncates/deletes all test booking records, order line items, technician
--   assignments, status history, invoices, payments, leads, contact messages,
--   quote requests, and email logs.
--
-- GUARANTEE:
--   - All table schemas, column types, default values, and indexes remain 100% INTACT.
--   - All Foreign Key constraints, Unique constraints, and CHECK constraints remain INTACT.
--   - All Row Level Security (RLS) policies and user permission grants remain INTACT.
--   - System triggers (e.g. handle_updated_at) remain INTACT.
--   - User accounts (auth.users, public.profiles) and Service catalog remain UNTOUCHED.
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- 1. TRUNCATE BOOKINGS & ALL DEPENDENT TABLES (FASTEST & CLEANEST)
-- ------------------------------------------------------------------------------
-- Truncating 'bookings' with CASCADE automatically clears:
--   - public.booking_items (foreign key -> bookings.id ON DELETE CASCADE)
--   - public.technician_assignments (foreign key -> bookings.id ON DELETE CASCADE)
--   - public.booking_status_history (foreign key -> bookings.id ON DELETE CASCADE)
--   - public.payments (foreign key -> bookings.id ON DELETE CASCADE)
--   - public.invoices (foreign key -> bookings.id ON DELETE CASCADE)
--   - public.invoice_items (foreign key -> invoices.id ON DELETE CASCADE)

TRUNCATE TABLE 
    public.bookings,
    public.booking_items,
    public.technician_assignments,
    public.booking_status_history,
    public.payments,
    public.invoices,
    public.invoice_items
RESTART IDENTITY CASCADE;

-- ------------------------------------------------------------------------------
-- 2. TRUNCATE LEADS, INQUIRIES, QUOTES & SYSTEM LOGS
-- ------------------------------------------------------------------------------
TRUNCATE TABLE 
    public.leads,
    public.contact_messages,
    public.quote_requests,
    public.email_logs,
    public.notifications
RESTART IDENTITY CASCADE;

-- ------------------------------------------------------------------------------
-- 3. RESET CUSTOMER COUNTERS
-- ------------------------------------------------------------------------------
-- Reset lifetime bookings counter on registered customer accounts to 0
UPDATE public.customers 
SET total_bookings = 0;

-- ------------------------------------------------------------------------------
-- 4. CLEAN TEST REVIEWS (Optional - clears any test reviews linked to bookings)
-- ------------------------------------------------------------------------------
-- If test reviews were submitted during testing, un-comment the line below:
-- TRUNCATE TABLE public.reviews RESTART IDENTITY CASCADE;

COMMIT;

-- ==============================================================================
-- VERIFICATION QUERY (Run after execution to confirm all counters are 0)
-- ==============================================================================
-- SELECT 
--     (SELECT COUNT(*) FROM public.bookings) AS total_bookings,
--     (SELECT COUNT(*) FROM public.booking_items) AS total_booking_items,
--     (SELECT COUNT(*) FROM public.invoices) AS total_invoices,
--     (SELECT COUNT(*) FROM public.payments) AS total_payments,
--     (SELECT COUNT(*) FROM public.leads) AS total_leads,
--     (SELECT COUNT(*) FROM public.contact_messages) AS total_contacts,
--     (SELECT COUNT(*) FROM public.quote_requests) AS total_quotes,
--     (SELECT COUNT(*) FROM public.notifications) AS total_notifications;
