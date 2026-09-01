import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnawwvxvfdnkmwtytwre.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_BT_qk2dmGPrd82h-FWZ-VA_ONM7HKJO';

const supabase = createClient(SUPABASE_URL, PUBLISHABLE_KEY);

const tables = [
  'service_categories',
  'services',
  'technicians',
  'reviews',
  'contact_messages',
  'quote_requests',
  'profiles',
  'customers',
  'customer_addresses',
  'bookings',
  'booking_items',
  'technician_assignments',
  'booking_status_history',
  'payments',
  'invoices',
  'invoice_items',
  'notifications',
  'email_logs',
  'audit_logs'
];

async function verifyTables() {
  console.log('=== Checking Remote Supabase Tables ===\n');
  let availableCount = 0;

  for (const table of tables) {
    try {
      const { data, count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ✗ public.${table.padEnd(25)} [Status: ${error.code || 'ERR'} - ${error.message}]`);
      } else {
        console.log(`  ✓ public.${table.padEnd(25)} [Status: ONLINE, Rows: ${count ?? 0}]`);
        availableCount++;
      }
    } catch (err) {
      console.log(`  ✗ public.${table.padEnd(25)} [Exception: ${err.message}]`);
    }
  }

  console.log(`\nVerified: ${availableCount} / ${tables.length} tables online in Supabase project.`);
}

verifyTables();
