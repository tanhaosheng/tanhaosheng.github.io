import { a as SITE, c as __exportAll, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "About",
		"description": `About ${SITE.name} — practical AI, tech, science and business guides for real people.`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="prose"><h1>About ${SITE.name}</h1><p>${SITE.name} is an independent, reader-focused guide to artificial intelligence, technology, science and business tools. We research publicly available information, official documentation and community feedback to help you choose and use the right tools — without the hype.</p><h2>Our editorial principles</h2><ul><li><strong>Honesty first.</strong> We clearly state what we verified versus what comes from third-party or official sources. We never claim hands-on testing we did not perform.</li><li><strong>Cited, verifiable data.</strong> Performance figures, pricing and specs link back to their original source.</li><li><strong>Independent.</strong> Some pages contain affiliate links; all reviews reflect our own assessment.</li></ul><h2>Contact</h2><p>Questions, corrections or partnership inquiries: <a${addAttribute(`mailto:${SITE.email}`, "href")}>${SITE.email}</a></p></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/about.astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/about.astro";
var $$url = "/about.html";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
