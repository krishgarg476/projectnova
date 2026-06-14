//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DEsES0KO.js
var manifest = {
	"ca4432ab0a73eaba3d42d153beb2a5536733720b34444923de7a8a99b8820919": {
		functionName: "getHomeProductsFn_createServerFn_handler",
		importer: () => import("./_ssr/home.functions-Bw2fLd57.mjs")
	},
	"46dedc7adf69af42a94c1891de95fe897d68bca2ad872d5ba30a55831ac24d9e": {
		functionName: "processImageFn_createServerFn_handler",
		importer: () => import("./_ssr/vision.functions-DOLHwdww.mjs")
	},
	"795a9d86443c6458c525f1171550f3b4804028944c119172bd216b69ef108a64": {
		functionName: "generateCartFn_createServerFn_handler",
		importer: () => import("./_ssr/agent.functions-ONGg1PbP.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
