import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '../../../utils/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      message, 
      customerName = 'Customer', 
      customerPhone, 
      orderId = 'Live Chat',
      chatHistory = []
    } = body || {};

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message text is required.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #38bdf8; margin: 0; font-size: 20px;">PlumberIndore - New Live Chat Message</h2>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 14px; margin-top: 0;">A customer sent a live chat message regarding <strong>Order/Ref #${orderId}</strong>:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Order / Reference:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #0284c7;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Sender:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${customerName}</td>
            </tr>
            ${customerPhone ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Customer Phone:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${customerPhone}" style="color: #d97706; text-decoration: none; font-weight: bold;">${customerPhone}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Timestamp:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionTime} (IST)</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">New Message:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 15px; font-weight: 500; color: #0f172a; white-space: pre-line;">${message}</td>
            </tr>
          </table>

          ${chatHistory && chatHistory.length > 0 ? `
          <div style="margin-top: 16px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background-color: #f8fafc;">
            <div style="font-size: 12px; font-weight: bold; color: #64748b; margin-bottom: 8px; text-transform: uppercase;">Recent Conversation:</div>
            ${chatHistory.map(m => `
              <div style="font-size: 12px; margin-bottom: 4px; color: ${m.sender === 'user' ? '#0f172a' : '#0284c7'};">
                <strong>${m.sender === 'user' ? customerName : 'Technician/Support'}:</strong> ${m.text} <span style="font-size: 10px; color: #94a3b8;">(${m.time})</span>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <div style="margin-top: 20px; padding: 12px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 4px; font-size: 13px;">
            <strong>Live Support Action:</strong> You can call customer directly or reply via WhatsApp to order <strong>#${orderId}</strong>.
          </div>
        </div>
        <div style="text-align: center; padding: 12px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          PlumberIndore Notification System • Verified Domain: plumberindore.in
        </div>
      </div>
    `;

    const result = await sendNotificationEmail({
      subject: `[PlumberIndore Live Chat] Message regarding #${orderId}`,
      html: htmlContent,
      replyTo: 'plumberindore@gmail.com'
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Live chat notification delivered successfully!',
        data: result.data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
