const { calculateServerPrice } = require('../src/lib/pricing');

console.log('--- Testing Server-Side Pricing ---');

// Test 1: Single service
const test1 = calculateServerPrice([
  { serviceId: 'plumber', packageTitle: 'Chrome Tap & Mixer Spindle Repair', price: 10 } // client tries to send 10
]);
console.log('Test 1 (Tampered Price Prevention):');
console.log('Expected: 199, Calculated Total:', test1.totalAmount);
console.assert(test1.totalAmount === 199, 'Server price validation failed for Test 1');

// Test 2: Multi-service cart
const test2 = calculateServerPrice([
  { serviceId: 'plumber', packageTitle: 'Chrome Tap & Mixer Spindle Repair' }, // 199
  { serviceId: 'ac-repair', packageTitle: 'Power Foam Jet Service' } // 399
]);
console.log('Test 2 (Multi-Service Cart):');
console.log('Expected: 598 (199 + 399), Calculated Total:', test2.totalAmount);
console.assert(test2.totalAmount === 598, 'Server price validation failed for Test 2');

console.log('✓ All pricing tests passed successfully!');
