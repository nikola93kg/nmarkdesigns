import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import type { ContactValues } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

export interface ContactSubmission extends ContactValues {
  locale: Locale;
}

export type DeliveryStatus = "accepted" | "unavailable" | "failed";

export interface DeliveryResult {
  status: DeliveryStatus;
  messageId?: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password?: string;
  recipient: string;
}

/**
 * Read SMTP configuration safely from server-only environment variables.
 */
export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portStr = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.CONTACT_RECIPIENT?.trim() || "info@nmarkdesigns.com";

  if (!host || !user || !password) {
    return null;
  }

  const port = portStr ? parseInt(portStr, 10) : 465;
  const secure = process.env.SMTP_SECURE === "false" ? false : port === 465;

  return { host, port, secure, user, password, recipient };
}

/**
 * Creates a reusable, hardened Nodemailer transport with connection timeouts.
 */
export function createSmtpTransport(config: SmtpConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
    // Prevent hanging connections in serverless or Node environments
    connectionTimeout: 10_000, // 10 seconds
    greetingTimeout: 10_000,
    socketTimeout: 15_000, // 15 seconds
  });
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildEmailMessage(submission: ContactSubmission, config: SmtpConfig) {
  const subject = `New Website Inquiry — NMark Designs [${submission.name}]`;

  const plainText = [
    "Nova poruka sa NMark Designs web sajta / New website inquiry:",
    "--------------------------------------------------",
    `Ime / Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Telefon / Phone: ${submission.phone || "Nije navedeno / Not provided"}`,
    `Jezik / Locale: ${submission.locale.toUpperCase()}`,
    "--------------------------------------------------",
    "Poruka / Message:",
    submission.message,
  ].join("\n");

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #110024; background-color: #f8f8fa; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e6e6ec; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #110024; padding: 20px 24px; color: #ffffff;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 600;">NMark Designs — Nova poruka</h1>
      <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.7);">Primljeno preko kontakt forme na nmarkdesigns.com</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #737380; width: 120px;"><strong>Ime / Name:</strong></td>
          <td style="padding: 8px 0; font-size: 15px; color: #110024;">${escapeHtml(submission.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #737380;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; font-size: 15px; color: #110024;"><a href="mailto:${escapeHtml(submission.email)}" style="color: #e89a3c; text-decoration: none;">${escapeHtml(submission.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #737380;"><strong>Telefon / Phone:</strong></td>
          <td style="padding: 8px 0; font-size: 15px; color: #110024;">${escapeHtml(submission.phone || "Nije navedeno / Not provided")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #737380;"><strong>Jezik / Locale:</strong></td>
          <td style="padding: 8px 0; font-size: 14px; color: #110024;">${escapeHtml(submission.locale.toUpperCase())}</td>
        </tr>
      </table>
      <div style="border-top: 1px solid #e6e6ec; padding-top: 16px;">
        <h3 style="margin: 0 0 12px; font-size: 15px; color: #110024;">Poruka / Message:</h3>
        <div style="background-color: #f8f8fa; border-radius: 6px; padding: 16px; font-size: 14px; color: #110024; white-space: pre-wrap; word-break: break-word;">${escapeHtml(submission.message)}</div>
      </div>
    </div>
    <div style="background-color: #f8f8fa; padding: 12px 24px; border-top: 1px solid #e6e6ec; font-size: 12px; color: #737380; text-align: center;">
      Ovaj email je poslat sa nmarkdesigns.com. Odgovorite direktno na ovaj email da biste kontaktirali pošiljaoca.
    </div>
  </div>
</body>
</html>
  `;

  return {
    from: `"NMark Designs Contact Form" <${config.user}>`,
    to: config.recipient,
    replyTo: `"${submission.name}" <${submission.email}>`,
    subject,
    text: plainText,
    html: htmlContent,
  };
}

export interface ContactDelivery {
  isAvailable: () => boolean;
  send: (submission: ContactSubmission) => Promise<DeliveryResult>;
}

export const contactDelivery: ContactDelivery = {
  isAvailable() {
    return Boolean(getSmtpConfig());
  },

  async send(submission: ContactSubmission): Promise<DeliveryResult> {
    const config = getSmtpConfig();
    if (!config) {
      return { status: "unavailable" };
    }

    try {
      const transporter = createSmtpTransport(config);
      const mailOptions = buildEmailMessage(submission, config);
      const info = await transporter.sendMail(mailOptions);
      return { status: "accepted", messageId: info.messageId };
    } catch {
      // Do not leak internal SMTP/network errors
      return { status: "failed" };
    }
  },
};
