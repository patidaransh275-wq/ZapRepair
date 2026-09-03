import { Resend } from 'resend';

export const ADMIN_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';

// Default sender set to 'onboarding@resend.dev' to guarantee zero domain-verification rejections out-of-the-box.
// Once custom domain (plumberindore.in) is verified, set RESEND_SENDER_EMAIL="PlumberIndore <notifications@plumberindore.in>".
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <onboarding@resend.dev>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';

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

      // Attempt 1: Send from configured sender (defaults to onboarding@resend.dev)
      let { data, error } = await resend.emails.send({
        from: from || PRIMARY_SENDER_EMAIL,
        to: [recipient],
        subject: subject,
        html: html,
        reply_to: replyTo,
        ...(cc && { cc: Array.isArray(cc) ? cc : [cc] }),
        ...(bcc && { bcc: Array.isArray(bcc) ? bcc : [bcc] })
      });

      // Attempt 2: Fallback to onboarding@resend.dev if custom sender domain was rejected
      if (error && (
        error.message?.includes('not verified') || 
        error.message?.includes('domain is not verified') || 
        error.message?.includes('Domain not verified') || 
        error.message?.includes('from address') ||
        error.name === 'validation_error' ||
        error.statusCode === 403
      )) {
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
      }

      // Attempt 3: Fallback if Resend trial sandbox restricts non-account recipient addresses
      if (error && (
        error.message?.includes('only send testing emails') || 
        error.message?.includes('testing emails') ||
        error.message?.includes('can only send testing')
      )) {
        console.warn(`[Resend Sandbox Notice] Recipient ${recipient} restricted by Resend sandbox policy. Forwarding copy to business inbox (${ADMIN_NOTIFICATION_EMAIL})...`);
        
        const sandboxBanner = `
          <div style="background-color: #fef3c7; border: 1px solid #fde68a; color: #92400e; padding: 12px; margin-bottom: 16px; border-radius: 8px; font-family: sans-serif; font-size: 12px;">
            <strong>[PlumberIndore System Alert]</strong><br/>
            Intended Recipient: <strong>${recipient}</strong><br/>
            <em>Notice: Delivered to admin inbox (${ADMIN_NOTIFICATION_EMAIL}). To send directly to external customer inboxes, complete domain verification for <strong>plumberindore.in</strong> at <a href="https://resend.com/domains" style="color: #b45309; text-decoration: underline;">resend.com/domains</a>.</em>
          </div>
        `;

        const sandboxResult = await resend.emails.send({
          from: FALLBACK_SENDER_EMAIL,
          to: [ADMIN_NOTIFICATION_EMAIL],
          subject: `[FORWARDED for ${recipient}] ${subject}`,
          html: sandboxBanner + html,
          reply_to: replyTo
        });

        if (!sandboxResult.error) {
          console.log(`[Resend Response Success] Sandbox forwarded copy delivered to ${ADMIN_NOTIFICATION_EMAIL} | ID: ${sandboxResult.data?.id}`);
          
          await logEmailToSupabase({
            recipient: `${recipient} (Forwarded to ${ADMIN_NOTIFICATION_EMAIL})`,
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
            deliveredTo: ADMIN_NOTIFICATION_EMAIL,
            forwarded: true
          });
          continue;
        }

        data = sandboxResult.data;
        error = sandboxResult.error;
      }

      // Log API Outcome
      if (error) {
        console.error(`[Resend Response Error] Failed delivering to ${recipient}:`, {
          message: error.message,
          name: error.name,
          statusCode: error.statusCode
        });
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
      console.error(`[Resend Exception] Unexpected exception delivering email to ${recipient}:`, err.message);
      
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
 * Convenience helper for single admin notifications directly to plumberindore@gmail.com
 */
export async function sendNotificationEmail({ subject, html, replyTo = ADMIN_NOTIFICATION_EMAIL, to }) {
  return sendEmail({
    to: to || [ADMIN_NOTIFICATION_EMAIL],
    subject,
    html,
    replyTo
  });
}
