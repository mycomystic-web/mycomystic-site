const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3002;

const FILE = path.join(__dirname, "wallets.txt");

// CORS simple
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

// 👉 ROOT (para evitar "Cannot GET /")
app.get("/", (req, res) => {
  res.send("SERVER FUNCIONANDO 🔥");
});

// 👉 GUARDAR (sin duplicados)
app.post("/save", (req, res) => {
  const wallet = (req.body.wallet || "").toLowerCase().trim();

  if (!wallet) {
    return res.status(400).json({ error: "no wallet" });
  }

  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "");

  const data = fs.readFileSync(FILE, "utf-8");
  const wallets = data
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w !== "");

  if (wallets.includes(wallet)) {
    return res.json({ ok: true, duplicate: true });
  }

  fs.appendFileSync(FILE, wallet + "\n");
  console.log("guardado:", wallet);

  res.json({ ok: true, duplicate: false });
});

// 👉 CONTADOR
app.get("/count", (req, res) => {
  if (!fs.existsSync(FILE)) {
    return res.json({ total: 0 });
  }

  const data = fs.readFileSync(FILE, "utf-8");
  const wallets = data
    .split("\n")
    .map((w) => w.trim())
    .filter((w) => w !== "");

  res.json({ total: wallets.length });
});

app.listen(PORT, () => {
  console.log(`🔥 SERVER VIVO en http://localhost:${PORT}`);
});