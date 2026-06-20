import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function to process emails.
 * Supports:
 * - 'user-confirmation': Auto-reply to user confirming receipt.
 * - 'meeting-request': Send meeting detail request to founders (with picker link).
 * - 'contact': Send standard contact inquiry to founders.
 * - 'founder-approve': Send confirmed date & time back to user.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, payload } = req.body;
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env;

  const isSmtpConfigured = SMTP_HOST && SMTP_USER && SMTP_PASS;

  if (!isSmtpConfigured) {
    // If SMTP environment variables are missing, fallback to simulator mode
    return res.status(200).json({
      success: true,
      mode: 'simulated',
      message: 'SMTP credentials missing on host. Operating in simulation mode.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587', 10),
      secure: parseInt(SMTP_PORT || '587', 10) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    let mailOptions = {};
    const foundersEmails = SMTP_USER; // Send copies back to account email

    if (type === 'meeting-request') {
      const confirmUrl = `${req.headers.origin || 'http://localhost:5173'}?action=confirm-meeting&id=${payload.meetingId}`;
      mailOptions = {
        from: `"TAITS Tech Portal" <${SMTP_USER}>`,
        to: foundersEmails,
        subject: `📅 Meeting Request from ${payload.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">New Meeting Request</h2>
            <hr/>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Organization:</strong> ${payload.organization}</p>
            <p><strong>Message:</strong> ${payload.message}</p>
            <br/>
            <p>Please select a date and time to confirm the meeting with the user:</p>
            <a href="${confirmUrl}" style="background-color: #1557FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Confirm Date & Time</a>
          </div>
        `,
      };
    } else if (type === 'user-confirmation') {
      mailOptions = {
        from: `"TAITS Tech" <${SMTP_USER}>`,
        to: payload.email,
        subject: `📥 Inquiry Received: TAITS Tech`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">Thank you for contacting TAITS Tech</h2>
            <p>Hello ${payload.name},</p>
            <p>We have successfully received your inquiry and our team of founders has been notified.</p>
            <p>We will review your details and respond shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #666;">Innovate. Integrate. Elevate.</p>
          </div>
        `,
      };
    } else if (type === 'contact') {
      mailOptions = {
        from: `"TAITS Tech Portal" <${SMTP_USER}>`,
        to: foundersEmails,
        subject: `✉️ New Contact Message: ${payload.subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">New Contact Message</h2>
            <hr/>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Subject:</strong> ${payload.subject}</p>
            <p><strong>Message:</strong> ${payload.message}</p>
          </div>
        `,
      };
    } else if (type === 'founder-approve') {
      mailOptions = {
        from: `"TAITS Tech" <${SMTP_USER}>`,
        to: payload.email,
        subject: `📅 Meeting Confirmed: TAITS Tech`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">Your Meeting is Confirmed!</h2>
            <p>Hello ${payload.name},</p>
            <p>Our founders have scheduled a meeting with you.</p>
            <div style="background-color: #f0f4ff; border-left: 4px solid #1557FF; padding: 15px; margin: 20px 0;">
              <strong>Confirmed Date & Time:</strong> ${payload.dateTime}
            </div>
            <p>We look forward to collaborating with you.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #666;">Innovate. Integrate. Elevate.</p>
          </div>
        `,
      };
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, mode: 'live' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
