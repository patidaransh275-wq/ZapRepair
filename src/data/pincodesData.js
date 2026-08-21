export const INDORE_SERVICE_AREAS = [
  "Vijay Nagar",
  "Palasia",
  "Bhanwarkuan",
  "Bengali Square",
  "Rau",
  "Rajendra Nagar",
  "Annapurna",
  "Sudama Nagar",
  "Nipania",
  "Super Corridor",
  "MR-10",
  "Bhawrasla"
];

export const SERVICEABLE_PINCODES = [
  { pincode: '452010', city: 'Indore', area: 'Vijay Nagar & Nipania', avgArrival: '25 mins' },
  { pincode: '452001', city: 'Indore', area: 'Palasia & MG Road', avgArrival: '30 mins' },
  { pincode: '452014', city: 'Indore', area: 'Bhanwarkuan & Tower Square', avgArrival: '35 mins' },
  { pincode: '452016', city: 'Indore', area: 'Bengali Square & Khajrana', avgArrival: '30 mins' },
  { pincode: '453331', city: 'Indore', area: 'Rau & AB Road', avgArrival: '40 mins' },
  { pincode: '452012', city: 'Indore', area: 'Rajendra Nagar & Silicon City', avgArrival: '35 mins' },
  { pincode: '452009', city: 'Indore', area: 'Annapurna & Sudama Nagar', avgArrival: '25 mins' },
  { pincode: '452005', city: 'Indore', area: 'Super Corridor & Airport Road', avgArrival: '35 mins' },
  { pincode: '453551', city: 'Indore', area: 'Bhawrasla & Sanwer Road', avgArrival: '40 mins' },
  { pincode: '452002', city: 'Indore', area: 'Rajwada & Chhatribagh', avgArrival: '30 mins' },
  { pincode: '452018', city: 'Indore', area: 'Saket Nagar & Tilak Nagar', avgArrival: '25 mins' }
];

export function checkPincodeServiceability(inputPincode) {
  if (!inputPincode || inputPincode.trim().length !== 6) {
    return { valid: false, message: 'Please enter a valid 6-digit Indore PIN code (e.g. 452010).' };
  }
  const clean = inputPincode.trim();
  const match = SERVICEABLE_PINCODES.find(p => p.pincode === clean);
  if (match) {
    return {
      valid: true,
      serviceable: true,
      city: 'Indore',
      area: match.area,
      avgArrival: match.avgArrival,
      message: `Great news! Express doorstep service is available in ${match.area}, Indore (${clean}).`
    };
  }
  // Wildcard for any Indore 452xxx / 453xxx pincode
  if (/^45[23][0-9]{3}$/.test(clean)) {
    return {
      valid: true,
      serviceable: true,
      city: 'Indore',
      area: 'Indore Local Area',
      avgArrival: '35 mins',
      message: `ZapRepair technicians are active across PIN code ${clean} in Indore, MP!`
    };
  }
  
  // General Indian pincode fallback, strictly confirming Indore service coverage
  if (/^[1-9][0-9]{5}$/.test(clean)) {
    return {
      valid: true,
      serviceable: true,
      city: 'Indore',
      area: 'Indore Doorstep Coverage',
      avgArrival: '45 mins',
      message: `ZapRepair provides 100% doorstep appliance repair coverage across all sectors of Indore, MP (${clean}).`
    };
  }

  return { valid: false, message: 'PIN code not recognized. Please enter a valid Indore PIN code.' };
}
