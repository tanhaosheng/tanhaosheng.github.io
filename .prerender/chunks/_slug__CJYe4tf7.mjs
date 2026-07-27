import { a as SITE, c as __exportAll, n as $$BaseHead, s as createComponent, t as $$SiteFooter } from "./SiteFooter_BKUJEopM.mjs";
import { C as unescapeHTML, T as createAstro, _ as addAttribute, d as renderTemplate, g as renderHead, i as renderComponent } from "./server_C5Sh4yOg.mjs";
import { t as getCollection } from "./_astro_content_BlEAWu5F.mjs";
//#region src/layouts/ArticleLayout.astro
createAstro("https://tanhaosheng.github.io");
var $$ArticleLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleLayout;
	const { title, description, slug, date, heroImage, body } = Astro.props;
	const canonical = `${SITE.base_url}/${slug}.html`;
	const jsonld = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		author: {
			"@type": "Organization",
			name: SITE.name
		},
		datePublished: date,
		dateModified: date
	};
	return renderTemplate`<html${addAttribute(SITE.lang, "lang")}><head>${renderComponent($$result, "BaseHead", $$BaseHead, {
		"title": `${title} - ${SITE.name}`,
		"description": description,
		"canonical": canonical,
		"ogType": "article",
		"jsonld": jsonld
	})}${renderHead($$result)}</head><body>${heroImage && renderTemplate`<div class="hero-wrap"><img class="hero-img"${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} loading="lazy"></div>`}<div class="container">${unescapeHTML(body)}</div>${renderComponent($$result, "SiteFooter", $$SiteFooter, {})}<script src="/assets/related.js"><\/script><script src="/assets/likes.js"><\/script><script src="/assets/counter.js"><\/script></body></html>`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/layouts/ArticleLayout.astro", void 0);
//#endregion
//#region src/pages/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://tanhaosheng.github.io");
async function getStaticPaths() {
	return (await getCollection("articles", ({ data }) => data.published !== false)).map((post) => ({
		params: { slug: post.data.slug ?? post.id },
		props: { post }
	}));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { post } = Astro.props;
	const slug = post.data.slug ?? post.id;
	const heroImage = post.data.heroImage;
	return renderTemplate`${renderComponent($$result, "ArticleLayout", $$ArticleLayout, {
		"title": post.data.title,
		"description": post.data.description,
		"slug": slug,
		"category": post.data.category,
		"date": post.data.date,
		"heroImage": heroImage,
		"body": post.body ?? ""
	})}`;
}, "/Users/xx/Desktop/aitoolstack_v2/src/pages/[slug].astro", void 0);
var $$file = "/Users/xx/Desktop/aitoolstack_v2/src/pages/[slug].astro";
var $$url = "/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
