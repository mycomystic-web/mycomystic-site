export async function saveWalletIfNew(address) {
  try {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: address }), // 👈 Correcto
    });

    const data = await res.json();
    if (data.success) {
      console.log(data.new ? '✅ Wallet saved' : 'ℹ️ Already registered');
    } else {
      console.error('❌ Save error:', data.error);
    }
  } catch (err) {
    console.error('❌ Network error saving wallet:', err);
  }
}
