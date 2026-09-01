import { Resend } from 'resend';

export const ADMIN_NOTIFICATION_EMAIL = 'plumberindore@gmail.com';
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';
const RESEND_TEST_ACCOUNT_OWNER = 'patidaransh275@gmail.com';

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

  // Normalize recipient list, targeting plumberindore@gmail.com by default
  const recipientList = Array.isArray(to) ? to : (to ? [to] : [ADMIN_NOTIFICATION_EMAIL]);

  try {
    // 1. Primary Attempt: Send to intended recipients using custom domain
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
      console.warn(`Primary domain (${from}) unverified. Retrying via fallback sender (${FALLBACK_SENDER_EMAIL}) to ${recipientList.join(', ')}...`);
      
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

    // 3. Safety Fallback: If Resend blocks plumberindore@gmail.com because domain verification is pending
    if (error && (
      error.message?.includes('only send testing emails to your own email address') || 
      error.message?.includes(RESEND_TEST_ACCOUNT_OWNER) ||
      error.message?.includes('testing emails')
    )) {
      console.warn(`Resend sandbox policy active. Forwarding alert to verified account owner (${RESEND_TEST_ACCOUNT_OWNER}) to prevent lead loss...`);
      
      const sandboxBanner = `
        <div style="background-color: #fef3c7; border: 1px solid #fde68a; color: #92400e; padding: 12px; margin-bottom: 16px; border-radius: 8px; font-family: sans-serif; font-size: 12px;">
          <strong>[PlumberIndore System Alert]</strong><br/>
          Intended Recipient: <strong>${recipientList.join(', ')}</strong><br/>
          <em>Notice: Delivered to verified Resend account owner. To send directly to plumberindore@gmail.com and customers without forwarding, verify plumberindore.in at resend.com/domains.</em>
        </div>
      `;

      const sandboxResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: [RESEND_TEST_ACCOUNT_OWNER],
        subject: `[PlumberIndore Alert] ${subject}`,
        html: sandboxBanner + html,
        reply_to: replyTo
      });

      if (!sandboxResult.error) {
        return {
          success: true,
          data: sandboxResult.data,
          deliveredTo: RESEND_TEST_ACCOUNT_OWNER,
          intendedRecipients: recipientList,
          sandboxNotice: 'Domain verification pending at resend.com/domains. Email safely delivered to verified account owner.'
        };
      }

      data = sandboxResult.data;
      error = sandboxResult.error;
    }

    const emailResult = {
      success: !error,
      data,
      deliveredTo: recipientList.join(', '),
      error: error ? (error.message || 'Failed to deliver email through Resend') : null
    };

    // Asynchronously log to Supabase email_logs table
    try {
      const { getAdminClient } = await import('../lib/supabase/admin');
      const supabaseAdmin = getAdminClient();
      if (supabaseAdmin) {
        await supabaseAdmin.from('email_logs').insert({
          recipient: recipientList.join(', '),
          subject: subject,
          email_type: subject.includes('Invoice') ? 'invoice_pdf' : subject.includes('Booking') ? 'booking_confirmed' : 'contact_inquiry',
          status: error ? 'failed' : 'sent',
          resend_id: data?.id || null,
          error_message: error ? error.message : null
        });
      }
    } catch (dbErr) {
      console.warn('Could not record to email_logs in Supabase:', dbErr.message);
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
      data,
      deliveredTo: recipientList.join(', ')
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
