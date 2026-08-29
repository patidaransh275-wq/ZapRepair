import { Resend } from 'resend';

const BUSINESS_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';
const RESEND_TEST_RECIPIENT = 'patidaransh275@gmail.com';

export async function sendNotificationEmail({ subject, html, replyTo = 'plumberindore@gmail.com' }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables.');
    return {
      success: false,
      error: 'RESEND_API_KEY is missing from environment variables'
    };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Primary Attempt: Send from verified domain plumberindore.in to business email
    let { data, error } = await resend.emails.send({
      from: PRIMARY_SENDER_EMAIL,
      to: [BUSINESS_NOTIFICATION_EMAIL],
      subject: subject,
      html: html,
      reply_to: replyTo
    });

    // 2. If domain is unverified, retry with onboarding sender
    if (error && (error.message?.includes('not verified') || error.message?.includes('domain is not verified'))) {
      console.warn(`Primary sender domain (${PRIMARY_SENDER_EMAIL}) not verified. Retrying with fallback sender...`);
      
      const retryResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: [BUSINESS_NOTIFICATION_EMAIL],
        subject: subject,
        html: html,
        reply_to: replyTo
      });

      data = retryResult.data;
      error = retryResult.error;
    }

    // 3. If Resend test account requires sending to account owner email (patidaransh275@gmail.com)
    if (error && (error.message?.includes('only send testing emails') || error.message?.includes(RESEND_TEST_RECIPIENT))) {
      console.warn(`Resend sandbox restriction detected. Retrying delivery to verified account email (${RESEND_TEST_RECIPIENT})...`);
      
      const sandboxResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: [RESEND_TEST_RECIPIENT],
        subject: subject,
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
      error: err.message || 'Internal server error while sending email'
    };
  }
}
