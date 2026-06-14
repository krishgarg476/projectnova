import { o as __toESM } from "../_runtime.mjs";
import { c as lazyRouteComponent, d as Link, l as createFileRoute, m as useRouter, n as Scripts, o as createRouter, r as HeadContent, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route$14 } from "./routes-YPbp0ePt.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-s93J6UGA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ChpqLcqO.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Now is an AI-powered desktop web app that reimagines urgent shopping, mirroring Amazon's design."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Now is an AI-powered desktop web app that reimagines urgent shopping, mirroring Amazon's design."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Lovable App"
			},
			{
				name: "twitter:description",
				content: "Now is an AI-powered desktop web app that reimagines urgent shopping, mirroring Amazon's design."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b04243b5-345d-4d38-97b5-b3c7d7ce916f/id-preview-a37459be--7377137c-ba51-40c9-ab42-344b19c08817.lovable.app-1781296973322.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b04243b5-345d-4d38-97b5-b3c7d7ce916f/id-preview-a37459be--7377137c-ba51-40c9-ab42-344b19c08817.lovable.app-1781296973322.png"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$12 = () => import("./voice-B9LEDwtY.mjs");
var Route$12 = createFileRoute("/voice")({
	head: () => ({ meta: [{ title: "Voice Mode — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./results-Cg06RZq2.mjs");
var Route$11 = createFileRoute("/results")({
	head: () => ({ meta: [{ title: "AI Council — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./pulse-D1RnTa98.mjs");
var Route$10 = createFileRoute("/pulse")({
	head: () => ({ meta: [{ title: "Predictive Pulse — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./profile-C641H8nO.mjs");
var Route$9 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Your Account — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./fridge-whisperer-Bi0U25K3.mjs");
var Route$8 = createFileRoute("/fridge-whisperer")({
	head: () => ({ meta: [{ title: "Fridge Whisperer — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./eco-impact-B0jkUbc6.mjs");
var Route$7 = createFileRoute("/eco-impact")({
	head: () => ({ meta: [{ title: "Eco Impact — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./crisis-y9kjOPty.mjs");
var Route$6 = createFileRoute("/crisis")({
	head: () => ({ meta: [{ title: "Crisis Mode — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./checkout-DeS0Ef3b.mjs");
var Route$5 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./chat-Dd_0JViS.mjs");
var Route$4 = createFileRoute("/chat")({
	head: () => ({ meta: [{ title: "Chat Shopping — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./cart-CmY5nony.mjs");
var Route$3 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Cart — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./tracking._orderId-G4Yb8qzg.mjs");
var Route$2 = createFileRoute("/tracking/$orderId")({
	head: () => ({ meta: [{ title: "Order Tracking — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./group.demo-DduPlA6v.mjs");
var Route$1 = createFileRoute("/group/demo")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Now Squad — Group Ordering" }] })
});
var $$splitComponentImporter = () => import("./group._cartId-CBkClJZh.mjs");
var Route = createFileRoute("/group/$cartId")({
	head: () => ({ meta: [{ title: "Group Cart — Now" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var VoiceRoute = Route$12.update({
	id: "/voice",
	path: "/voice",
	getParentRoute: () => Route$13
});
var ResultsRoute = Route$11.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => Route$13
});
var PulseRoute = Route$10.update({
	id: "/pulse",
	path: "/pulse",
	getParentRoute: () => Route$13
});
var ProfileRoute = Route$9.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$13
});
var FridgeWhispererRoute = Route$8.update({
	id: "/fridge-whisperer",
	path: "/fridge-whisperer",
	getParentRoute: () => Route$13
});
var EcoImpactRoute = Route$7.update({
	id: "/eco-impact",
	path: "/eco-impact",
	getParentRoute: () => Route$13
});
var CrisisRoute = Route$6.update({
	id: "/crisis",
	path: "/crisis",
	getParentRoute: () => Route$13
});
var CheckoutRoute = Route$5.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$13
});
var ChatRoute = Route$4.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$13
});
var CartRoute = Route$3.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var TrackingOrderIdRoute = Route$2.update({
	id: "/tracking/$orderId",
	path: "/tracking/$orderId",
	getParentRoute: () => Route$13
});
var GroupDemoRoute = Route$1.update({
	id: "/group/demo",
	path: "/group/demo",
	getParentRoute: () => Route$13
});
var rootRouteChildren = {
	IndexRoute,
	CartRoute,
	ChatRoute,
	CheckoutRoute,
	CrisisRoute,
	EcoImpactRoute,
	FridgeWhispererRoute,
	ProfileRoute,
	PulseRoute,
	ResultsRoute,
	VoiceRoute,
	GroupCartIdRoute: Route.update({
		id: "/group/$cartId",
		path: "/group/$cartId",
		getParentRoute: () => Route$13
	}),
	GroupDemoRoute,
	TrackingOrderIdRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
