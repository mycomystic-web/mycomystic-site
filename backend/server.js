// backend/server.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'participants.json');

app.use(cors());
app.use(express.json());

// Cargar o inicializar el archivo JSON
function loadParticipants() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function saveParticipants(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Ruta para registrar participación
app.post('/enter', (req, res) => {
  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: 'No wallet provided' });

  const today = new Date().toISOString().slice(0, 10);
  const data = loadParticipants();

  if (!data[today]) data[today] = [];

  const alreadyEntered = data[today].some(
    (w) => w.toLowerCase() === wallet.toLowerCase()
  );

  if (alreadyEntered) {
    return res.status(200).json({ message: 'Already entered' });
  }

  data[today].push(wallet);
  saveParticipants(data);

  res.status(200).json({ message: 'Successfully entered' });
});

// Ruta para ver participantes del día
app.get('/participants/:date', (req, res) => {
  const { date } = req.params;
  const data = loadParticipants();
  const participants = data[date] || [];
  res.json({ participants });
});

app.listen(PORT, () => {
  console.log(`✅ Raffle backend listening on http://localhost:${PORT}`);
});
