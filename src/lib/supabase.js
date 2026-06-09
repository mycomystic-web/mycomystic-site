import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uyftcwzoevdqjtxkmvpm.supabase.co";

const supabaseKey =
"sb_publishable_4Prq-Snb0FaZzkWsAijGFg_WDi-swT2";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);