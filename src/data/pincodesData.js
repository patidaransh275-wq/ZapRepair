export const SERVICEABLE_PINCODES = [
  { pincode: '110001', city: 'New Delhi', area: 'Connaught Place', avgArrival: '30 mins' },
  { pincode: '110016', city: 'New Delhi', area: 'Hauz Khas', avgArrival: '25 mins' },
  { pincode: '201301', city: 'Noida', area: 'Sector 15 / 18', avgArrival: '35 mins' },
  { pincode: '201309', city: 'Noida', area: 'Sector 62', avgArrival: '30 mins' },
  { pincode: '122001', city: 'Gurugram', area: 'DLF Cyber City', avgArrival: '40 mins' },
  { pincode: '400001', city: 'Mumbai', area: 'Fort / Marine Drive', avgArrival: '35 mins' },
  { pincode: '400053', city: 'Mumbai', area: 'Andheri West', avgArrival: '25 mins' },
  { pincode: '400050', city: 'Mumbai', area: 'Bandra West', avgArrival: '30 mins' },
  { pincode: '560001', city: 'Bangalore', area: 'MG Road', avgArrival: '30 mins' },
  { pincode: '560038', city: 'Bangalore', area: 'Indiranagar', avgArrival: '25 mins' },
  { pincode: '560100', city: 'Bangalore', area: 'Electronic City', avgArrival: '35 mins' },
  { pincode: '411001', city: 'Pune', area: 'FC Road', avgArrival: '30 mins' },
  { pincode: '411038', city: 'Pune', area: 'Kothrud', avgArrival: '25 mins' },
  { pincode: '302001', city: 'Jaipur', area: 'MI Road', avgArrival: '35 mins' },
  { pincode: '500001', city: 'Hyderabad', area: 'Abids', avgArrival: '30 mins' },
  { pincode: '600001', city: 'Chennai', area: 'Parrys', avgArrival: '35 mins' },
  { pincode: '700001', city: 'Kolkata', area: 'BBD Bagh', avgArrival: '35 mins' },
  { pincode: '380001', city: 'Ahmedabad', area: 'Lal Darwaja', avgArrival: '30 mins' }
];

export function checkPincodeServiceability(inputPincode) {
  if (!inputPincode || inputPincode.trim().length !== 6) {
    return { valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' };
  }
  const clean = inputPincode.trim();
  const match = SERVICEABLE_PINCODES.find(p => p.pincode === clean);
  if (match) {
    return {
      valid: true,
      serviceable: true,
      city: match.city,
      area: match.area,
      avgArrival: match.avgArrival,
      message: `Great news! Express doorstep service is available in ${match.area}, ${match.city} (${clean}).`
    };
  }
  // Wildcard logic for general 6-digit Indian pincodes so demo users from any city get immediate booking availability!
  if (/^[1-9][0-9]{5}$/.test(clean)) {
    return {
      valid: true,
      serviceable: true,
      city: 'Your City',
      area: 'Local Area',
      avgArrival: '45 mins',
      message: `ZapRepair technicians are active in PIN code ${clean}. Doorstep service available!`
    };
  }
  return { valid: false, message: 'PIN code not recognized. Please check and try again.' };
}
