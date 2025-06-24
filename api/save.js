export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { address } = await req.json(); // En Vercel edge runtime se usa req.json()
    if (!address) {
      return new Response(JSON.stringify({ error: 'No wallet provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log("✅ Wallet received:", address);

    // Simulamos guardado exitoso (sin usar fs)
    return new Response(JSON.stringify({ success: true, new: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("❌ API error:", err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
