import { getAdminClient } from '../src/lib/supabase/admin.js';
import { sendEmail } from '../src/utils/resend.js';

async function testFullWorkflow() {
  const supabase = getAdminClient();
  const testPhone = '9174934135';

  console.log('================================================================');
  console.log('TEST 1: Customer Booking WITH Customer Email (ansh@plumberindore.in)');
  console.log('================================================================');
  const bookingNumber1 = 'IND-TEST-' + Math.floor(10000 + Math.random() * 90000);

  const { data: b1, error: b1Err } = await supabase
    .from('bookings')
    .insert({
      booking_number: bookingNumber1,
      customer_name: 'Test Customer With Email',
      customer_phone: testPhone,
      customer_email: 'ansh@plumberindore.in',
      service_address: '402 Royal Residency, Vijay Nagar, Indore',
      pincode: '452010',
      scheduled_date: '2026-09-12',
      time_slot: '2:00 PM - 4:00 PM',
      service_name: 'Plumbing - Tap & Mixer Repair',
      package_title: 'Tap Leakage Fix & Washer Replacement',
      subtotal: 249,
      total_amount: 249,
      status: 'Technician Assigned',
      payment_status: 'Pending (Pay on Completion)'
    })
    .select()
    .single();

  if (b1Err) {
    console.error('❌ Test 1 Insert Failed:', b1Err.message);
  } else {
    console.log('✓ [public.bookings] Inserted booking:', b1.booking_number);

    // Test Admin Email
    const adminRes = await sendEmail({
      to: 'plumberindore@gmail.com',
      subject: `[🚨 NEW BOOKING] #${bookingNumber1} - Tap & Mixer Repair (Test Customer With Email | 9174934135)`,
      html: '<p>Admin notification test for booking ' + bookingNumber1 + '</p>'
    });
    console.log('Admin Email Dispatch Result:', JSON.stringify(adminRes, null, 2));

    // Test Customer Email
    const custRes = await sendEmail({
      to: 'ansh@plumberindore.in',
      subject: `[PlumberIndore Booking Confirmed] #${bookingNumber1} - Tap & Mixer Repair`,
      html: '<p>Customer confirmation test for booking ' + bookingNumber1 + '</p>'
    });
    console.log('Customer Email Dispatch Result:', JSON.stringify(custRes, null, 2));

    await supabase.from('bookings').delete().eq('id', b1.id);
  }

  console.log('\n================================================================');
  console.log('TEST 2: Customer Booking WITHOUT Customer Email (Phone-Only Booking)');
  console.log('================================================================');
  const bookingNumber2 = 'IND-TEST-' + Math.floor(10000 + Math.random() * 90000);

  const { data: b2, error: b2Err } = await supabase
    .from('bookings')
    .insert({
      booking_number: bookingNumber2,
      customer_name: 'Test Customer Phone Only',
      customer_phone: testPhone,
      customer_email: null,
      service_address: 'Flat 101, Apollo DB City, Nipania, Indore',
      pincode: '452010',
      scheduled_date: '2026-09-12',
      time_slot: '4:00 PM - 6:00 PM',
      service_name: 'Water Tank Cleaning',
      package_title: 'Deep Anti-Bacterial Foam Scrub',
      subtotal: 799,
      total_amount: 799,
      status: 'Technician Assigned',
      payment_status: 'Pending (Pay on Completion)'
    })
    .select()
    .single();

  if (b2Err) {
    console.error('❌ Test 2 Insert Failed:', b2Err.message);
  } else {
    console.log('✓ [public.bookings] Inserted phone-only booking:', b2.booking_number);

    // Test Admin Email for phone-only customer
    const adminRes2 = await sendEmail({
      to: 'plumberindore@gmail.com',
      subject: `[🚨 NEW BOOKING] #${bookingNumber2} - Water Tank Cleaning (Test Customer Phone Only | 9174934135)`,
      html: '<p>Admin notification for phone-only booking ' + bookingNumber2 + '</p>'
    });
    console.log('Phone-Only Booking Admin Dispatch Result:', JSON.stringify(adminRes2, null, 2));

    await supabase.from('bookings').delete().eq('id', b2.id);
  }

  // Cleanup any test leads created by trigger
  await supabase.from('leads').delete().eq('phone', testPhone);
  console.log('\n✓ All test records cleaned up successfully.');
}

testFullWorkflow().catch(console.error);
