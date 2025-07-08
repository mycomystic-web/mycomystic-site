export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'No wallet address provided' });
  }

  try {
    // Simular base de datos: archivo temporal (puedes cambiar por DB real después)
    const fs = await import('fs/promises');
    const filePath = './raffle-data/mystic-participants.json';

    let data = [];

    try {
      const file = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(file);
    } catch (e) {
      console.log('Creating new file...');
    }

    if (!data.includes(address)) {
      data.push(address);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return res.status(200).json({ success: true, new: true });
    }

    return res.status(200).json({ success: true, new: false });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
