import crypto from "node:crypto";
import { promisify } from "node:util";
import {
  findAccountByEmail,
  findAccountBySession,
  insertAccount,
  insertContactInquiry,
  insertInquiry,
  insertSession,
} from "./db.js";
import { sendContactEmails, sendInquiryEmails } from "./email.js";

const scrypt = promisify(crypto.scrypt);
const MIN_ORDER_QUANTITY = 2000;
const INQUIRY_STATUS = "Inquiry Received";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function makeReference(prefix = "VTL") {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${date}-${code}`;
}

function accountResponse(row, sessionToken) {
  return {
    id: row.id,
    company: {
      companyName: row.company_name,
      contactPerson: row.contact_person,
      email: row.email,
      phoneNumber: row.phone_number,
      country: row.country,
      businessType: row.business_type,
    },
    createdAt: new Date(row.created_at).toISOString(),
    sessionToken,
  };
}

function validateCompanyDetails(rawDetails) {
  const details = {
    companyName: cleanString(rawDetails?.companyName, 160),
    contactPerson: cleanString(rawDetails?.contactPerson, 160),
    email: cleanString(rawDetails?.email, 254).toLowerCase(),
    phoneNumber: cleanString(rawDetails?.phoneNumber, 80),
    country: cleanString(rawDetails?.country, 100),
    businessType: cleanString(rawDetails?.businessType, 100),
  };

  const missing = Object.entries(details)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) throw new Error(`Missing required fields: ${missing.join(", ")}`);
  if (!EMAIL_PATTERN.test(details.email)) throw new Error("Enter a valid email address.");
  return details;
}

async function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const derivedKey = await scrypt(password, salt, 64);
  return { hash: Buffer.from(derivedKey).toString("hex"), salt };
}

async function passwordMatches(password, salt, expectedHash) {
  const { hash } = await hashPassword(password, salt);
  const actual = Buffer.from(hash, "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export async function registerAccount(req, res) {
  try {
    const details = validateCompanyDetails(req.body?.details);
    const password = cleanString(req.body?.password, 200);
    if (password.length < 8)
      return res.status(400).json({ error: "Password must be at least 8 characters." });

    const existing = await findAccountByEmail(details.email);
    if (existing)
      return res
        .status(409)
        .json({ error: "An account already exists for this email. Please log in." });

    const id = `acc_${crypto.randomUUID()}`;
    const createdAt = new Date().toISOString();
    const passwordData = await hashPassword(password);
    await insertAccount({
      id,
      ...details,
      passwordHash: passwordData.hash,
      passwordSalt: passwordData.salt,
      createdAt,
    });

    const sessionToken = crypto.randomBytes(32).toString("hex");
    await insertSession(sessionToken, id, createdAt);
    const row = await findAccountByEmail(details.email);
    return res.status(201).json({ account: accountResponse(row, sessionToken) });
  } catch (error) {
    console.error("Account registration error", error);
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unable to create account." });
  }
}

export async function loginAccount(req, res) {
  try {
    const email = cleanString(req.body?.email, 254).toLowerCase();
    const password = cleanString(req.body?.password, 200);
    if (!EMAIL_PATTERN.test(email) || !password)
      return res.status(400).json({ error: "Email and password are required." });

    const row = await findAccountByEmail(email);
    if (!row || !(await passwordMatches(password, row.password_salt, row.password_hash))) {
      return res.status(401).json({ error: "Email or password is incorrect." });
    }

    const sessionToken = crypto.randomBytes(32).toString("hex");
    await insertSession(sessionToken, row.id, new Date().toISOString());
    return res.json({ account: accountResponse(row, sessionToken) });
  } catch (error) {
    console.error("Account login error", error);
    return res.status(500).json({ error: "Unable to log in." });
  }
}

function normalizeItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0)
    throw new Error("Add at least one product to your inquiry.");

  return rawItems.map((item) => {
    const quantity = Math.round(Number(item.quantity));
    if (!Number.isFinite(quantity) || quantity < 1)
      throw new Error("Every product quantity must be at least 1 unit.");

    const normalized = {
      productId: cleanString(item.productId, 160),
      brandSlug: cleanString(item.brandSlug, 160),
      brandName: cleanString(item.brandName, 160),
      category: cleanString(item.category, 160),
      productName: cleanString(item.productName, 200),
      quantity,
    };
    if (!normalized.productId || !normalized.brandName || !normalized.productName)
      throw new Error("A product in the inquiry is incomplete.");
    return normalized;
  });
}

export async function submitInquiry(req, res) {
  try {
    const detailsBase = validateCompanyDetails(req.body?.details);
    const notes = cleanString(req.body?.details?.notes, 4000);
    if (!notes) return res.status(400).json({ error: "Notes are required." });

    const items = normalizeItems(req.body?.items);
    const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalUnits < MIN_ORDER_QUANTITY) {
      return res
        .status(400)
        .json({ error: `Minimum Order Quantity (MOQ) is ${MIN_ORDER_QUANTITY} units.` });
    }

    let accountId = null;
    const authHeader = cleanString(req.headers.authorization, 500);
    if (authHeader.startsWith("Bearer ")) {
      const account = await findAccountBySession(authHeader.slice(7));
      accountId = account?.id ?? null;
    }

    const inquiry = {
      reference: makeReference("VTL"),
      status: INQUIRY_STATUS,
      accountId,
      details: { ...detailsBase, notes },
      items,
      totalUnits,
      createdAt: new Date().toISOString(),
    };

    await insertInquiry(inquiry);
    const emailStatus = await sendInquiryEmails(inquiry);

    return res.status(201).json({
      ok: true,
      reference: inquiry.reference,
      status: inquiry.status,
      ...emailStatus,
    });
  } catch (error) {
    console.error("Inquiry submission error", error);
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unable to submit inquiry." });
  }
}

export async function submitContactInquiry(req, res) {
  try {
    const details = validateCompanyDetails(req.body);
    const notes = cleanString(req.body?.notes, 4000);
    if (!notes) return res.status(400).json({ error: "Tell us more about your inquiry." });

    const inquiry = {
      reference: makeReference("VTL-CONTACT"),
      ...details,
      brand: cleanString(req.body?.brand, 160),
      notes,
      createdAt: new Date().toISOString(),
    };

    await insertContactInquiry(inquiry);
    await sendContactEmails(inquiry);
    return res.status(201).json({ ok: true, reference: inquiry.reference });
  } catch (error) {
    console.error("Contact inquiry error", error);
    return res
      .status(400)
      .json({ error: error instanceof Error ? error.message : "Unable to submit inquiry." });
  }
}
