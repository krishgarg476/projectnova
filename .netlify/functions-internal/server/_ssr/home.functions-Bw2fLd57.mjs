import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { t as createServerRpc } from "./createServerRpc-BWrlMzYt.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home.functions-Bw2fLd57.js
var getHomeProductsFn_createServerFn_handler = createServerRpc({
	id: "ca4432ab0a73eaba3d42d153beb2a5536733720b34444923de7a8a99b8820919",
	name: "getHomeProductsFn",
	filename: "src/lib/api/home.functions.ts"
}, (opts) => getHomeProductsFn.__executeServer(opts));
var getHomeProductsFn = createServerFn({ method: "GET" }).handler(getHomeProductsFn_createServerFn_handler, async () => {
	const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
	const { data: deals, error: dealsErr } = await supabase.from("products").select("*").limit(12);
	const { data: crisis, error: crisisErr } = await supabase.from("products").select("*").order("price", { ascending: false }).limit(6);
	if (dealsErr) console.error("Error fetching deals:", dealsErr);
	if (crisisErr) console.error("Error fetching crisis products:", crisisErr);
	return {
		deals: deals || [],
		crisis: crisis || []
	};
});
//#endregion
export { getHomeProductsFn_createServerFn_handler };
