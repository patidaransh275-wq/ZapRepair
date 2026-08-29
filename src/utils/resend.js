import { Resend } from 'resend';

const BUSINESS_NOTIFICATION_EMAIL = process.env.BUSINESS_NOTIFICATION_EMAIL || 'plumberindore@gmail.com';
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'PlumberIndore Notifications <notifications@plumberindore.in>';

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

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [BUSINESS_NOTIFICATION_EMAIL],
      subject: subject,
      html: html,
      reply_to: replyTo
    });

    if (error) {
      console.error('Resend API returned an error:', error);
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
