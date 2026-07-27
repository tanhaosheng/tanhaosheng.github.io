import { a as SITE, c as __exportAll, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Contact",
		"description": `Contact ${SITE.name}.`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="prose"><h1>Contact Us</h1><p>We'd love to hear from you — corrections, suggestions, or collaboration ideas are all welcome.</p><ul><li><strong>Email:</strong> <a${addAttribute(`mailto:${SITE.email}`, "href")}>${SITE.email}</a></li><li><strong>News tips:</strong> send us a link and we'll review it for our news feed.</li></ul><p>We aim to respond within a few business days.</p></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/contact.astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/contact.astro";
var $$url = "/contact.html";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
