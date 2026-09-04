/**
 * Security & Defense Module for PlumberIndore
 * Provides Rate Limiting, Input Sanitization, XSS Protection, and Validation.
 */

// In-memory sliding window rate limiter
const rateLimitStore = new Map();

/**
 * Rate limiter middleware
 * @param {string} identifier - IP address or unique key
 * @param {number} limit - Max allowed requests
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetTime: number }}
 */
export function checkRateLimit(identifier, limit = 15, windowMs = 60000) {
  const now = Date.now();
  const key = `${identifier}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

// Clean up stale rate limit records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

/**
 * Sanitizes strings to prevent XSS and HTML injection
 * @param {string} input 
 * @returns {string}
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // remove direct tag brackets
    .trim();
}

/**
 * Validates Indian 10-digit mobile number
 * @param {string} phone 
 * @returns {string|null} - Clean 10 digit phone or null
 */
export function validateIndianPhone(phone) {
  if (!phone) return null;
  const cleaned = String(phone).replace(/\D/g, '').slice(-10);
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return cleaned;
  }
  return null;
}

/**
 * Validates standard email address
 * @param {string} email 
 * @returns {string|null} - Normalized email or null
 */
export function validateEmail(email) {
  if (!email) return null;
  const trimmed = String(email).toLowerCase().trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(trimmed) && trimmed.length <= 254) {
    return trimmed;
  }
  return null;
}

/**
 * Validates Indian postal code (Pincode)
 * @param {string} pincode 
 * @returns {string} - Validated pincode or default Indore pincode
 */
export function validatePincode(pincode) {
  if (!pincode) return '452010';
  const cleaned = String(pincode).replace(/\D/g, '');
  if (/^\d{6}$/.test(cleaned)) {
    return cleaned;
  }
  return '452010';
}

/**
 * Extracts client IP from Next.js request headers
 * @param {Request} request 
 * @returns {string}
 */
export function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Validates standard UUID format to prevent Postgres syntax exceptions (22P02)
 * @param {string} id
 * @returns {boolean}
 */
export function isValidUUID(id) {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id.trim());
}

/**
 * Escapes HTML entities to prevent HTML injection in emails
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

