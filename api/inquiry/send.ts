import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/* ─── Configuration ─── */

const FROM_ADDRESS = 'PropFlowTech <noreply@propflowtech.com>';
const ADMIN_EMAIL = 'whitelabel@globalforexfunds.com';

const BRAND = {
  bg: '#030308',
  cardBg: '#0a0a12',
  cardBorder: '#1a1a24',
  accent: '#00aaff',
  text: '#f0f0f5',
  textSecondary: '#9898a8',
  textMuted: '#606070',
  font: "'Outfit', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

/* ─── Rate Limiting ─── */

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW) return true;
  recentSubmissions.set(ip, now);
  if (recentSubmissions.size > 500) {
    for (const [k, v] of recentSubmissions) {
      if (now - v > RATE_LIMIT_WINDOW * 5) recentSubmissions.delete(k);
    }
  }
  return false;
}

/* ─── Validation ─── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string, maxLen = 500): string {
  return String(str || '').trim().slice(0, maxLen);
}

/* ─── Email Template ─── */

function buildEmailHtml(
  name: string,
  email: string,
  brand: string,
  activity: string,
  volume: string,
  phone: string,
  message: string,
): string {
  const badge = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
    <tr><td style="background-color:rgba(0,170,255,0.1);border:1px solid rgba(0,170,255,0.2);border-radius:100px;padding:4px 14px;">
      <span style="font-family:${BRAND.font};font-size:11px;font-weight:700;letter-spacing:1px;color:${BRAND.accent};">NEW LEAD</span>
    </td></tr></table>`;

  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px;border-bottom:1px solid ${BRAND.cardBorder};font-family:${BRAND.font};font-size:12px;color:${BRAND.textMuted};font-weight:600;letter-spacing:0.5px;text-transform:uppercase;width:160px;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid ${BRAND.cardBorder};font-family:${BRAND.font};font-size:14px;color:${BRAND.text};">${value}</td>
    </tr>`;

  const content = `
    ${badge}
    <h1 style="font-family:${BRAND.font};font-size:24px;font-weight:700;color:${BRAND.text};margin:0 0 8px;line-height:1.3;">New PropFlowTech Lead</h1>
    <p style="font-family:${BRAND.font};font-size:15px;color:${BRAND.textSecondary};margin:0 0 24px;line-height:1.6;">A new inquiry has been submitted through propflowtech.com.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.bg};border:1px solid ${BRAND.cardBorder};border-radius:10px;overflow:hidden;margin:0 0 24px;">
      ${row('Name', name)}
      ${row('Email', `<a href="mailto:${email}" style="color:${BRAND.accent};text-decoration:none;">${email}</a>`)}
      ${row('Brand / Firm', brand)}
      ${row('Business Activity', activity)}
      ${row('Expected Volume', volume)}
      ${row('Phone', phone)}
    </table>
    ${message ? `
    <h2 style="font-family:${BRAND.font};font-size:16px;font-weight:600;color:${BRAND.text};margin:0 0 8px;">Their Vision</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.bg};border:1px solid ${BRAND.cardBorder};border-radius:10px;margin:12px 0 20px;">
      <tr><td style="padding:16px 20px;">
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.textSecondary};margin:0;line-height:22px;white-space:pre-wrap;">${message}</p>
      </td></tr>
    </table>` : ''}
    <p style="font-family:${BRAND.font};font-size:15px;color:${BRAND.textSecondary};margin:0 0 24px;line-height:1.6;">Reply directly to <a href="mailto:${email}" style="color:${BRAND.accent};text-decoration:none;">${email}</a> to follow up.</p>
  `;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="dark"/>
  <title>[PropFlowTech] New Lead — ${name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};font-family:${BRAND.font};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;">[PropFlowTech] New Lead — ${name}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.bg};">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding:0 0 32px;">
          <span style="font-family:${BRAND.font};font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${BRAND.text};">PROPFLOW<span style="color:${BRAND.accent};">TECH</span></span>
        </td></tr>
        <tr><td style="background-color:${BRAND.cardBg};border:1px solid ${BRAND.cardBorder};border-radius:16px;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:40px 40px 32px;">
              ${content}
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0 0;">
          <p style="font-family:${BRAND.font};font-size:11px;line-height:16px;color:#3f3f46;margin:0;text-align:center;">
            This is an automated notification from propflowtech.com
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Handler ─── */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { name: rawName, email: rawEmail, brand: rawBrand, activity: rawActivity, volume: rawVolume, phone: rawPhone, message: rawMessage } = req.body || {};

    const name = sanitize(rawName, 100);
    const email = sanitize(rawEmail, 200);
    const brand = sanitize(rawBrand, 200) || 'Not specified';
    const activity = sanitize(rawActivity, 200) || 'Not specified';
    const volume = sanitize(rawVolume, 100) || 'Not specified';
    const phone = sanitize(rawPhone, 50) || 'Not provided';
    const message = sanitize(rawMessage, 2000);

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');
    const resend = new Resend(apiKey);

    const html = buildEmailHtml(name, email, brand, activity, volume, phone, message);

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[PropFlowTech] New Lead — ${name}`,
      html,
    });

    if (error) {
      console.error('[propflowtech-inquiry] Resend error:', error);
      throw new Error('Email send failed');
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[propflowtech-inquiry] Error:', err);
    return res.status(500).json({ error: 'Failed to send inquiry. Please try again.' });
  }
}
