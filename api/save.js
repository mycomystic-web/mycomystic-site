import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Leer dirección de wallet del cuerpo
    const { address } = req.body;

    if (!address) {
      res.status(400).json({ error: 'No wallet provided' });
      return;
    }

    // Importar claves desde variables de entorno
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Auth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar si la wallet ya está registrada
    const read = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:A',
    });

    const rows = read.data.values || [];
    const exists = rows.some(row => row[0] === address);

    if (exists) {
      return res.status(200).json({ success: true, new: false });
    }

    // Agregar nueva wallet + fecha
    const now = new Date().toISOString().split('T')[0];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:B',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[address, now]],
      },
    });

    console.log('✅ Wallet saved to Google Sheets:', address);
    res.status(200).json({ success: true, new: true });

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
