import { Resend } from 'resend';

const BUSINESS_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';
const RESEND_TEST_RECIPIENT = 'patidaransh275@gmail.com';

/**
 * Helper to safely obtain Resend client on server-side only
 * Prioritizes the exact environment variable: process.env.plumberindore
 */
function getResendClient() {
  const apiKey = process.env.plumberindore || process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('CRITICAL: Resend API Key is missing. Expected environment variable "plumberindore".');
    return null;
  }

  return new Resend(apiKey);
}

/**
 * Universal email sender via Resend API
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient email(s)
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML email content
 * @param {string} [options.from] - Custom sender address (must be @plumberindore.in or fallback)
 * @param {string} [options.replyTo] - Reply-to email address
 * @param {string|string[]} [options.cc] - Optional CC recipients
 * @param {string|string[]} [options.bcc] - Optional BCC recipients
 */
export async function sendEmail({ 
  to, 
  subject, 
  html, 
  from = PRIMARY_SENDER_EMAIL,
  replyTo = 'plumberindore@gmail.com',
  cc,
  bcc
}) {
  const resend = getResendClient();

  if (!resend) {
    return {
      success: false,
      error: 'Resend API key ("plumberindore") is missing from server environment variables.'
    };
  }

  // Normalize recipient list
  const recipientList = Array.isArray(to) ? to : (to ? [to] : [BUSINESS_NOTIFICATION_EMAIL]);

  try {
    // 1. Primary Attempt: Send using verified domain plumberindore.in
    let { data, error } = await resend.emails.send({
      from: from || PRIMARY_SENDER_EMAIL,
      to: recipientList,
      subject: subject,
      html: html,
      reply_to: replyTo,
      ...(cc && { cc: Array.isArray(cc) ? cc : [cc] }),
      ...(bcc && { bcc: Array.isArray(bcc) ? bcc : [bcc] })
    });

    // 2. If domain is unverified, fallback to onboarding@resend.dev sender
    if (error && (error.message?.includes('not verified') || error.message?.includes('domain is not verified'))) {
      console.warn(`Primary sender domain (${from}) unverified. Retrying delivery via fallback sender (${FALLBACK_SENDER_EMAIL})...`);
      
      const retryResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: recipientList,
        subject: subject,
        html: html,
        reply_to: replyTo
      });

      data = retryResult.data;
      error = retryResult.error;
    }

    // 3. If Resend testing restriction triggers (can only send to account owner patidaransh275@gmail.com)
    if (error && (error.message?.includes('only send testing emails') || error.message?.includes(RESEND_TEST_RECIPIENT))) {
      console.warn(`Resend sandbox restriction detected. Retrying delivery to verified account email (${RESEND_TEST_RECIPIENT})...`);
      
      const sandboxResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: [RESEND_TEST_RECIPIENT],
        subject: `[FORWARDED for ${recipientList.join(', ')}] ${subject}`,
        html: html,
        reply_to: replyTo
      });

      data = sandboxResult.data;
      error = sandboxResult.error;
    }

    if (error) {
      console.error('Resend API delivery error:', error);
      return {
        success: false,
        error: error.message || 'Failed to deliver email through Resend'
      };
    }

    return {
      success: true,
      data
    };
  } catch (err) {
    console.error('Unexpected error while calling Resend:', err);
    return {
      success: false,
      error: err.message || 'Internal server error while sending email via Resend'
    };
  }
}

/**
 * Backward compatibility wrapper for existing routes
 */
export async function sendNotificationEmail({ subject, html, replyTo = 'plumberindore@gmail.com', to }) {
  return sendEmail({
    to: to || [BUSINESS_NOTIFICATION_EMAIL],
    subject,
    html,
    replyTo
  });
}
