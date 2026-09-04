import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '../../../utils/resend.js';
import { checkRateLimit, getClientIp, sanitizeString, escapeHtml } from '../../../lib/security.js';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`chat_msg_${ip}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many chat messages sent. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { 
      message, 
      customerName = 'Customer', 
      customerPhone, 
      orderId = 'Live Chat',
      chatHistory = []
    } = body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message text is required.' },
        { status: 400 }
      );
    }

    const cleanName = escapeHtml(sanitizeString(customerName) || 'Customer');
    const cleanPhone = escapeHtml(sanitizeString(customerPhone) || '');
    const cleanOrderId = escapeHtml(sanitizeString(orderId) || 'Live Chat');
    const cleanMessage = escapeHtml(message.trim());
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const safeChatHistory = Array.isArray(chatHistory) ? chatHistory.slice(-10).map(m => ({
      sender: m.sender === 'user' ? cleanName : 'Technician/Support',
      text: escapeHtml(String(m.text || '')),
      time: escapeHtml(String(m.time || ''))
    })) : [];

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #38bdf8; margin: 0; font-size: 20px;">PlumberIndore - New Live Chat Message</h2>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 14px; margin-top: 0;">A customer sent a live chat message regarding <strong>Order/Ref #${cleanOrderId}</strong>:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Order / Reference:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #0284c7;">${cleanOrderId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Sender:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${cleanName}</td>
            </tr>
            ${cleanPhone ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Customer Phone:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${cleanPhone}" style="color: #d97706; text-decoration: none; font-weight: bold;">${cleanPhone}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Timestamp:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionTime} (IST)</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">New Message:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 15px; font-weight: 500; color: #0f172a; white-space: pre-line;">${cleanMessage}</td>
            </tr>
          </table>

          ${safeChatHistory.length > 0 ? `
          <div style="margin-top: 16px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background-color: #f8fafc;">
            <div style="font-size: 12px; font-weight: bold; color: #64748b; margin-bottom: 8px; text-transform: uppercase;">Recent Conversation:</div>
            ${safeChatHistory.map(m => `
              <div style="font-size: 12px; margin-bottom: 4px; color: ${m.sender === cleanName ? '#0f172a' : '#0284c7'};">
                <strong>${m.sender}:</strong> ${m.text} <span style="font-size: 10px; color: #94a3b8;">(${m.time})</span>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <div style="margin-top: 20px; padding: 12px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 4px; font-size: 13px;">
            <strong>Live Support Action:</strong> You can call customer directly or reply via WhatsApp to order <strong>#${cleanOrderId}</strong>.
          </div>
        </div>
      </div>
    `;

    // Send email alert to admin
    const emailResult = await sendNotificationEmail({
      subject: `[PlumberIndore Chat] #${cleanOrderId} - Message from ${cleanName}`,
      html: htmlContent,
      replyTo: 'plumberindore@gmail.com'
    });

    return NextResponse.json({
      success: true,
      message: 'Chat alert sent to Indore support desk.',
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
