const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "partners@vitala.global";
const FROM_EMAIL = process.env.FROM_EMAIL || ADMIN_EMAIL;
const COMPANY_NAME = "Vitala Global Holdings";
const COMPANY_ADDRESS = "12 Rue du Rhone, 1204 Geneva, Switzerland";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail({ to, subject, text, html }) {
  if (process.env.SENDGRID_API_KEY) {
    const sendgridModule = await import("@sendgrid/mail");
    const sendgrid = sendgridModule.default ?? sendgridModule;
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    await sendgrid.send({ to, from: FROM_EMAIL, subject, text, html });
    return true;
  }

  if (process.env.SMTP_HOST) {
    const nodemailerModule = await import("nodemailer");
    const nodemailer = nodemailerModule.default ?? nodemailerModule;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    await transporter.sendMail({ from: FROM_EMAIL, to, subject, text, html });
    return true;
  }

  console.log("Email delivery is not configured:", { to, subject, text });
  return false;
}

function productLines(items) {
  return items
    .map(
      (item) => `${item.brandName} / ${item.productName}: ${item.quantity.toLocaleString()} units`,
    )
    .join("\n");
}

function productRows(items) {
  return items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(item.brandName)} / ${escapeHtml(item.productName)}</td><td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">${escapeHtml(item.quantity.toLocaleString())}</td></tr>`,
    )
    .join("");
}

export async function sendInquiryEmails(inquiry) {
  const adminSubject = `Wholesale inquiry ${inquiry.reference} - ${inquiry.details.companyName}`;
  const adminText = `A new wholesale inquiry has been received.

Reference: ${inquiry.reference}
Status: ${inquiry.status}

Customer details
Company: ${inquiry.details.companyName}
Contact person: ${inquiry.details.contactPerson}
Email: ${inquiry.details.email}
Phone: ${inquiry.details.phoneNumber}
Country: ${inquiry.details.country}
Business type: ${inquiry.details.businessType}

Products requested
${productLines(inquiry.items)}

Total units: ${inquiry.totalUnits.toLocaleString()}

Notes
${inquiry.details.notes}`;

  const adminHtml = `
    <h1>New wholesale inquiry</h1>
    <p><strong>Reference:</strong> ${escapeHtml(inquiry.reference)}<br><strong>Status:</strong> ${escapeHtml(inquiry.status)}</p>
    <h2>Customer details</h2>
    <p>
      <strong>Company:</strong> ${escapeHtml(inquiry.details.companyName)}<br>
      <strong>Contact person:</strong> ${escapeHtml(inquiry.details.contactPerson)}<br>
      <strong>Email:</strong> ${escapeHtml(inquiry.details.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(inquiry.details.phoneNumber)}<br>
      <strong>Country:</strong> ${escapeHtml(inquiry.details.country)}<br>
      <strong>Business type:</strong> ${escapeHtml(inquiry.details.businessType)}
    </p>
    <h2>Products requested</h2>
    <table style="border-collapse:collapse;width:100%"><thead><tr><th style="padding:8px;text-align:left;border-bottom:2px solid #222">Product</th><th style="padding:8px;text-align:right;border-bottom:2px solid #222">Quantity</th></tr></thead><tbody>${productRows(inquiry.items)}</tbody></table>
    <p><strong>Total units:</strong> ${escapeHtml(inquiry.totalUnits.toLocaleString())}</p>
    <h2>Notes</h2>
    <p>${escapeHtml(inquiry.details.notes)}</p>
  `;

  const customerSubject = `We received your Vitala Global inquiry ${inquiry.reference}`;
  const customerText = `Thank you for your wholesale inquiry.

Your inquiry reference is ${inquiry.reference}.
Status: ${inquiry.status}
Total requested units: ${inquiry.totalUnits.toLocaleString()}

Our partnership team will review product availability, commercial terms, documentation and shipping requirements before contacting you. We will prepare an invoice and follow up with payment details after your checkout is received.

${COMPANY_NAME}
${ADMIN_EMAIL}
${COMPANY_ADDRESS}`;

  const customerHtml = `
    <h1>Thank you for your wholesale inquiry.</h1>
    <p>Your inquiry reference is <strong>${escapeHtml(inquiry.reference)}</strong>.</p>
    <p><strong>Status:</strong> ${escapeHtml(inquiry.status)}<br><strong>Total requested units:</strong> ${escapeHtml(inquiry.totalUnits.toLocaleString())}</p>
    <p>Our partnership team will review product availability, commercial terms, documentation and shipping requirements before contacting you. We will prepare an invoice and follow up with payment details after your checkout is received.</p>
    <p><strong>${COMPANY_NAME}</strong><br>${ADMIN_EMAIL}<br>${COMPANY_ADDRESS}</p>
  `;

  const results = await Promise.allSettled([
    sendEmail({ to: ADMIN_EMAIL, subject: adminSubject, text: adminText, html: adminHtml }),
    sendEmail({
      to: inquiry.details.email,
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
    }),
  ]);

  return {
    adminEmailSent: results[0].status === "fulfilled" && results[0].value,
    customerEmailSent: results[1].status === "fulfilled" && results[1].value,
  };
}

export async function sendContactEmails(inquiry) {
  const subject = `Wholesale contact inquiry ${inquiry.reference} - ${inquiry.companyName}`;
  const text = `A wholesale contact inquiry has been received.

Reference: ${inquiry.reference}
Company: ${inquiry.companyName}
Contact person: ${inquiry.contactPerson}
Email: ${inquiry.email}
Phone: ${inquiry.phoneNumber}
Country: ${inquiry.country}
Business type: ${inquiry.businessType}
Brand: ${inquiry.brand || "Not specified"}

Notes:
${inquiry.notes}`;

  const html = `<h1>Wholesale contact inquiry</h1><p><strong>Reference:</strong> ${escapeHtml(inquiry.reference)}<br><strong>Company:</strong> ${escapeHtml(inquiry.companyName)}<br><strong>Contact person:</strong> ${escapeHtml(inquiry.contactPerson)}<br><strong>Email:</strong> ${escapeHtml(inquiry.email)}<br><strong>Phone:</strong> ${escapeHtml(inquiry.phoneNumber)}<br><strong>Country:</strong> ${escapeHtml(inquiry.country)}<br><strong>Business type:</strong> ${escapeHtml(inquiry.businessType)}<br><strong>Brand:</strong> ${escapeHtml(inquiry.brand || "Not specified")}</p><h2>Notes</h2><p>${escapeHtml(inquiry.notes)}</p>`;

  const customerText = `Thank you for contacting ${COMPANY_NAME}.

Your wholesale contact inquiry reference is ${inquiry.reference}.
Our partnership team will reply within 1-2 business days.

${COMPANY_NAME}
${ADMIN_EMAIL}
${COMPANY_ADDRESS}`;

  const customerHtml = `<h1>Thank you for contacting ${COMPANY_NAME}.</h1><p>Your wholesale contact inquiry reference is <strong>${escapeHtml(inquiry.reference)}</strong>.</p><p>Our partnership team will reply within 1-2 business days.</p><p><strong>${COMPANY_NAME}</strong><br>${ADMIN_EMAIL}<br>${COMPANY_ADDRESS}</p>`;

  await Promise.allSettled([
    sendEmail({ to: ADMIN_EMAIL, subject, text, html }),
    sendEmail({
      to: inquiry.email,
      subject: `We received your Vitala Global inquiry ${inquiry.reference}`,
      text: customerText,
      html: customerHtml,
    }),
  ]);
}
