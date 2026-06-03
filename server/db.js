import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localDataDir = path.resolve(__dirname, "../data");
const sqlitePath = process.env.VERCEL
  ? path.join("/tmp", "vitala.sqlite")
  : path.join(localDataDir, "vitala.sqlite");

let sqlite;
let postgresPool;
let initialization;

function usingPostgres() {
  return Boolean(process.env.DATABASE_URL);
}

async function getPostgresPool() {
  if (!postgresPool) {
    const { Pool } = await import("pg");
    postgresPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return postgresPool;
}

function getSqlite() {
  if (!sqlite) {
    fs.mkdirSync(path.dirname(sqlitePath), { recursive: true });
    sqlite = new DatabaseSync(sqlitePath);
    sqlite.exec("PRAGMA journal_mode = WAL;");
  }
  return sqlite;
}

export async function initDatabase() {
  if (initialization) return initialization;

  initialization = usingPostgres() ? initPostgres() : initSqlite();
  return initialization;
}

async function initPostgres() {
  const pool = await getPostgresPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      reference TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      account_id TEXT,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      notes TEXT NOT NULL,
      items_json JSONB NOT NULL,
      total_units INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_inquiries (
      reference TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      brand TEXT,
      notes TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );
  `);
}

async function initSqlite() {
  const database = getSqlite();
  database.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(id)
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      reference TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      account_id TEXT,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      notes TEXT NOT NULL,
      items_json TEXT NOT NULL,
      total_units INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_inquiries (
      reference TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      country TEXT NOT NULL,
      business_type TEXT NOT NULL,
      brand TEXT,
      notes TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

export async function findAccountByEmail(email) {
  await initDatabase();
  if (usingPostgres()) {
    const pool = await getPostgresPool();
    const result = await pool.query("SELECT * FROM accounts WHERE email = $1 LIMIT 1", [email]);
    return result.rows[0] ?? null;
  }
  return getSqlite().prepare("SELECT * FROM accounts WHERE email = ? LIMIT 1").get(email) ?? null;
}

export async function insertAccount(account) {
  await initDatabase();
  const values = [
    account.id,
    account.companyName,
    account.contactPerson,
    account.email,
    account.phoneNumber,
    account.country,
    account.businessType,
    account.passwordHash,
    account.passwordSalt,
    account.createdAt,
  ];

  if (usingPostgres()) {
    const pool = await getPostgresPool();
    await pool.query(
      `INSERT INTO accounts
        (id, company_name, contact_person, email, phone_number, country, business_type, password_hash, password_salt, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      values,
    );
    return;
  }

  getSqlite()
    .prepare(
      `INSERT INTO accounts
        (id, company_name, contact_person, email, phone_number, country, business_type, password_hash, password_salt, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
    )
    .run(...values);
}

export async function insertSession(token, accountId, createdAt) {
  await initDatabase();
  if (usingPostgres()) {
    const pool = await getPostgresPool();
    await pool.query("INSERT INTO sessions (token, account_id, created_at) VALUES ($1,$2,$3)", [
      token,
      accountId,
      createdAt,
    ]);
    return;
  }
  getSqlite()
    .prepare("INSERT INTO sessions (token, account_id, created_at) VALUES (?,?,?)")
    .run(token, accountId, createdAt);
}

export async function findAccountBySession(token) {
  await initDatabase();
  if (usingPostgres()) {
    const pool = await getPostgresPool();
    const result = await pool.query(
      `SELECT accounts.* FROM accounts
       INNER JOIN sessions ON sessions.account_id = accounts.id
       WHERE sessions.token = $1 LIMIT 1`,
      [token],
    );
    return result.rows[0] ?? null;
  }
  return (
    getSqlite()
      .prepare(
        `SELECT accounts.* FROM accounts
         INNER JOIN sessions ON sessions.account_id = accounts.id
         WHERE sessions.token = ? LIMIT 1`,
      )
      .get(token) ?? null
  );
}

export async function insertInquiry(inquiry) {
  await initDatabase();
  const values = [
    inquiry.reference,
    inquiry.status,
    inquiry.accountId || null,
    inquiry.details.companyName,
    inquiry.details.contactPerson,
    inquiry.details.email,
    inquiry.details.phoneNumber,
    inquiry.details.country,
    inquiry.details.businessType,
    inquiry.details.notes,
    JSON.stringify(inquiry.items),
    inquiry.totalUnits,
    inquiry.createdAt,
  ];

  if (usingPostgres()) {
    const pool = await getPostgresPool();
    await pool.query(
      `INSERT INTO inquiries
        (reference, status, account_id, company_name, contact_person, email, phone_number, country, business_type, notes, items_json, total_units, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      values,
    );
    return;
  }

  getSqlite()
    .prepare(
      `INSERT INTO inquiries
        (reference, status, account_id, company_name, contact_person, email, phone_number, country, business_type, notes, items_json, total_units, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    )
    .run(...values);
}

export async function insertContactInquiry(inquiry) {
  await initDatabase();
  const values = [
    inquiry.reference,
    inquiry.companyName,
    inquiry.contactPerson,
    inquiry.email,
    inquiry.phoneNumber,
    inquiry.country,
    inquiry.businessType,
    inquiry.brand || null,
    inquiry.notes,
    inquiry.createdAt,
  ];

  if (usingPostgres()) {
    const pool = await getPostgresPool();
    await pool.query(
      `INSERT INTO contact_inquiries
        (reference, company_name, contact_person, email, phone_number, country, business_type, brand, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      values,
    );
    return;
  }

  getSqlite()
    .prepare(
      `INSERT INTO contact_inquiries
        (reference, company_name, contact_person, email, phone_number, country, business_type, brand, notes, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
    )
    .run(...values);
}
