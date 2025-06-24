export async function saveWalletIfNew(address) {
  try {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(data.new ? '✅ Wallet saved' : 'ℹ️ Wallet already registered');
    } else {
      console.error('❌ Save failed', data.error);
    }
  } catch (err) {
    console.error('❌ Network error saving wallet:', err);
  }
}
