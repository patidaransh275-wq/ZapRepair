import { Resend } from 'resend';

export const ADMIN_NOTIFICATION_EMAIL = 'plumberindore@gmail.com';
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';

/**
 * Helper to safely obtain Resend client on server-side only
 * Prioritizes the exact environment variable: process.env.plumberindore
 */
function getResendClient() {
  const apiKey = process.env.plumberindore || process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('CRITICAL: Resend API Key is missing. Expected server environment variable "plumberindore".');
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
 * @param {string} [options.from] - Custom sender address
 * @param {string} [options.replyTo] - Reply-to email address
 * @param {string|string[]} [options.cc] - Optional CC recipients
 * @param {string|string[]} [options.bcc] - Optional BCC recipients
 */
export async function sendEmail({ 
  to, 
  subject, 
  html, 
  from = PRIMARY_SENDER_EMAIL,
  replyTo = ADMIN_NOTIFICATION_EMAIL,
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

  // Normalize recipient list, defaulting strictly to plumberindore@gmail.com
  const recipientList = Array.isArray(to) ? to : (to ? [to] : [ADMIN_NOTIFICATION_EMAIL]);

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

    // 2. If custom domain is not yet verified in DNS, retry via fallback onboarding sender
    if (error && (
      error.message?.includes('not verified') || 
      error.message?.includes('domain is not verified') || 
      error.message?.includes('Domain not verified') ||
      error.message?.includes('from address')
    )) {
      console.warn(`Primary domain (${from}) not yet active. Retrying via fallback sender (${FALLBACK_SENDER_EMAIL}) to ${recipientList.join(', ')}...`);
      
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
 * Convenience helper for single admin notifications to plumberindore@gmail.com
 */
export async function sendNotificationEmail({ subject, html, replyTo = ADMIN_NOTIFICATION_EMAIL, to }) {
  return sendEmail({
    to: to || [ADMIN_NOTIFICATION_EMAIL],
    subject,
    html,
    replyTo
  });
}
