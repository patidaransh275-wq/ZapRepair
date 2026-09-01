import { createClient } from '@supabase/supabase-js';

/**
 * Creates a server-only Supabase admin client using the service role key.
 * Bypasses RLS for trusted background tasks, seed scripts, invoice generation, and logging.
 * NEVER IMPORT THIS IN CLIENT COMPONENTS.
 */
export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
