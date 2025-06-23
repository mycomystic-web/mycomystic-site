import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { wallet } = req.body;
  if (!wallet) {
    return res.status(400).json({ error: "Falta dirección de wallet" });
  }

  const today = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
  const filePath = path.join(process.cwd(), "raffle-data", "participants.json");

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data[today]) {
      data[today] = [];
    }

    if (data[today].includes(wallet.toLowerCase())) {
      return res.status(200).json({ message: "Ya estás participando hoy" });
    }

    data[today].push(wallet.toLowerCase());
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: "Participación registrada" });
  } catch (error) {
    console.error("Error al registrar participación:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
