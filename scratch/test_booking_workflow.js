import { getAdminClient } from '../src/lib/supabase/admin.js';
import { sendEmail } from '../src/utils/resend.js';

async function testBookingWorkflow() {
  const supabase = getAdminClient();
  const testPhone = '9174934135';
  const testEmail = 'ansh@plumberindore.in';
  const testBookingNumber = 'IND-VERIFY-' + Math.floor(10000 + Math.random() * 90000);

  console.log('=== Step 1: Submitting test booking directly to Supabase public.bookings ===');
  const { data: booking, error: bErr } = await supabase
    .from('bookings')
    .insert({
      booking_number: testBookingNumber,
      customer_name: 'Ansh Patidar Verification Test',
      customer_phone: testPhone,
      customer_email: testEmail,
      service_address: 'Flat 402, Royal Residency, Vijay Nagar, Indore',
      pincode: '452010',
      scheduled_date: '2026-09-10',
      time_slot: '2:00 PM - 4:00 PM',
      service_name: 'AC Repair & Service',
      package_title: 'Power Foam Jet Service',
      subtotal: 499,
      total_amount: 499,
      status: 'Technician Assigned',
      payment_status: 'Pending (Pay on Completion)'
    })
    .select()
    .single();

  if (bErr) {
    console.error('❌ Direct Booking Insert Failed:', bErr.message);
    process.exit(1);
  }
  console.log('✓ [public.bookings] Inserted successfully! ID:', booking.id, 'Booking Number:', booking.booking_number);

  console.log('\n=== Step 2: Inserting itemized line items in public.booking_items ===');
  const { data: item, error: iErr } = await supabase
    .from('booking_items')
    .insert({
      booking_id: booking.id,
      service_name: 'AC Repair & Service',
      package_title: 'Power Foam Jet Service',
      unit_price: 499,
      quantity: 1,
      total_price: 499
    })
    .select()
    .single();

  if (iErr) {
    console.error('❌ Booking Item Insert Failed:', iErr.message);
  } else {
    console.log('✓ [public.booking_items] Inserted successfully! Item ID:', item.id);
  }

  console.log('\n=== Step 3: Verifying automated trigger sync to public.leads ===');
  const { data: syncedLead, error: lErr } = await supabase
    .from('leads')
    .select('*')
    .eq('phone', testPhone)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (lErr) {
    console.warn('Sync lead lookup notice:', lErr.message);
  } else {
    console.log('✓ [public.leads] Auto-synced Lead verified! Lead No:', syncedLead.lead_number, 'Source:', syncedLead.source);
  }

  console.log('\n=== Step 4: Testing Resend Email Dispatch Handler ===');
  const emailRes = await sendEmail({
    to: [testEmail, 'plumberindore@gmail.com'],
    subject: `[PlumberIndore Booking Confirmed] #${testBookingNumber} - AC Repair & Service`,
    html: `<p>Test confirmation email for booking ${testBookingNumber}</p>`
  });
  console.log('Resend Email Result:', JSON.stringify(emailRes, null, 2));

  console.log('\n=== Step 5: Cleaning up test records ===');
  await supabase.from('bookings').delete().eq('id', booking.id);
  if (syncedLead) await supabase.from('leads').delete().eq('id', syncedLead.id);
  console.log('✓ Cleanup completed successfully.');
}

testBookingWorkflow().catch(console.error);
