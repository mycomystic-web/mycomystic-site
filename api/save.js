export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { address } = await req.json();

  if (!address) {
    return new Response(JSON.stringify({ error: 'No wallet provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('✅ Received wallet:', address);

  // Simulación de guardado. No se guarda nada aún.
  return new Response(JSON.stringify({ success: true, new: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
