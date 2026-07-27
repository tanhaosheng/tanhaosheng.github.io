import { a as SITE, c as __exportAll, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/privacy.astro
var privacy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Privacy,
	file: () => $$file,
	url: () => $$url
});
var $$Privacy = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Privacy Policy",
		"description": `Privacy Policy for ${SITE.name}.`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="prose"><h1>Privacy Policy</h1><p>Last updated: 2026-07-27</p><h2>Analytics</h2><p>This site uses Google Analytics and Google AdSense. These services may collect standard technical information such as your IP address, browser type, and pages visited, in order to understand traffic and serve relevant ads. You can opt out via your browser or Google's ad settings.</p><h2>Cookies</h2><p>We and our partners may use cookies to personalize content and ads. You can disable cookies in your browser; some features may be affected.</p><h2>Affiliate Links</h2><p>Some articles contain affiliate links. If you purchase through them, we may earn a commission at no extra cost to you. This does not influence our editorial coverage.</p><h2>Contact</h2><p>For privacy requests, email <a${addAttribute(`mailto:${SITE.email}`, "href")}>${SITE.email}</a>.</p></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/privacy.astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/privacy.astro";
var $$url = "/privacy.html";
//#endregion
//#region \0virtual:astro:page:src/pages/privacy@_@astro
var page = () => privacy_exports;
//#endregion
export { page };
