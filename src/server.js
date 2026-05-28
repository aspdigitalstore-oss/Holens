const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const DATA_DIR = path.resolve(__dirname, '../data');
const FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([]));
}

ensureDataDir();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'partners@vitala.global';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;

async function sendEmail(subject, text) {
  if (SENDGRID_API_KEY) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(SENDGRID_API_KEY);
      await sgMail.send({ to: ADMIN_EMAIL, from: ADMIN_EMAIL, subject, text });
      return true;
    } catch (err) {
      console.error('SendGrid error', err);
      return false;
    }
  }

  const SMTP_HOST = process.env.SMTP_HOST;
  if (SMTP_HOST) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: !!process.env.SMTP_SECURE,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });

      await transporter.sendMail({ from: ADMIN_EMAIL, to: ADMIN_EMAIL, subject, text });
      return true;
    } catch (err) {
      console.error('SMTP send error', err);
      return false;
    }
  }

  // Fallback: log
  console.log('Email fallback:', subject, text);
  return false;
}

app.post('/api/inquiries', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.details || !Array.isArray(payload.items)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // minimal validation
    const record = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const current = JSON.parse(fs.readFileSync(FILE, 'utf8') || '[]');
    current.unshift(record);
    fs.writeFileSync(FILE, JSON.stringify(current, null, 2));

    const subject = `Bulk inquiry — ${payload.details.companyName || 'Unknown company'}`;
    const lines = [];
    lines.push(`Company: ${payload.details.companyName}`);
    lines.push(`Contact: ${payload.details.contactPerson}`);
    lines.push(`Email: ${payload.details.businessEmail}`);
    lines.push(`Country: ${payload.details.country}`);
    lines.push(`Phone: ${payload.details.phoneNumber}`);
    lines.push(`Distributor type: ${payload.details.distributorType}`);
    lines.push(`Estimated monthly volume: ${payload.details.estimatedMonthlyVolume}`);
    lines.push(`Preferred payment: ${payload.details.paymentPreference}`);
    lines.push('\nProducts:');
    payload.items.forEach((it) => lines.push(`- ${it.brandName} / ${it.productName}: ${it.quantity}`));
    lines.push(`\nTotal units: ${payload.totalUnits}`);
    lines.push(`\nNotes: ${payload.details.notes || 'None'}`);

    await sendEmail(subject, lines.join('\n'));

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`Inquiry API listening on ${port}`));
