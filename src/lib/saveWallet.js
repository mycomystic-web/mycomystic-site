import { supabase } from "./supabase";

export async function saveWallet(address, collection = "MycoMystic") {

  console.log("Intentando guardar:", address);

  // Buscar si ya existe
  const { data: existing } = await supabase
    .from("holders")
    .select("id")
    .eq("wallet", address)
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("⚠️ Wallet ya registrada");
    return { exists: true };
  }

  // Guardar solo si no existe
  const { data, error } = await supabase
    .from("holders")
    .insert([
      {
        wallet: address,
        collection,
      },
    ])
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  return { data, error };
}