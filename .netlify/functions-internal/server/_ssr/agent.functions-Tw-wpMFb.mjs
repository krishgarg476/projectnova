import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-OjCiqqCU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent.functions-Tw-wpMFb.js
var inputSchema = objectType({
	query: stringType(),
	dietary: arrayType(stringType()).optional()
});
var generateCartFn = createServerFn({ method: "POST" }).inputValidator((data) => inputSchema.parse(data)).handler(createSsrRpc("795a9d86443c6458c525f1171550f3b4804028944c119172bd216b69ef108a64"));
//#endregion
export { generateCartFn };
