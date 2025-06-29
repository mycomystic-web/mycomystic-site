import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ success: false, error: 'Wallet address is required' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 1️⃣ Lee la columna A completa
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: '1JiPzgHLzc2Y8UiPdYL82S4ls-3rq9NtOEk289zrdAO8',
      range: 'Hoja 1!A:A',
    });

    const existingWallets = existing.data.values
      ? existing.data.values.flat().map(w => w.toLowerCase())
      : [];

    // 2️⃣ Si ya existe, responde sin guardar
    if (existingWallets.includes(wallet.toLowerCase())) {
      return res.status(200).json({
        success: true,
        new: false,
        message: 'Wallet already registered',
      });
    }

    // 3️⃣ Si no existe, guarda
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: '1JiPzgHLzc2Y8UiPdYL82S4ls-3rq9NtOEk289zrdAO8',
      range: 'Hoja 1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[wallet, new Date().toLocaleString()]],
      },
    });

    return res.status(200).json({
      success: true,
      new: true,
      message: 'Wallet saved',
      data: response.data,
    });

  } catch (error) {
    console.error('GOOGLE API ERROR:', error);
    return res.status(500).json({ success: false, error: 'Error saving wallet' });
  }
}
