import { a as SITE, i as NAV, n as $$BaseHead, s as createComponent, t as $$SiteFooter } from "./SiteFooter_BKUJEopM.mjs";
import { T as createAstro, _ as addAttribute, c as renderSlot, d as renderTemplate, g as renderHead, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
//#region src/components/SiteNav.astro
createAstro("https://tanhaosheng.github.io");
var $$SiteNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteNav;
	const current = Astro.url.pathname;
	return renderTemplate`${maybeRenderHead($$result)}<nav><div class="nav-inner">${NAV.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(current.endsWith(item.href.replace("/", "")) ? "active" : "", "class")}>${item.label}</a>`)}</div></nav>`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/components/SiteNav.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://tanhaosheng.github.io");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, canonical = SITE.base_url + "/", ogType = "website", jsonld } = Astro.props;
	return renderTemplate`<html${addAttribute(SITE.lang, "lang")}><head>${renderComponent($$result, "BaseHead", $$BaseHead, {
		"title": `${title} - ${SITE.name}`,
		"description": description,
		"canonical": canonical,
		"ogType": ogType,
		"jsonld": jsonld
	})}${renderHead($$result)}</head><body>${renderComponent($$result, "SiteNav", $$SiteNav, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "SiteFooter", $$SiteFooter, {})}</body></html>`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
