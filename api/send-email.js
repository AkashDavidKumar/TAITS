import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function to process emails.
 * Sends one email copy to the founder and a confirmation email to the user.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, payload } = req.body;
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, FOUNDER_EMAIL, GOOGLE_MEET_LINK } = process.env;

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

    const destinationEmail = FOUNDER_EMAIL || SMTP_USER;
    let mailOptionsFounder = {};
    let mailOptionsUser = {};

    if (type === 'meeting-request') {
      mailOptionsFounder = {
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
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p>Click the button below to select a date, time, and attach a Google Meet link for this meeting:</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://taits.vercel.app/?action=schedule&id=${payload.meetingId}&email=${encodeURIComponent(payload.email)}&name=${encodeURIComponent(payload.name)}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #1557FF; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                📅 Select Date & Time Slot
              </a>
            </div>
          </div>
        `,
      };

      mailOptionsUser = {
        from: `"TAITS Tech" <${SMTP_USER}>`,
        to: payload.email,
        subject: `📥 Meeting Request Received: TAITS Tech`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">We have received your request</h2>
            <p>Hello ${payload.name},</p>
            <p>Thank you for scheduling a meeting with TAITS Tech. Our team have been notified of your request.</p>
            <p>We will review your details and contact you shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #666;">Innovate. Integrate. Elevate.</p>
          </div>
        `,
      };
    } else if (type === 'confirm-schedule') {
      const selectedMeetLink = payload.meetLink || GOOGLE_MEET_LINK || 'https://meet.google.com';

      mailOptionsFounder = {
        from: `"TAITS Tech Portal" <${SMTP_USER}>`,
        to: destinationEmail,
        subject: `🗓️ Meeting Confirmed with ${payload.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">Meeting Confirmed</h2>
            <hr/>
            <p><strong>Client Name:</strong> ${payload.name}</p>
            <p><strong>Client Email:</strong> ${payload.email}</p>
            <p><strong>Scheduled Date:</strong> ${payload.date}</p>
            <p><strong>Scheduled Time:</strong> ${payload.time}</p>
            <p><strong>Google Meet Link:</strong> <a href="${selectedMeetLink}">${selectedMeetLink}</a></p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${selectedMeetLink}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #1557FF; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                💻 Join Google Meet
              </a>
            </div>
          </div>
        `,
      };

      mailOptionsUser = {
        from: `"TAITS Tech" <${SMTP_USER}>`,
        to: payload.email,
        subject: `🗓️ Meeting Scheduled: TAITS Tech`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">Your Meeting Has Been Scheduled!</h2>
            <p>Hello ${payload.name},</p>
            <p>Our team has finalized your meeting slot. Here are the confirmed details:</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p><strong>Date:</strong> ${payload.date}</p>
            <p><strong>Time:</strong> ${payload.time}</p>
            <p><strong>Google Meet Link:</strong> <a href="${selectedMeetLink}">${selectedMeetLink}</a></p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${selectedMeetLink}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #1557FF; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                💻 Join Google Meet
              </a>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #666;">If you have any questions or need to reschedule, please reply directly to this email.</p>
            <p style="font-size: 0.9rem; color: #666;">Innovate. Integrate. Elevate.</p>
          </div>
        `,
      };
    } else if (type === 'contact') {
      mailOptionsFounder = {
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

      mailOptionsUser = {
        from: `"TAITS Tech" <${SMTP_USER}>`,
        to: payload.email,
        subject: `📥 Message Received: TAITS Tech`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #1557FF;">Thank you for contacting us</h2>
            <p>Hello ${payload.name},</p>
            <p>Thank you for reaching out to us. We have received your contact inquiry and our team will get back to you shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 0.9rem; color: #666;">Innovate. Integrate. Elevate.</p>
          </div>
        `,
      };
    }

    // Send to Founder
    await transporter.sendMail(mailOptionsFounder);

    // Send to User
    if (payload.email) {
      await transporter.sendMail(mailOptionsUser);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
