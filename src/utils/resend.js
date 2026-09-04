import { Resend } from 'resend';

export const ADMIN_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';
export const REGISTERED_ACCOUNT_EMAIL = process.env.RESEND_ACCOUNT_OWNER || 'patidaransh275@gmail.com';
export const ADMIN_NOTIFICATION_RECIPIENTS = [ADMIN_NOTIFICATION_EMAIL, REGISTERED_ACCOUNT_EMAIL];

// Verified production sender domain on Resend (plumberindore.in).
// Can be customized via RESEND_SENDER_EMAIL='Bookings <notifications@plumberindore.com>' if desired.
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Bookings <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'Bookings <onboarding@resend.dev>';

/**
 * Strict email format validator
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Helper to safely obtain Resend client on server-side only.
 * Discovers and validates RESEND_API_KEY, plumberindore, or RESEND_KEY.
 */
function getResendClientInfo() {
  const apiKey = (
    process.env.RESEND_API_KEY || 
    process.env.plumberindore || 
    process.env.RESEND_KEY || 
    ''
  ).trim();

  if (!apiKey || apiKey === 'your_resend_api_key' || apiKey === 'your_api_key' || apiKey === 're_your_api_key_here') {
    return { client: null, keyMasked: 'NOT_CONFIGURED', isConfigured: false };
  }

  const masked = apiKey.length > 8 
    ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` 
    : '***';

  return {
    client: new Resend(apiKey),
    keyMasked: masked,
    isConfigured: true
  };
}

/**
 * Helper to record email events into Supabase public.email_logs
 */
async function logEmailToSupabase({ recipient, subject, emailType, status, resendId, errorMessage }) {
  try {
    const { getAdminClient } = await import('../lib/supabase/admin.js');
    const supabaseAdmin = getAdminClient();
    if (supabaseAdmin) {
      await supabaseAdmin.from('email_logs').insert({
        recipient: typeof recipient === 'string' ? recipient : JSON.stringify(recipient),
        subject: subject || 'Untitled Notification',
        email_type: emailType || 'system_notification',
        status: status, // 'sent' | 'failed' | 'simulated'
        resend_id: resendId || null,
        error_message: errorMessage || null
      });
    }
  } catch (err) {
    console.warn('[email_logs] Notice while persisting to Supabase:', err.message);
  }
}

/**
 * Universal email sender via Resend API
 * 
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
  const { client: resend, keyMasked, isConfigured } = getResendClientInfo();

  // 1. Recipient parsing and normalization
  const rawList = Array.isArray(to) ? to : (to ? [to] : [ADMIN_NOTIFICATION_EMAIL]);
  const recipientList = Array.from(
    new Set(
      rawList
        .filter(e => isValidEmail(e))
        .map(e => e.trim().toLowerCase())
    )
  );
  
  // Guarantee fallback to business admin email if no valid recipients were provided
  if (recipientList.length === 0) {
    recipientList.push(ADMIN_NOTIFICATION_EMAIL.toLowerCase());
  }

  const emailType = subject.includes('Invoice') 
    ? 'invoice_pdf' 
    : subject.includes('Booking') 
    ? 'booking_confirmed' 
    : subject.includes('Quote') 
    ? 'quote_request' 
    : 'contact_inquiry';

  console.log(`\n======================================================`);
  console.log(`[Resend Email Dispatch Triggered]`);
  console.log(`• Subject: "${subject}"`);
  console.log(`• Target Recipient(s): [${recipientList.join(', ')}]`);
  console.log(`• Sender Address: "${from || PRIMARY_SENDER_EMAIL}"`);
  console.log(`• API Key Status: ${isConfigured ? `Loaded (${keyMasked})` : 'MISSING / UNCONFIGURED'}`);
  console.log(`======================================================`);

  // 2. If API key is missing or not configured
  if (!resend) {
    const warningMsg = 'CRITICAL: Resend API key is not configured in environment variables (RESEND_API_KEY or plumberindore).';
    console.error(`[Resend Configuration Error] ${warningMsg}`);
    
    await logEmailToSupabase({
      recipient: recipientList.join(', '),
      subject,
      emailType,
      status: 'failed',
      resendId: null,
      errorMessage: warningMsg
    });

    return {
      success: false,
      simulated: true,
      error: warningMsg,
      intendedRecipients: recipientList
    };
  }

  const results = [];

  // 3. Dispatch to each recipient individually
  for (const recipient of recipientList) {
    try {
      console.log(`[Resend Request] Sending email -> ${recipient}...`);

      // Attempt 1: Send from configured sender (defaults to verified domain Bookings <notifications@plumberindore.in>)
      let { data, error } = await resend.emails.send({
        from: from || PRIMARY_SENDER_EMAIL,
        to: [recipient],
        subject: subject,
        html: html,
        reply_to: replyTo,
        ...(cc && { cc: Array.isArray(cc) ? cc : [cc] }),
        ...(bcc && { bcc: Array.isArray(bcc) ? bcc : [bcc] })
      });

      if (error) {
        console.error(`[Resend Dispatch Error for ${recipient}]:`, JSON.stringify(error, null, 2));
      }

      // Attempt 2: Fallback to onboarding@resend.dev if custom sender domain was rejected
      const isSenderDomainError = error && (
        error.message?.includes('from address') || 
        error.message?.includes('does not match any of your verified domains') || 
        (error.message?.includes('not verified') && !error.message?.includes('testing emails'))
      );

      if (isSenderDomainError) {
        console.warn(`[Resend Fallback] Sender (${from}) unverified on Resend. Retrying to ${recipient} via (${FALLBACK_SENDER_EMAIL})...`);
        
        const retryResult = await resend.emails.send({
          from: FALLBACK_SENDER_EMAIL,
          to: [recipient],
          subject: subject,
          html: html,
          reply_to: replyTo
        });

        data = retryResult.data;
        error = retryResult.error;

        if (error) {
          console.error(`[Resend Fallback Error for ${recipient}]:`, JSON.stringify(error, null, 2));
        }
      }

      // Attempt 3: Fallback if Resend trial sandbox restricts delivery to non-account addresses
      const isSandboxError = error && (
        error.message?.includes('only send testing emails') || 
        error.message?.includes('testing emails') ||
        error.message?.includes('can only send testing')
      );

      if (isSandboxError) {
        const match = error.message?.match(/own email address \(([^)]+)\)/);
        const allowedSandboxRecipient = match ? match[1] : REGISTERED_ACCOUNT_EMAIL;

        console.warn(`[Resend Sandbox Notice] Resend trial sandbox restricts direct delivery to ${recipient}. Forwarding alert to registered Resend account (${allowedSandboxRecipient})...`);
        
        const sandboxBanner = `
          <div style="background-color: #fef3c7; border: 1px solid #fde68a; color: #92400e; padding: 14px; margin-bottom: 16px; border-radius: 8px; font-family: sans-serif; font-size: 13px;">
            <strong>[PlumberIndore System Alert]</strong><br/>
            Intended Business Recipient: <strong>${recipient}</strong><br/>
            <em>Notice: Delivered to registered Resend account owner (<strong>${allowedSandboxRecipient}</strong>). To deliver directly to <strong>plumberindore@gmail.com</strong>, verify domain at resend.com/domains.</em>
          </div>
        `;

        const sandboxResult = await resend.emails.send({
          from: FALLBACK_SENDER_EMAIL,
          to: [allowedSandboxRecipient],
          subject: `[FORWARDED for ${recipient}] ${subject}`,
          html: sandboxBanner + html,
          reply_to: replyTo
        });

        if (!sandboxResult.error) {
          console.log(`[Resend Response Success] Sandbox forwarded copy delivered to ${allowedSandboxRecipient} | ID: ${sandboxResult.data?.id}`);
          
          await logEmailToSupabase({
            recipient: `${recipient} (Forwarded to ${allowedSandboxRecipient})`,
            subject,
            emailType,
            status: 'sent',
            resendId: sandboxResult.data?.id,
            errorMessage: null
          });

          results.push({
            recipient,
            success: true,
            id: sandboxResult.data?.id,
            deliveredTo: allowedSandboxRecipient,
            forwarded: true
          });
          continue;
        } else {
          console.error(`[Resend Sandbox Forwarding Error]:`, JSON.stringify(sandboxResult.error, null, 2));
        }

        data = sandboxResult.data;
        error = sandboxResult.error;
      }

      // Log API Outcome
      if (error) {
        console.error(`[Resend Response Error] Failed delivering to ${recipient}:`, JSON.stringify(error, null, 2));
      } else {
        console.log(`[Resend Response Success] Successfully delivered to ${recipient} | Message ID: ${data?.id}`);
      }

      // Record recipient result in Supabase
      await logEmailToSupabase({
        recipient,
        subject,
        emailType,
        status: error ? 'failed' : 'sent',
        resendId: data?.id || null,
        errorMessage: error ? error.message : null
      });

      results.push({
        recipient,
        success: !error,
        id: data?.id,
        error: error ? error.message : null
      });

    } catch (err) {
      console.error(`[Resend Exception] Unexpected exception delivering email to ${recipient}:`, err);
      
      await logEmailToSupabase({
        recipient,
        subject,
        emailType,
        status: 'failed',
        resendId: null,
        errorMessage: err.message
      });

      results.push({
        recipient,
        success: false,
        error: err.message
      });
    }
  }

  const anySuccess = results.some(r => r.success);
  const deliveredList = results.filter(r => r.success).map(r => r.deliveredTo || r.recipient);

  return {
    success: anySuccess,
    deliveredTo: deliveredList.join(', '),
    details: results
  };
}

/**
 * Convenience helper for admin notifications.
 * Sends to both plumberindore@gmail.com and patidaransh275@gmail.com by default.
 */
export async function sendNotificationEmail({ subject, html, replyTo = ADMIN_NOTIFICATION_EMAIL, to }) {
  return sendEmail({
    to: to || ADMIN_NOTIFICATION_RECIPIENTS,
    subject,
    html,
    replyTo
  });
}
