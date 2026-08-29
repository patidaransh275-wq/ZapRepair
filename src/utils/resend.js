import { Resend } from 'resend';

const BUSINESS_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';
const PRIMARY_SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore <notifications@plumberindore.in>';
const FALLBACK_SENDER_EMAIL = 'PlumberIndore <onboarding@resend.dev>';

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

    // 1. Try sending with verified domain plumberindore.in
    let { data, error } = await resend.emails.send({
      from: PRIMARY_SENDER_EMAIL,
      to: [BUSINESS_NOTIFICATION_EMAIL],
      subject: subject,
      html: html,
      reply_to: replyTo
    });

    // 2. If domain is not yet verified in Resend dashboard, fall back to onboarding@resend.dev
    if (error && (error.message?.includes('not verified') || error.message?.includes('domain is not verified'))) {
      console.warn(`Primary domain (${PRIMARY_SENDER_EMAIL}) not verified yet in Resend. Retrying with fallback sender (${FALLBACK_SENDER_EMAIL})...`);
      
      const fallbackResult = await resend.emails.send({
        from: FALLBACK_SENDER_EMAIL,
        to: [BUSINESS_NOTIFICATION_EMAIL],
        subject: subject,
        html: html,
        reply_to: replyTo
      });

      data = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error) {
      console.error('Resend API error:', error);
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
