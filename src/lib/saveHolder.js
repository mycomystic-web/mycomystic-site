import { supabase } from "./supabase";

export async function saveHolder(wallet) {
  const { error } = await supabase
    .from("titulares")
    .insert([
      {
        billetera: wallet,
        recopilación: "MycoMystic Hub",
      },
    ]);

  if (error) {
    console.error(error);
  } else {
    console.log("✅ Holder guardado");
  }
}