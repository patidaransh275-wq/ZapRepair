import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnawwvxvfdnkmwtytwre.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_BT_qk2dmGPrd82h-FWZ-VA_ONM7HKJO';

console.log('Testing connection to Supabase Project:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, PUBLISHABLE_KEY);

async function testConnection() {
  try {
    // Ping the Supabase Auth settings endpoint or health check (read-only)
    const start = Date.now();
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: {
        'apikey': PUBLISHABLE_KEY,
        'Authorization': `Bearer ${PUBLISHABLE_KEY}`
      }
    });

    const elapsed = Date.now() - start;
    console.log(`HTTP Status: ${res.status} ${res.statusText} (Response time: ${elapsed}ms)`);

    if (res.ok) {
      const data = await res.json();
      console.log('✓ Successfully connected to Supabase project!');
      console.log('Project Status: Online & Accessible');
      console.log('Auth Provider Enabled:', !!data);
    } else {
      const text = await res.text();
      console.log('Response body:', text);
    }
  } catch (err) {
    console.error('Connection test error:', err.message);
  }
}

testConnection();
