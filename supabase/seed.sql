-- ==============================================================================
-- PLUMBERINDORE SEED DATA (CATEGORIES, SERVICES, TECHNICIANS)
-- ==============================================================================

-- 1. Insert Service Categories
INSERT INTO public.service_categories (id, slug, name, icon, description, starting_price, sort_order, is_active)
VALUES 
    ('c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing Services', 'Wrench', 'Expert tap, pipe, toilet, and motor water pump repair across Indore.', 149.00, 1, TRUE),
    ('c0000001-0000-0000-0000-000000000002', 'electrician', 'Electrician Services', 'Zap', 'Certified electrical wiring, switchboard, MCB, and ceiling fan fixes.', 149.00, 2, TRUE),
    ('c0000001-0000-0000-0000-000000000003', 'ac-repair', 'AC Repair & Service', 'Wind', 'Deep jet foam cleaning, gas refill, and cooling diagnostics.', 399.00, 3, TRUE),
    ('c0000001-0000-0000-0000-000000000004', 'refrigerator', 'Refrigerator Repair', 'Refrigerator', 'Single & double door fridge cooling and compressor repairs.', 299.00, 4, TRUE),
    ('c0000001-0000-0000-0000-000000000005', 'washing-machine', 'Washing Machine Repair', 'Disc', 'Front-load, top-load, and semi-automatic drum and motor overhaul.', 299.00, 5, TRUE),
    ('c0000001-0000-0000-0000-000000000006', 'ro-water-purifier', 'RO Water Purifier Repair', 'Droplets', 'Complete RO membrane replacement, TDS adjustment & filter servicing.', 249.00, 6, TRUE),
    ('c0000001-0000-0000-0000-000000000007', 'geyser-water-heater', 'Geyser & Water Heater', 'Flame', 'Thermostat, coil replacement, and heating tank leak repairs.', 249.00, 7, TRUE),
    ('c0000001-0000-0000-0000-000000000008', 'microwave-oven', 'Microwave & Oven Repair', 'Microwave', 'Magnetron, keypad, and heating PCB repair with genuine spares.', 299.00, 8, TRUE),
    ('c0000001-0000-0000-0000-000000000009', 'pest-control', 'Pest Control Services', 'Bug', 'Odorless herbal pest control for cockroaches, termites, and bed bugs.', 499.00, 9, TRUE),
    ('c0000001-0000-0000-0000-000000000010', 'carpenter-paint', 'Carpenter & Painting', 'Hammer', 'Furniture repair, door lock installation, and waterproof wall painting.', 199.00, 10, TRUE)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    starting_price = EXCLUDED.starting_price;

-- 2. Insert Services & Packages
INSERT INTO public.services (id, category_id, slug, name, package_title, price, duration, warranty_days, description)
VALUES 
    -- Plumbing Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing', 'Standard Inspection & Minor Leak Fix', 149.00, '30-45 Mins', 30, 'Inspection and tightening of leaking taps, valves, and exposed pipe joints.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing', 'Chrome Tap & Mixer Spindle Repair', 199.00, '45 Mins', 30, 'Repair or replacement of tap internal ceramic spindle/cartridge.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing', 'Toilet Flush Tank & Cistern Repair', 249.00, '45-60 Mins', 30, 'Flush valve, syphon, ball valve, or push button mechanism fix.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing', 'Drain & Sink Pipe Blockage Removal', 299.00, '45-60 Mins', 30, 'Chemical jet or mechanical snake unblocking for kitchen and washbasin drains.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000001', 'plumber', 'Plumbing', 'Water Motor Pump & Tank Pipe Repair', 399.00, '60-90 Mins', 30, 'Priming, bypass valve replacement, or overhead tank connector pipe fix.'),

    -- Electrician Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000002', 'electrician', 'Electrician', 'Standard Electrical Inspection', 149.00, '30-45 Mins', 30, 'Diagnostic testing of circuits, voltage checks, and short circuit tracing.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000002', 'electrician', 'Electrician', 'Switchboard & Socket Replacement', 199.00, '45 Mins', 30, 'Replacement of up to 3 modular switches, power sockets, or fan regulators.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000002', 'electrician', 'Electrician', 'Ceiling Fan Installation & Repair', 249.00, '45 Mins', 30, 'Mounting, blade balancing, capacitor replacement, and speed testing.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000002', 'electrician', 'Electrician', 'MCB Box & Distribution Panel Overhaul', 399.00, '60-90 Mins', 30, 'MCB trip troubleshooting, busbar cleaning, and main breaker replacement.'),

    -- AC Repair Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000003', 'ac-repair', 'AC Repair & Service', 'Standard Diagnostic & Inspection', 199.00, '30-45 Mins', 30, 'Full error code scanning, amp draw, cooling coil inspection & gas pressure check.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000003', 'ac-repair', 'AC Repair & Service', 'Power Foam Jet Service', 399.00, '60 Mins', 30, 'High-pressure foam jet wash for indoor & outdoor coils for maximum cooling.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000003', 'ac-repair', 'AC Repair & Service', 'Complete Gas Charging (R32/R410/R22)', 1999.00, '90 Mins', 60, 'Nitrogen leak test, vacuuming, and 100% full refrigerant recharge with gauge proof.'),

    -- Refrigerator Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000004', 'refrigerator', 'Refrigerator', 'Cooling Diagnostics & Inspection', 199.00, '30-45 Mins', 30, 'Compressor relay, defrost timer, thermostat, and temperature sensor testing.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000004', 'refrigerator', 'Refrigerator', 'Thermostat & Relay Replacement', 349.00, '45 Mins', 30, 'Replacement of faulty starter relay, OLP, or temperature thermostat.'),

    -- Washing Machine Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000005', 'washing-machine', 'Washing Machine', 'General Inspection & Diagnostics', 199.00, '30-45 Mins', 30, 'Drain pump, drum vibration, belt tension, and inlet valve diagnostics.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000005', 'washing-machine', 'Washing Machine', 'Drain Pump & Valve Repair', 349.00, '45-60 Mins', 30, 'Drain motor replacement or unclogging lint filter & drain pipe.'),

    -- RO Water Purifier Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000006', 'ro-water-purifier', 'RO Purifier', 'Filter Change & TDS Calibration', 249.00, '45 Mins', 30, 'Sediment & carbon filter check, TDS testing, and membrane flushing.'),

    -- Pest Control Services
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000009', 'pest-control', 'Pest Control', '1 BHK Odorless Herbal Gel', 499.00, '45 Mins', 60, 'Eco-friendly herbal gel treatment for cockroaches and ants.'),
    (gen_random_uuid(), 'c0000001-0000-0000-0000-000000000009', 'pest-control', 'Pest Control', '2 BHK Odorless Herbal Gel', 749.00, '60 Mins', 60, 'Complete home pest protection for 2 BHK kitchen and washrooms.')
ON CONFLICT (category_id, slug, package_title) DO NOTHING;

-- 3. Insert Default Test Technicians
INSERT INTO public.technicians (title, phone, rating, repairs_count, photo_url, vehicle_number, eta, is_active)
VALUES 
    ('Master Plumber & Sanitary Expert', '+91 91749 34135', 4.95, 540, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80', 'Service Van (MP 09 CZ 1122)', '30 Mins', TRUE),
    ('Senior Electrician & Panel Specialist', '+91 91749 34135', 4.92, 480, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80', 'Service Bike (MP 09 BF 4520)', '25 Mins', TRUE),
    ('HVAC & AC Senior Technician', '+91 91749 34135', 4.98, 620, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80', 'Service Vehicle (MP 09 EA 8831)', '35 Mins', TRUE)
ON CONFLICT DO NOTHING;
