import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { t as createSsrRpc } from "./createSsrRpc-OjCiqqCU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-YPbp0ePt.js
var getHomeProductsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("ca4432ab0a73eaba3d42d153beb2a5536733720b34444923de7a8a99b8820919"));
var $$splitComponentImporter = () => import("./routes-CAN4nILx.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Now — AI-Powered Urgent Shopping on Amazon" }, {
		name: "description",
		content: "Describe what's happening. Now's AI Council builds your cart in seconds."
	}] }),
	loader: async () => {
		return await getHomeProductsFn();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
