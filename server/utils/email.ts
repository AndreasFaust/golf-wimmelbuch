import nodemailer, { type Transporter } from "nodemailer";
import {
  getConfirmationEmailTemplate,
  type ConfirmationEmailLocale,
  type ConfirmationEmailTemplate,
} from "#shared/confirmation-email-templates";
import { getAppLocaleDisplay } from "#shared/i18n";
import type { RequestFormPayload } from "#shared/request-form";

export {
  resolveConfirmationEmailLocale as resolveEmailLocale,
  type ConfirmationEmailLocale as EmailLocale,
} from "#shared/confirmation-email-templates";

interface SmtpConfig {
  host: string;
  port: string;
  secure: string;
  user: string;
  password: string;
  from: string;
  operator1: string;
  operator2: string;
}

let cachedTransporter: Transporter | null = null;

function buildTransporter(config: SmtpConfig): Transporter {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: Number(config.port) || 587,
    secure: config.secure === "true",
    auth: {
      user: config.user,
      pass: config.password,
    },
  });

  return cachedTransporter;
}

function extractEmailAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match?.[1] ?? from).trim();
}

function buildFromHeader(brand: string, from: string): string {
  const address = extractEmailAddress(from);
  const safeBrand = brand.replace(/"/g, '\\"');
  return `"${safeBrand}" <${address}>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildDetailRows(
  data: RequestFormPayload,
  t: ConfirmationEmailTemplate
): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string }> = [
    { label: t.fieldLabels.club, value: data.club },
    { label: t.fieldLabels.auflage, value: data.auflage },
  ];

  if (data.phone) rows.push({ label: t.fieldLabels.phone, value: data.phone });
  if (data.street)
    rows.push({ label: t.fieldLabels.street, value: data.street });
  if (data.city) rows.push({ label: t.fieldLabels.city, value: data.city });
  if (data.country)
    rows.push({ label: t.fieldLabels.country, value: data.country });
  if (data.message)
    rows.push({ label: t.fieldLabels.message, value: data.message });

  return rows;
}

function renderText(
  data: RequestFormPayload,
  t: ConfirmationEmailTemplate
): string {
  const rows = buildDetailRows(data, t)
    .map((row) => `- ${row.label}: ${row.value}`)
    .join("\n");

  return [
    t.greeting(data.name),
    "",
    t.intro,
    "",
    `${t.detailsTitle}:`,
    rows,
    "",
    t.closing,
    t.signature,
  ].join("\n");
}

function renderHtml(
  data: RequestFormPayload,
  t: ConfirmationEmailTemplate,
  htmlLang: ConfirmationEmailLocale
): string {
  const rows = buildDetailRows(data, t)
    .map(
      (row) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top;">${escapeHtml(row.label)}</td><td style="padding:4px 0;">${escapeHtml(row.value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const signatureHtml = escapeHtml(t.signature).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="${htmlLang}">
  <body style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#082137;max-width:600px;margin:0 auto;padding:24px;">
    <p>${escapeHtml(t.greeting(data.name))}</p>
    <p>${escapeHtml(t.intro)}</p>
    <h3 style="margin-top:24px;margin-bottom:8px;">${escapeHtml(t.detailsTitle)}</h3>
    <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${rows}</table>
    <p style="margin-top:32px;">${escapeHtml(t.closing)}<br>${signatureHtml}</p>
  </body>
</html>`;
}

export async function sendConfirmationEmail(
  config: SmtpConfig,
  data: RequestFormPayload,
  locale: unknown = "de"
): Promise<void> {
  if (!config.host || !config.user || !config.password || !config.from) {
    throw createError({
      statusCode: 500,
      statusMessage: "SMTP is not configured",
    });
  }

  const { locale: emailLocale, template } =
    getConfirmationEmailTemplate(locale);
  const transporter = buildTransporter(config);

  const info = await transporter.sendMail({
    from: buildFromHeader(template.brand, config.from),
    to: data.email,
    subject: template.subject,
    text: renderText(data, template),
    html: renderHtml(data, template, emailLocale),
  });
  console.log(
    `[email] confirmation → ${data.email}  messageId=${info.messageId}  response=${info.response}`
  );
}

const OPERATOR_TEMPLATE: ConfirmationEmailTemplate = {
  brand: "Golf-Wimmelbuch",
  subject: "Neue Anfrage – Das große Golf-Wimmelbuch",
  greeting: () => "Neue Anfrage über das Formular",
  intro: "Es ist eine neue Anfrage eingegangen.",
  detailsTitle: "Angaben",
  fieldLabels: {
    club: "Club",
    auflage: "Mögliche Auflage",
    phone: "Telefon",
    street: "Straße / Hausnummer",
    city: "PLZ / Ort",
    country: "Land",
    message: "Nachricht",
  },
  closing: "",
  signature: "",
};

function renderOperatorText(
  data: RequestFormPayload,
  pageLocale: unknown
): string {
  const t = OPERATOR_TEMPLATE;
  const pageLanguage = getAppLocaleDisplay(pageLocale);
  const rows = [
    { label: "Name", value: data.name },
    { label: "E-Mail", value: data.email },
    { label: "Seitensprache", value: pageLanguage },
    ...buildDetailRows(data, t),
  ]
    .map((row) => `${row.label}: ${row.value}`)
    .join("\n");

  return [`${t.intro}`, "", rows].join("\n");
}

function renderOperatorHtml(
  data: RequestFormPayload,
  pageLocale: unknown
): string {
  const t = OPERATOR_TEMPLATE;
  const pageLanguage = getAppLocaleDisplay(pageLocale);
  const rows = [
    { label: "Name", value: data.name },
    { label: "E-Mail", value: data.email },
    { label: "Seitensprache", value: pageLanguage },
    ...buildDetailRows(data, t),
  ]
    .map(
      (row) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top;">${escapeHtml(row.label)}</td><td style="padding:4px 0;">${escapeHtml(row.value).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="de">
  <body style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#082137;max-width:600px;margin:0 auto;padding:24px;">
    <p>${escapeHtml(t.intro)}</p>
    <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:8px;">${rows}</table>
  </body>
</html>`;
}

function getOperatorRecipients(config: SmtpConfig): string[] {
  return [config.operator1, config.operator2]
    .map((address) => extractEmailAddress(address.trim()))
    .filter(Boolean);
}

export async function sendOperatorNotification(
  config: SmtpConfig,
  data: RequestFormPayload,
  pageLocale: unknown = "de"
): Promise<void> {
  if (!config.host || !config.user || !config.password || !config.from) {
    throw createError({
      statusCode: 500,
      statusMessage: "SMTP is not configured",
    });
  }

  const operatorAddresses = getOperatorRecipients(config);
  if (operatorAddresses.length === 0) {
    console.warn(
      "[email] operator notification skipped: NUXT_SMTP_OPERATOR_1/2 not configured"
    );
    return;
  }

  const transporter = buildTransporter(config);

  console.log(
    `[email] sending operator notification → ${operatorAddresses.join(", ")}`
  );
  // Drop Reply-To when it would equal a recipient, otherwise MTAs treat
  // From == To == Reply-To as an autoresponder loop and silently discard.
  const submitterEmail = data.email.toLowerCase();
  const replyTo = operatorAddresses.some(
    (address) => address.toLowerCase() === submitterEmail
  )
    ? undefined
    : data.email;
  const info = await transporter.sendMail({
    from: buildFromHeader(OPERATOR_TEMPLATE.brand, config.from),
    to: operatorAddresses,
    replyTo,
    subject: OPERATOR_TEMPLATE.subject,
    text: renderOperatorText(data, pageLocale),
    html: renderOperatorHtml(data, pageLocale),
  });
  console.log(
    `[email] operator notification sent  messageId=${info.messageId}  response=${info.response}`
  );
}
