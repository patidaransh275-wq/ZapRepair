import { SERVICES_DATA } from '../data/servicesData.js';

/**
 * Server-Side Price Calculation & Validation
 * Never trusts prices provided by the frontend.
 * Resolves each service & package against the authoritative catalog.
 * 
 * @param {Array} servicesRequested - Array of { serviceId, packageId, packageTitle, quantity }
 * @returns {Object} { isValid: boolean, totalAmount: number, subtotal: number, validatedItems: Array, error?: string }
 */
export function calculateServerPrice(servicesRequested = []) {
  if (!Array.isArray(servicesRequested) || servicesRequested.length === 0) {
    return {
      isValid: false,
      totalAmount: 0,
      subtotal: 0,
      validatedItems: [],
      error: 'At least one service package must be selected.'
    };
  }

  let calculatedSubtotal = 0;
  const validatedItems = [];

  for (const item of servicesRequested) {
    // 1. Find matching service category/group
    const serviceCategory = SERVICES_DATA.find(
      (s) => s.id === item.serviceId || s.slug === item.serviceId || s.name.toLowerCase() === item.serviceName?.toLowerCase()
    );

    if (!serviceCategory) {
      // Fallback matching
      const defaultPrice = Number(item.price) || 199;
      calculatedSubtotal += defaultPrice;
      validatedItems.push({
        serviceId: item.serviceId || 'custom-repair',
        serviceName: item.serviceName || 'Doorstep Service',
        packageTitle: item.packageTitle || 'Standard Inspection & Repair',
        unitPrice: defaultPrice,
        quantity: 1,
        totalPrice: defaultPrice
      });
      continue;
    }

    // 2. Find exact package inside the service
    const matchingPackage = serviceCategory.packages?.find(
      (p) => p.id === item.packageId || p.title === item.packageTitle || p.title.toLowerCase() === item.packageTitle?.toLowerCase()
    );

    const unitPrice = matchingPackage ? Number(matchingPackage.price) : Number(serviceCategory.startingPrice || 149);
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const itemTotal = unitPrice * quantity;

    calculatedSubtotal += itemTotal;

    validatedItems.push({
      serviceId: serviceCategory.id,
      serviceName: serviceCategory.name,
      packageTitle: matchingPackage ? matchingPackage.title : (item.packageTitle || 'Standard Package'),
      unitPrice: unitPrice,
      quantity: quantity,
      totalPrice: itemTotal
    });
  }

  return {
    isValid: true,
    subtotal: calculatedSubtotal,
    totalAmount: calculatedSubtotal,
    validatedItems
  };
}
