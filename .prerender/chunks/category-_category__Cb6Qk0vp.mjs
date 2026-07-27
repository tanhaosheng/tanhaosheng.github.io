import { a as SITE, c as __exportAll, o as domainMeta, s as createComponent } from "./SiteFooter_BKUJEopM.mjs";
import { T as createAstro, _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as getCollection } from "./_astro_content_BlEAWu5F.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CntBSbCY.mjs";
//#region src/pages/category-[category].astro
var category__category__exports = /* @__PURE__ */ __exportAll({
	default: () => $$CategoryCategory,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://tanhaosheng.github.io");
async function getStaticPaths() {
	const CORE_DOMAINS = [
		"ai",
		"dev-tools",
		"tech-products"
	];
	const posts = await getCollection("articles", ({ data }) => data.published !== false);
	return CORE_DOMAINS.map((dom) => ({
		params: { category: dom },
		props: {
			domain: dom,
			posts: posts.filter((p) => p.data.domain === dom).sort((a, b) => (b.data.date || "").localeCompare(a.data.date || ""))
		}
	}));
}
var $$CategoryCategory = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CategoryCategory;
	const { domain, posts } = Astro.props;
	const meta = domainMeta(domain);
	const title = meta?.name ?? domain.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
	const canonical = `${SITE.base_url}/category-${domain}.html`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${title} — ${SITE.name}`,
		"description": meta?.blurb ?? `All ${title} articles, guides and comparisons from ${SITE.name}.`,
		"canonical": canonical
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container site-body"><h1>${title}</h1><p>${meta?.blurb ?? `Browse our complete ${title} coverage — ${posts.length} in-depth articles.`}</p><div class="article-grid">${posts.map((p) => renderTemplate`<a class="article-card"${addAttribute(`/${p.data.slug}.html`, "href")}><h3>${p.data.title}</h3><p>${p.data.description}</p><span class="pill">${p.data.type}</span></a>`)}</div></div>` })}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/category-[category].astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/category-[category].astro";
var $$url = "/category-[category].html";
//#endregion
//#region \0virtual:astro:page:src/pages/category-[category]@_@astro
var page = () => category__category__exports;
//#endregion
export { page };
