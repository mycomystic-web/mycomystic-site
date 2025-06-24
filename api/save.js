export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = "";

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const { address } = data;

      if (!address) {
        res.status(400).json({ error: 'No wallet provided' });
        return;
      }

      console.log("✅ Wallet received:", address);

      // Simulación de guardado
      res.status(200).json({ success: true, new: true });
    } catch (error) {
      console.error('❌ Parse error:', error);
      res.status(500).json({ error: 'Invalid JSON' });
    }
  });
}
