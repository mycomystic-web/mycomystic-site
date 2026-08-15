import { supabase } from "./supabase";

export async function saveWhitelist(address) {
  if (!address) {
    return { error: new Error("Wallet address is required") };
  }

  const wallet = address.toLowerCase();

  const { data, error } = await supabase
    .from("whitelist")
    .insert([
      {
        wallet_address: wallet,
      },
    ])
    .select();

  console.log("WHITELIST DATA:", data);
  console.log("WHITELIST ERROR:", error);

  return { data, error };
}