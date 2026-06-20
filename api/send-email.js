import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function to process emails.
 * Sends exactly one email to the configured founder address with details.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, payload } = req.body;
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, FOUNDER_EMAIL } = process.env;

  const isSmtpConfigured = SMTP_HOST && SMTP_USER && SMTP_PASS;

  if (!isSmtpConfigured) {
    return res.status(400).json({
      success: false,
      message: 'SMTP credentials missing on host.'
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

    const destinationEmail = FOUNDER_EMAIL || SMTP_USER || 'bu230535@gmail.com';
    let mailOptions = {};

    if (type === 'meeting-request') {
      mailOptions = {
        from: `"TAITS Tech Portal" <${SMTP_USER}>`,
        to: destinationEmail,
        subject: `📅 Meeting Request from ${payload.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">New Meeting Request</h2>
            <hr/>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Organization:</strong> ${payload.organization || 'Not specified'}</p>
            <p><strong>Message:</strong> ${payload.message}</p>
          </div>
        `,
      };
    } else if (type === 'contact') {
      mailOptions = {
        from: `"TAITS Tech Portal" <${SMTP_USER}>`,
        to: destinationEmail,
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
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
