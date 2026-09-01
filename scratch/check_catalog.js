import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hnawwvxvfdnkmwtytwre.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_BT_qk2dmGPrd82h-FWZ-VA_ONM7HKJO';

const supabase = createClient(SUPABASE_URL, PUBLISHABLE_KEY);

async function checkCatalog() {
  const { data: catData, count: catCount } = await supabase
    .from('service_categories')
    .select('*', { count: 'exact' });

  console.log(`Categories count in DB: ${catCount || 0}`);
  if (catData && catData.length > 0) {
    console.log('Sample categories:', catData.map(c => c.slug).join(', '));
  }

  const { data: srvData, count: srvCount } = await supabase
    .from('services')
    .select('*', { count: 'exact' });

  console.log(`Services count in DB: ${srvCount || 0}`);
}

checkCatalog();
