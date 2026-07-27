import { c as __exportAll, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Page Not Found",
		"description": "The page you were looking for could not be found."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="prose" style="text-align:center;padding:60px 20px;"><h1>404 — Page Not Found</h1><p>The page you were looking for doesn't exist or may have moved.</p><p><a href="/index.html">← Back to Home</a></p></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/404.astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/404.astro";
var $$url = "/404.html";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
