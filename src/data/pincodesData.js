import { IS_BOOKING_ENABLED, SERVICE_UNAVAILABLE_MESSAGE, isPincodeServiceable, SERVICEABLE_PINCODES } from '../config/serviceArea.js';

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

export const INDORE_PINCODES = SERVICEABLE_PINCODES;

export function checkPincodeServiceability(pincode) {
  if (!pincode || typeof pincode !== 'string') {
    return {
      valid: false,
      serviceable: false,
      suspended: false,
      message: 'Please enter a valid 6-digit pincode.'
    };
  }

  const clean = pincode.trim();
  if (clean.length !== 6 || !/^\d{6}$/.test(clean)) {
    return {
      valid: false,
      serviceable: false,
      suspended: false,
      message: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  // 1. Global Service Suspension / Unavailable Check
  if (!IS_BOOKING_ENABLED) {
    return {
      valid: false,
      serviceable: false,
      suspended: true,
      area: 'Indore, Madhya Pradesh',
      message: SERVICE_UNAVAILABLE_MESSAGE
    };
  }

  // 2. Specific Serviceable Pincodes Check
  if (isPincodeServiceable(clean)) {
    return {
      valid: true,
      serviceable: true,
      suspended: false,
      area: 'Indore, Madhya Pradesh',
      message: `PlumberIndore technicians are active across PIN code ${clean} in Indore, MP!`
    };
  }

  // 3. Indore regional pincode check
  if (clean.startsWith('452') || clean.startsWith('453')) {
    return {
      valid: false,
      serviceable: false,
      suspended: true,
      area: 'Indore Suburban Area, MP',
      message: SERVICE_UNAVAILABLE_MESSAGE
    };
  }

  // 4. Outside Indore zone
  return {
    valid: false,
    serviceable: false,
    suspended: false,
    message: `Sorry! PlumberIndore operates exclusively in Indore, MP. PIN code ${clean} is outside our current service zone.`
  };
}

