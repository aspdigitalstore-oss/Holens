import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { initDatabase } from "../server/db.js";
import {
  loginAccount,
  registerAccount,
  submitContactInquiry,
  submitInquiry,
} from "../server/handlers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.post("/api/accounts/register", registerAccount);
app.post("/api/accounts/login", loginAccount);
app.post("/api/inquiries", submitInquiry);
app.post("/api/contact", submitContactInquiry);

app.use(express.static(distDir));
app.get("*", (_req, res) => res.sendFile(path.join(distDir, "index.html")));

const port = Number(process.env.PORT || 8787);

initDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Vitala inquiry API listening on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Unable to initialize inquiry database", error);
    process.exitCode = 1;
  });
