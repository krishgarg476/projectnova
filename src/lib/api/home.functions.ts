import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export const getHomeProductsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

    // Fetch deals (we'll just take 12 random/first products for deals)
    const { data: deals, error: dealsErr } = await supabase
      .from("products")
      .select("*")
      .limit(12);

    // Fetch crisis essentials (we'll fetch 6 products that might fit emergency)
    // For now we'll just take 6 products ordered differently
    const { data: crisis, error: crisisErr } = await supabase
      .from("products")
      .select("*")
      .order("price", { ascending: false })
      .limit(6);

    if (dealsErr) console.error("Error fetching deals:", dealsErr);
    if (crisisErr) console.error("Error fetching crisis products:", crisisErr);

    return {
      deals: deals || [],
      crisis: crisis || []
    };
  });
