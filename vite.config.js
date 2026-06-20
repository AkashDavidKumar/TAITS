import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from system and .env files
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-server-local',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/send-email' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body);
                  const { type, payload } = parsed;
                  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, FOUNDER_EMAIL } = env;

                  const isSmtpConfigured = SMTP_HOST && SMTP_USER && SMTP_PASS;
                  if (!isSmtpConfigured) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'SMTP credentials missing' }));
                    return;
                  }

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
                          <p>Thank you for scheduling a meeting with TAITS Tech. Our founders have been notified of your request.</p>
                          <p>We will review your details and contact you shortly.</p>
                          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
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

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true }));
                } catch (err) {
                  console.error('Vite local mail server error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
