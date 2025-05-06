// 📬 /api/send-email.js - API route to send emails with document link
// This assumes you're deploying on Vercel, Netlify, or using an Express-style handler

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, url } = req.body;
  if (!email || !url) {
    return res.status(400).json({ error: 'Missing email or document URL' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yourmailserver.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: 'no-reply@univen.ac.za',
      to: email,
      subject: 'University of Venda: Shared Document',
      html: `<p>You have been sent a document from the University of Venda system.</p>
             <p><a href="${url}" target="_blank">Click here to view the document</a></p>`
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
}
