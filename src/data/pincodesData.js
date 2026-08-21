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

export const INDORE_PINCODES = [
  "452001",
  "452002",
  "452003",
  "452005",
  "452006",
  "452007",
  "452008",
  "452009",
  "452010",
  "452011",
  "452012",
  "452013",
  "452014",
  "452015",
  "452016",
  "452018",
  "452020",
  "453331"
];

export function checkPincodeServiceability(pincode) {
  if (!pincode || typeof pincode !== 'string') {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit pincode.'
    };
  }

  const clean = pincode.trim();
  if (clean.length !== 6 || !/^\d{6}$/.test(clean)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  // Exclusive Indore check
  if (INDORE_PINCODES.includes(clean)) {
    return {
      valid: true,
      serviceable: true,
      area: 'Indore, Madhya Pradesh',
      message: `PlumberIndore technicians are active across PIN code ${clean} in Indore, MP!`
    };
  }

  // Check if it starts with 452 or 453 (Indore region)
  if (clean.startsWith('452') || clean.startsWith('453')) {
    return {
      valid: true,
      serviceable: true,
      area: 'Indore Suburban Area, MP',
      message: `PlumberIndore provides 100% doorstep plumbing & appliance repair coverage across all sectors of Indore, MP (${clean}).`
    };
  }

  return {
    valid: false,
    serviceable: false,
    message: `Sorry! PlumberIndore operates exclusively in Indore, MP. PIN code ${clean} is outside our current service zone.`
  };
}
